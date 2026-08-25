import { Component, inject } from '@angular/core';
import { UploadPresetPage } from "../common/pages/upload-preset-page/upload-preset-page";
import { PresetEditorState } from '../preset-editor/services/preset-editor-state';
import { Router } from '@angular/router';
import { Preset } from '../../domain/entities/preset-entities';

@Component({
  selector: 'app-restore-block-page',
  imports: [UploadPresetPage],
  templateUrl: './restore-block-page.html',
})
export class RestoreBlockPage {

  private presetEditorState = inject(PresetEditorState);
  private router = inject(Router);

  navigateToPresetEditor(uploadedPreset: Preset) {
    this.presetEditorState.loadPresetToEditor(uploadedPreset);
    this.router.navigate(['preset-editor']);
  }
}
