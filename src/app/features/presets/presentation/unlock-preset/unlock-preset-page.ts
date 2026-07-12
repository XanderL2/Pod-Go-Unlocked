import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FileInput } from "../../../../shared/components/inputs/file-input/file-input";

@Component({
  selector: 'app-unlock-preset-page',
  imports: [FileInput],
  templateUrl: './unlock-preset-page.html',
  styleUrl: './unlock-preset-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UnlockPresetPage {






  handlePresetUpload(files: FileList ) {

    // TODO: Implements new architecture 
    // TODO: Implement handle preset upload

    console.log(files);

  }

}
