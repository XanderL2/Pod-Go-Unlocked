import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { PresetEditorState } from './services/preset-editor-state';
import { PedalBoardSetup } from '../common/components/pedal-board-setup/pedal-board-setup';
import { Button } from "../../../../shared/components/buttons/button/button";
import { PresetBlock } from '../../domain/entities/preset-entities';
import { BottomSheet } from "../../../../shared/components/overlays/bottom-sheet/bottom-sheet";
import { BlockNameFormatterPipe } from '../common/pipes/block-name-formatter-pipe';

@Component({
  selector: 'app-preset-editor-page',
  imports: [PedalBoardSetup, Button, BottomSheet, BlockNameFormatterPipe],
  templateUrl: './preset-editor-page.html',
  styleUrl: './preset-editor-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PresetEditorPage {

  // Services
  private presetEditorState = inject(PresetEditorState);

  // Properties
  activePreset = this.presetEditorState.activePreset;
  isToolBarOpen = signal<boolean>(false);
  tappedBlock = signal<PresetBlock | null>(null);


  openEditorToolbar(tappedBlock: PresetBlock) {
    this.tappedBlock.set(tappedBlock);
    this.isToolBarOpen.set(true);
  }

  toggleEnabledBlock(block: PresetBlock) {

    if(block.enabled) {
      this.presetEditorState.disablePedal(block.id);
    } else {
      this.presetEditorState.enableBlock(block.id);
    }

    // The toolbar has done its job once the block is toggled
    this.isToolBarOpen.set(false);
  }

}
