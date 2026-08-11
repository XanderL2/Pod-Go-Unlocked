import { computed, inject, Injectable, signal } from '@angular/core';
import { LoadPresetFromJsonStringUseCase } from '../../../domain/use-cases/load-preset-from-json-string-use-case';
import { Preset, REPLACEABLE_BLOCKS } from '../../../domain/entities/preset-entities';
import { EnableDisableBlockUseCase } from '../../../domain/use-cases/enable-disable-block-use-case';
import { ClearPresetBlockUseCase } from '../../../domain/use-cases/clear-preset-block-use-case';
import { ReplacePresetBlockUseCase } from '../../../domain/use-cases/replace-preset-block-use-case';
import { ToExportablePresetUseCase } from '../../../domain/use-cases/to-exportable-preset-use-case';

@Injectable({
  providedIn: 'root',
})
export class PresetEditorState {

  // Services
  private readonly _loadPresetFromJsonUseCase = inject(LoadPresetFromJsonStringUseCase);
  private readonly _enableDisableBlockUseCase = inject(EnableDisableBlockUseCase);
  private readonly _clearPresetBlockUseCase = inject(ClearPresetBlockUseCase);
  private readonly _replaceBlockUseCase = inject(ReplacePresetBlockUseCase);
  private readonly _toExportablePresetUseCase = inject(ToExportablePresetUseCase);

  // Properties
  private _activePreset = signal<Preset | null>(null);
  activePreset = computed(() => this._activePreset());


  // Methods:
  loadPresetToEditor(preset: Preset): void {
    this._activePreset.set(preset);
  }

  clearActivePreset(): void {
    this._activePreset.set(null);
  }

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

  replaceBlockBy(blockType: REPLACEABLE_BLOCKS, blockId: number): void {
    this.assertValidPreset(this.activePreset()!);
    this._activePreset.update(
      (prevValuePreset) => this._replaceBlockUseCase.replaceBlock(blockId, blockType, prevValuePreset!)
    );
  }

  exportPreset(preset: Preset) : string {
    return this._toExportablePresetUseCase.export(preset);
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
