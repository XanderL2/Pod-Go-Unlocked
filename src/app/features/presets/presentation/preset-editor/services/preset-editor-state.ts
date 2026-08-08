import { computed, inject, Injectable, signal } from '@angular/core';
import { LoadPresetFromJsonStringUseCase } from '../../../domain/use-cases/load-preset-from-json-string-use-case';
import { BlockCategory, Preset, PresetBlock } from '../../../domain/entities/preset-entities';
import { EnableDisableBlockUseCase } from '../../../domain/use-cases/enable-disable-block-use-case';
import { ClearPresetBlockUseCase } from '../../../domain/use-cases/clear-preset-block-use-case';

@Injectable({
  providedIn: 'root',
})
export class PresetEditorState {

  // Services
  private readonly _loadPresetFromJsonUseCase = inject(LoadPresetFromJsonStringUseCase);
  private readonly _enableDisableBlockUseCase = inject(EnableDisableBlockUseCase);
  private readonly _clearPresetBlockUseCase = inject(ClearPresetBlockUseCase);

  // Properties
  private _activePreset = signal<Preset | null>(null);
  activePreset = computed(() => this._activePreset());


  // Methods:
  enableBlock(blockId: number): void {
    this.assertValidPreset(this.activePreset()!);
    this._activePreset.update((prevValuePreset) =>
      this._enableDisableBlockUseCase.enableBlock(blockId, prevValuePreset!),
    );
  }

  disableBlock(blockId: number): void {
    this.assertValidPreset(this.activePreset()!);
    this._activePreset.update((prevValuePreset) =>
      this._enableDisableBlockUseCase.disableBlock(blockId, prevValuePreset!),
    );
  }

  parseRawToPreset(jsonPreset: string): Preset {
    const parsedPreset = this._loadPresetFromJsonUseCase.read(jsonPreset);
    return parsedPreset;
  }

  clearBlock(blockId: number): void {
    this.assertValidPreset(this.activePreset()!)
    this._activePreset.update((prevValuePreset) => this._clearPresetBlockUseCase.removeEffect(blockId, prevValuePreset!))
  }

  loadPresetToEditor(preset: Preset): void {
    this._activePreset.set(preset);
  }


  // Private methods: 
  private assertValidPreset(preset: Preset) {
    if (!preset) {
      throw new Error('No active preset');
    }

    if (!preset.pedalSetup) {
      throw new Error('The active preset has no blocks');
    }
  }
}
