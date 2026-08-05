import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { PresetEditorState } from './services/preset-editor-state';
import { PedalBoardSetup } from '../common/components/pedal-board-setup/pedal-board-setup';
import { Button } from "../../../../shared/components/buttons/button/button";
import { BlockCategory, PresetBlock } from '../../domain/entities/preset-entities';
import { TmplAstDeferredBlockLoading } from '@angular/compiler';

@Component({
  selector: 'app-preset-editor-page',
  imports: [PedalBoardSetup, Button],
  templateUrl: './preset-editor-page.html',
  styleUrl: './preset-editor-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PresetEditorPage {

  private presetEditorState = inject(PresetEditorState);
  activePreset = this.presetEditorState.activePreset;


    
  


  handleBlockTapped(tappedBlock: PresetBlock) {

    if(tappedBlock.type !== BlockCategory.EMPTY_BLOCK) {
      this.toggleBlockEnabled(tappedBlock);
    }

  }

  toggleBlockEnabled(block: PresetBlock) {

    if(block.enabled) {
      this.presetEditorState.disablePedal(block.id);
      return;
    }

    this.presetEditorState.enableBlock(block.id);    
  }

}
