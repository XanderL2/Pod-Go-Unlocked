import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FileInput } from '../../../../shared/components/inputs/file-input/file-input';
import { PresetEditorState } from '../preset-editor/services/preset-editor-state';
import { UploadPresetPage } from "../common/pages/upload-preset-page/upload-preset-page";
import { Preset } from '../../data/models/preset-models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-unlock-preset-page',
  imports: [UploadPresetPage],
  templateUrl: './unlock-preset-page.html',
})
export class UnlockPresetPage {

  private presetEditorState = inject(PresetEditorState);
  private router = inject(Router);

  navigateToPresetEditor(uploadedPreset: Preset) {
    this.presetEditorState.loadPresetToEditor(uploadedPreset);
    this.router.navigate(['preset-editor']);
  }
}
