import { computed, inject, Injectable, signal } from '@angular/core';
import { Preset } from '../../../data/models/preset-models';
import { LoadPresetFromJsonStringUseCase } from '../../../domain/use-cases/load-preset-from-json-string-use-case';

@Injectable({
  providedIn: 'root',
})
export class PresetEditorState {
  
  private _editorPreset = signal<Preset | null>(null);
  private _loadPresetFromJson = inject(LoadPresetFromJsonStringUseCase);

  editorPreset = computed(() => this._editorPreset());

  

  parseRawToPreset(jsonPreset: string): Preset {
    const parsedPreset = this._loadPresetFromJson.read(jsonPreset);
    return parsedPreset
  }

  loadPresetToEditor(preset: Preset): void {
    this._editorPreset.set(preset);
  } 
}
