import { Injectable } from '@angular/core';
import {
  BlockCategory,
  Preset,
  PresetBlock,
  REPLACEABLE_BLOCKS,
} from '../../../domain/entities/preset-entities';
import { PresetFileMapper } from './preset-file-mapper';
import { Block, Dsp0BlockKey, PodGoPresetModel, ToneDsp0 } from '../../models/preset-models';
import { DEFAULT_BLOCKS_BY_TYPE } from './block-definitions-by-type';

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
    const { dsp0: originalDsp } = originalRawPreset.data.tone;

    const originalBlocks = this.getRawBlocks(originalDsp);
    const updatedBlocks = this.buildUpdatedBlocks(editedBlocks, originalBlocks);
    const podGoPresetUpdated = this.applyUpdatesOnPodGoPreset(originalRawPreset, updatedBlocks);

    return JSON.stringify(podGoPresetUpdated);
  }

  // Private methods:
  private getRawBlocks(dsp0: ToneDsp0): Block[] {
    const rawBlocks: Block[] = [];

    const isAllowedBlock = (key: string): key is keyof ToneDsp0 => key.startsWith('block');
    const dsp0Keys = Object.keys(dsp0).filter(isAllowedBlock);

    for (const dspKey of dsp0Keys) {
      const rawBlock: any = dsp0[dspKey];
      rawBlocks.push(rawBlock);
    }

    return rawBlocks;
  }

  private buildUpdatedBlocks(editedBlocks: PresetBlock[], originalBlocks: Block[]): Block[] {
    return originalBlocks.map((originalBlock, index) => {
      const editedBlock = editedBlocks[index];

      if (this.isClearedBlock(editedBlock, originalBlock)) {
        return {
          '@position': originalBlock['@position'],
        };
      }

      let updatedBlock = originalBlock;

      if (this.isReplacedBlock(editedBlock, originalBlock)) {
        updatedBlock = this.getReplacementBlock(editedBlock.type, originalBlock['@position']);
      }

      return {
        ...updatedBlock,
        '@enabled': editedBlock.enabled,
      };
    });
  }

  private getReplacementBlock(type: BlockCategory, position: number): Block {
    const replacementBlock = DEFAULT_BLOCKS_BY_TYPE[type as REPLACEABLE_BLOCKS];

    if (!replacementBlock) {
      throw new Error(`Block type cannot be replaced: ${type}`);
    }

    return replacementBlock(position);
  }

  private isClearedBlock(editedBlock: PresetBlock, rawBlock: Block): boolean {
    const rawBlockName = rawBlock['@model'] || rawBlock['@label'];
    return editedBlock.name === '' && rawBlockName !== '';
  }

  private isReplacedBlock(evaluatedBlock: PresetBlock, originalRawBlock: Block): boolean {
    const originalBlockName = originalRawBlock['@model'] || originalRawBlock['@label'] || '';
    return evaluatedBlock.name !== originalBlockName;
  }

  private applyUpdatesOnPodGoPreset(
    rawPreset: PodGoPresetModel,
    updates: Block[],
  ): PodGoPresetModel {
    const updatedPreset = structuredClone(rawPreset);
    updatedPreset.data.meta.name = updatedPreset.data.meta.name + " unlocked";

    for (const update of updates) {
      const blockKey = `block${update['@position']}` as Dsp0BlockKey;

      updatedPreset.data.tone.dsp0[blockKey] = update;
    }

    return updatedPreset;
  }
}
