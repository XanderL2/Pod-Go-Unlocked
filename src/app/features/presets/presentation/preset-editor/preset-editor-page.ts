import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { PresetEditorState } from './services/preset-editor-state';
import { EffectBlock } from "../common/components/effect-block/effect-block";

@Component({
  selector: 'app-preset-editor-page',
  imports: [EffectBlock],
  templateUrl: './preset-editor-page.html',
  styleUrl: './preset-editor-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PresetEditorPage {

  private presetEditorState = inject(PresetEditorState);
  activePreset = this.presetEditorState.editorPreset;


    
  


}
