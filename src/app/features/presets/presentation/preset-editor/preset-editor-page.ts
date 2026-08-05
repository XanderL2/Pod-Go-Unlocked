import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
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

  // Only the id is stored: the block itself is read back from the state, so the
  // open toolbar always shows the current values instead of a stale copy
  private tappedBlockId = signal<number | null>(null);
  tappedBlock = computed(() => {
    const blockId = this.tappedBlockId();
    const blocks = this.activePreset()?.pedalSetup;

    if (blockId === null || !blocks) {
      return undefined;
    }

    return this.presetEditorState.getPresetBlockById(blockId, blocks);
  });


  openEditorToolbar(tappedBlock: PresetBlock) {
    this.tappedBlockId.set(tappedBlock.id);
    this.isToolBarOpen.set(true);
  }

  closeEditorToolbar() {
    this.isToolBarOpen.set(false);
  }

  toggleEnabledBlock(block: PresetBlock) {

    if(block.enabled) {
      this.presetEditorState.disablePedal(block.id);
      return;
    }

    this.presetEditorState.enableBlock(block.id);
  }

}
