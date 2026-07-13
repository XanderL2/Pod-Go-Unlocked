import { Component, inject, input, output } from "@angular/core";
import { FileInput } from "../../../../../../shared/components/inputs/file-input/file-input";
import { PresetEditorState } from "../../../preset-editor/services/preset-editor-state";
import { Preset } from "../../../../data/models/preset-models";

@Component({
  selector: 'app-preset-upload-page',
  imports: [FileInput],
  templateUrl: './preset-upload-page.html',
  styleUrl: './preset-upload-page.scss',
})
export class PresetUploadPage {

  // Inputs:
  title = input.required<string>();
  subTitle = input.required<string>();

  // Outputs:
  submitPreset = output<Preset>();

  // Services:
  private presetEditorState = inject(PresetEditorState);

  async handlePresetUpload(files: FileList) {
    
    try {

      this.validateUploadedFiles(files);
      const file = await files[0].text();

      const preset = this.presetEditorState.parseRawToPreset(file);
      this.submitPreset.emit(preset);

    } catch (error) {
      console.error('Error handled', error);
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

