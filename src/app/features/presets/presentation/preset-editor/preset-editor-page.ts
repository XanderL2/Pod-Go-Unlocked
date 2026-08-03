import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { PresetEditorState } from './services/preset-editor-state';
import { PedalBoardSetup } from '../common/components/pedal-board-setup/pedal-board-setup';

@Component({
  selector: 'app-preset-editor-page',
  imports: [PedalBoardSetup],
  templateUrl: './preset-editor-page.html',
  styleUrl: './preset-editor-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PresetEditorPage {

  private presetEditorState = inject(PresetEditorState);
  activePreset = this.presetEditorState.editorPreset;


    
  


}
