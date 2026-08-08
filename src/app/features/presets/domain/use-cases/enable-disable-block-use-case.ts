import { Injectable } from '@angular/core';
import { BlockCategory, Preset, PresetBlock } from '../entities/preset-entities';
import { findBlockById, updatePresetBlock } from './utils/preset-block-utils';

@Injectable({
  providedIn: 'root',
})
export class EnableDisableBlockUseCase {
  enableBlock(blockId: number, preset: Preset): Preset {
    const block = findBlockById(blockId, preset.pedalSetup);

    if (block.enabled) {
      throw new Error('Block is already enabled');
    }

    return this.setBlockEnabled(block, preset, true);
  }

  disableBlock(blockId: number, preset: Preset): Preset {
    const block = findBlockById(blockId, preset.pedalSetup);

    if (!block.enabled) {
      throw new Error('Block is already disabled');
    }

    return this.setBlockEnabled(block, preset, false);
  }

  private setBlockEnabled(block: PresetBlock, preset: Preset, enabled: boolean): Preset {
    if (block.type === BlockCategory.EMPTY_BLOCK) {
      throw new Error('Cannot change the state of an empty block');
    }

    return {
      ...preset,
      pedalSetup: updatePresetBlock(block.id, preset.pedalSetup, {
        enabled,
      }),
    };
  }
}
