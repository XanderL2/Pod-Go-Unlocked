import { computed, inject, Injectable, signal } from '@angular/core';
import { RawPodGoPreset } from '../../../data/models/preset-models';
import { LoadPresetFromJsonStringUseCase } from '../../../domain/use-cases/load-preset-from-json-string-use-case';

@Injectable({
  providedIn: 'root',
})
export class PresetEditorState {
  
  private _editorPreset = signal<RawPodGoPreset | null>(null);
  private _loadPresetFromJson = inject(LoadPresetFromJsonStringUseCase);

  editorPreset = computed(() => this._editorPreset());

  

  parseRawToPreset(jsonPreset: string): RawPodGoPreset {
    const parsedPreset = this._loadPresetFromJson.read(jsonPreset);
    return parsedPreset
  }

  loadPresetToEditor(preset: RawPodGoPreset): void {
    this._editorPreset.set(preset);
  } 
}
