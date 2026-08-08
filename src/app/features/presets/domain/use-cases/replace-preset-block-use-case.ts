import { Injectable } from '@angular/core';

import {
  BlockCategory,
  Preset,
  PresetBlock,
  REPLACEABLE_BLOCKS,
} from '../entities/preset-entities';
import { updatePresetBlock } from './utils/preset-block-utils';

@Injectable({
  providedIn: 'root',
})
export class ReplacePresetBlockUseCase {
  private readonly blockUpdates: Map<REPLACEABLE_BLOCKS, Partial<PresetBlock>> = new Map([
    [
      BlockCategory.WAH_BLOCK,
      {
        name: 'HD2_WahFasselStereo',
        type: BlockCategory.WAH_BLOCK,
        enabled: false,
      },
    ],
    [
      BlockCategory.VOLUME_BLOCK,
      {
        name: 'HD2_VolPanVolStereo',
        type: BlockCategory.VOLUME_BLOCK,
        enabled: false,
      },
    ],
    [
      BlockCategory.EQ,
      {
        name: 'HD2_EQ_STATIC_ParametricStereo',
        type: BlockCategory.EQ,
        enabled: false,
      },
    ],
    [
      BlockCategory.FX_LOOP,
      {
        name: 'HD2_FXLoopMono1',
        type: BlockCategory.FX_LOOP,
        enabled: false,
      },
    ],
  ]);

  replaceBlock(blockId: number, blockType: REPLACEABLE_BLOCKS, preset: Preset): Preset {
    const blockUpdates = this.getBlockUpdates(blockType);

    return {
      ...preset,
      pedalSetup: updatePresetBlock(blockId, preset.pedalSetup, blockUpdates),
    };
  }

  private getBlockUpdates(blockType: REPLACEABLE_BLOCKS): Partial<PresetBlock> {
    const blockUpdates = this.blockUpdates.get(blockType);

    if (!blockUpdates) {
      throw new Error(`No replacement found for block type: ${blockType}`);
    }

    return blockUpdates;
  }
}
