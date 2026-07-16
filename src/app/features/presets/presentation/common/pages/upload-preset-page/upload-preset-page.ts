import { Component, inject, input, output } from "@angular/core";
import { FileInput } from "../../../../../../shared/components/inputs/file-input/file-input";
import { PresetEditorState } from "../../../preset-editor/services/preset-editor-state";
import { Preset } from "../../../../data/models/preset-models";
import { ToastLauncher } from '../../../../../../shared/components/feedback/toast/controller/toast-launcher';

@Component({
  selector: 'app-upload-preset-page',
  imports: [FileInput],
  templateUrl: './upload-preset-page.html',
  styleUrl: './upload-preset-page.scss',
})
export class UploadPresetPage {

  // Inputs:
  title = input.required<string>();
  subTitle = input.required<string>();

  // Outputs:
  submitPreset = output<Preset>();

  // Services:
  private presetEditorState = inject(PresetEditorState);
  private toastLauncher = inject(ToastLauncher);

  async handlePresetUpload(files: FileList) {
    
    try {

      this.validateUploadedFiles(files);
      const file = await files[0].text();

      const preset = this.presetEditorState.parseRawToPreset(file);
      this.submitPreset.emit(preset);

    } catch (error) {
      this.toastLauncher.error("Oops! An error occurred.", error as string);
    }
  }

  private validateUploadedFiles(files: FileList): void {
    if (!files || files.length === 0) {
      throw new Error('No files uploaded');
    }

    if (files.length > 1) {
      throw new Error('You can only upload one file at a time');
    }

    const file = files.item(0);

    if (!file || !file.name.toLowerCase().endsWith('.pgp')) {
      throw new Error('Only .pgp files are accepted');
    }
  }
}

