import { Injectable } from '@angular/core';
import {
  BlockCategory,
  Preset,
  PresetBlock,
  REPLACEABLE_BLOCKS,
} from '../../../domain/entities/preset-entities';
import { PresetFileMapper } from './preset-file-mapper';
import {
  Block,
  Dsp0BlockKey,
  PodGoPresetModel,
  Snapshot,
  Tone,
} from '../../models/preset-models';
import { DEFAULT_BLOCKS_BY_TYPE } from './block-definitions-by-type';

/** Name of the block parameter driven by an expression pedal (wah and volume both use it). */
const EXPRESSION_PEDAL_PARAM = 'Pedal';

/** Which hardware expression pedal drives each block type. EXP 1 = wah, EXP 2 = volume. */
const EXPRESSION_PEDAL_BY_BLOCK_TYPE: Partial<Record<BlockCategory, number>> = {
  [BlockCategory.WAH_BLOCK]: 1,
  [BlockCategory.VOLUME_BLOCK]: 2,
};

@Injectable({
  providedIn: 'root',
})
export class PresetFileDataSource {

  // Public methods:
  toPresetModel(rawPreset: string): PodGoPresetModel {
    return PresetFileMapper.toPresetModel(rawPreset);
  }

  toPresetEntity(rawPresetModel: PodGoPresetModel): Preset {
    return PresetFileMapper.toPresetEntity(rawPresetModel);
  }

  toExportablePresetData(editedPreset: Preset, originalRawPreset: PodGoPresetModel): string {
    const { pedalSetup: editedBlocks } = editedPreset;

    const updatedPreset = structuredClone(originalRawPreset);
    updatedPreset.data.meta.name = updatedPreset.data.meta.name + ' unlocked';

    const blockKeys = this.getBlockKeys(updatedPreset.data.tone);

    blockKeys.forEach((blockKey, index) => {
      const editedBlock = editedBlocks[index];

      if (!editedBlock) {
        return;
      }

      const originalBlock = updatedPreset.data.tone.dsp0[blockKey];
      const isCleared = editedBlock.type === BlockCategory.EMPTY_BLOCK;
      const isReplaced = !isCleared && this.isReplacedBlock(editedBlock, originalBlock);

      updatedPreset.data.tone.dsp0[blockKey] = this.buildUpdatedBlock(
        editedBlock,
        originalBlock,
        isCleared,
        isReplaced,
      );

      this.syncExpressionPedalBinding(updatedPreset.data.tone, blockKey, editedBlock.type);

      if (isCleared) {
        delete updatedPreset.data.tone.footswitch?.dsp0?.[blockKey];
      }
    });

    return JSON.stringify(updatedPreset);
  }

  // Private methods:
  private getBlockKeys(tone: Tone): Dsp0BlockKey[] {
    const isBlockKey = (key: string): key is Dsp0BlockKey => key.startsWith('block');
    return Object.keys(tone.dsp0).filter(isBlockKey);
  }

  private buildUpdatedBlock(
    editedBlock: PresetBlock,
    originalBlock: Block,
    isCleared: boolean,
    isReplaced: boolean,
  ): Block {
    if (isCleared) {
      return { '@position': originalBlock['@position'] };
    }

    const baseBlock = isReplaced
      ? this.getReplacementBlock(editedBlock.type, originalBlock['@position'])
      : originalBlock;

    return {
      ...baseBlock,
      '@enabled': editedBlock.enabled,
    };
  }

  private getReplacementBlock(type: BlockCategory, position: number): Block {
    const replacementBlock = DEFAULT_BLOCKS_BY_TYPE[type as REPLACEABLE_BLOCKS];

    if (!replacementBlock) {
      throw new Error(`Block type cannot be replaced: ${type}`);
    }

    return replacementBlock(position);
  }

  private isReplacedBlock(evaluatedBlock: PresetBlock, originalRawBlock: Block): boolean {
    const originalBlockName = originalRawBlock['@model'] || originalRawBlock['@label'] || '';
    return evaluatedBlock.name !== originalBlockName;
  }

  /**
   * Keeps the expression pedal wiring in sync with the block that sits in this slot.
   * The hardware only reacts to the pedal when `tone.controller` binds it to that exact
   * slot, so a wah/volume block without a binding stays dead and a binding left behind on
   * a cleared slot drives nothing. Blocks of any other type are left untouched, to preserve
   * bindings the original file may have on other pedal-driven parameters.
   */
  private syncExpressionPedalBinding(
    tone: Tone,
    blockKey: Dsp0BlockKey,
    blockType: BlockCategory,
  ): void {
    const expressionPedal = EXPRESSION_PEDAL_BY_BLOCK_TYPE[blockType];
    const snapshots = this.getSnapshots(tone);

    if (!expressionPedal) {
      if (blockType === BlockCategory.EMPTY_BLOCK) {
        delete tone.controller?.dsp0?.[blockKey];
        snapshots.forEach((snapshot) => delete snapshot.controllers?.dsp0?.[blockKey]);
      }

      return;
    }

    tone.controller ??= { dsp0: {} };
    tone.controller.dsp0 ??= {};

    const currentBinding = tone.controller.dsp0[blockKey]?.[EXPRESSION_PEDAL_PARAM];

    // Rewrite only when the slot is unbound or wired to the wrong pedal, so a custom
    // pedal range already stored in the file survives the export.
    if (currentBinding?.['@controller'] !== expressionPedal) {
      tone.controller.dsp0[blockKey] = {
        [EXPRESSION_PEDAL_PARAM]: {
          '@controller': expressionPedal,
          '@max': 1.0,
          '@min': 0.0,
        },
      };
    }

    snapshots.forEach((snapshot) => {
      snapshot.controllers ??= { dsp0: {} };
      snapshot.controllers.dsp0 ??= {};
      snapshot.controllers.dsp0[blockKey] ??= {
        [EXPRESSION_PEDAL_PARAM]: {
          '@fs_enabled': false,
          '@value': 1.0,
        },
      };
    });
  }

  private getSnapshots(tone: Tone): Snapshot[] {
    return [tone.snapshot0, tone.snapshot1, tone.snapshot2, tone.snapshot3].filter(Boolean);
  }
}
