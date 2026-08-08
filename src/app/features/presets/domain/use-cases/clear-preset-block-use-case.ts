import { Injectable } from '@angular/core';
import { BlockCategory, Preset, PresetBlock } from '../entities/preset-entities';
import { findBlockById, updatePresetBlock } from './utils/preset-block-utils';

@Injectable({
  providedIn: 'root',
})
export class ClearPresetBlockUseCase {
  removeEffect(blockId: number, preset: Preset): Preset {
    const blockToRemove = findBlockById(blockId, preset.pedalSetup);

    if (blockToRemove.type === BlockCategory.EMPTY_BLOCK) {
      throw new Error('Block is already empty');
    }

    const blockUpdates: Partial<PresetBlock> = {
      name: '',
      type: BlockCategory.EMPTY_BLOCK,
      enabled: false,
    };

    return {
      ...preset,
      pedalSetup: updatePresetBlock(blockId, preset.pedalSetup, blockUpdates),
    };
  }
}
