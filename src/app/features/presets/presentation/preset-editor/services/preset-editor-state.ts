import { computed, inject, Injectable, signal } from '@angular/core';
import { LoadPresetFromJsonStringUseCase } from '../../../domain/use-cases/load-preset-from-json-string-use-case';
import { Preset, PresetBlock } from '../../../domain/entities/preset-entities';

@Injectable({
  providedIn: 'root',
})
export class PresetEditorState {
  private _activePreset = signal<Preset | null>(null);
  private _loadPresetFromJson = inject(LoadPresetFromJsonStringUseCase);

  activePreset = computed(() => this._activePreset());

  disableBlock(blockId: number): void {
    this.verifyActivePresetIntegrity();
    const updatedPedalSetup = this.updatePedalBoardBlock(
      blockId, 
      this._activePreset()?.pedalSetup!, 
      { enabled: false }
    );

    this.updateActivePreset({
      pedalSetup: updatedPedalSetup
    });
  }

  enableBlock(blockId: number): void {
    this.verifyActivePresetIntegrity();
    const updatedPedalSetup = this.updatePedalBoardBlock(
      blockId, 
      this._activePreset()?.pedalSetup!, 
      { enabled: true }
    );

    this.updateActivePreset({
      pedalSetup: updatedPedalSetup
    });
  }

  getPresetBlockById(blockId: number, blocks: PresetBlock[]): PresetBlock | undefined {
    return blocks.find((block) => block.id === blockId);
  }

  parseRawToPreset(jsonPreset: string): Preset {
    const parsedPreset = this._loadPresetFromJson.read(jsonPreset);
    return parsedPreset;
  }

  loadPresetToEditor(preset: Preset): void {
    this._activePreset.set(preset);
  }

  private updateActivePreset(updatedPresetData: Partial<Preset>) {
    this._activePreset.update((prevPresetValue) => {
      if (!prevPresetValue) {
        return null;
      }

      return {
        ...prevPresetValue,
        ...updatedPresetData,
      };
    });
  }

  private updatePedalBoardBlock(
    blockId: number,
    pedalBoardSetup: PresetBlock[],
    updatedBlock: Partial<PresetBlock>,
  ): PresetBlock[] {
    const block = this.getPresetBlockById(blockId, pedalBoardSetup);

    if (!block) {
      throw new Error('Update failed! The Block id does not exist');
    }

    return pedalBoardSetup.map((block) => {
      if (block.id === blockId) {
        return { ...block, ...updatedBlock };
      }

      return block;
    });
  }

  private verifyActivePresetIntegrity(): void {
    if (!this.activePreset()) {
      throw new Error('Preset editor does not have active preset');
    }

    if (!this.activePreset()?.pedalSetup) {
      throw new Error('The active preset does not have blocks');
    }
  }
}
