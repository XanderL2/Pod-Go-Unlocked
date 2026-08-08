import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { PresetEditorState } from './services/preset-editor-state';
import { Button } from '../../../../shared/components/buttons/button/button';
import { BlockCategory, PresetBlock } from '../../domain/entities/preset-entities';
import { BottomSheet } from '../../../../shared/components/overlays/bottom-sheet/bottom-sheet';
import { PedalBoardSetup } from './components/pedal-board-setup/pedal-board-setup';
import {
  EDIT_PRESET_PANEL_ACTIONS,
  EditPresetPanel,
} from './components/edit-preset-panel/edit-preset-panel';
import { ToastLauncher } from '../../../../shared/components/feedback/toast/controller/toast-launcher';

@Component({
  selector: 'app-preset-editor-page',
  imports: [PedalBoardSetup, Button, BottomSheet, EditPresetPanel],
  templateUrl: './preset-editor-page.html',
  styleUrl: './preset-editor-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PresetEditorPage {
  // Services:
  private presetEditorState = inject(PresetEditorState);
  private toastLauncher = inject(ToastLauncher);

  // Properties
  activePreset = this.presetEditorState.activePreset;
  isToolBarOpen = signal<boolean>(false);
  tappedBlock = signal<PresetBlock | null>(null);
  editorPanelActions: Map<EDIT_PRESET_PANEL_ACTIONS, Function> = new Map([
    [EDIT_PRESET_PANEL_ACTIONS.ENABLED_DISABLED_BLOCK, () => this.toggleEnabledBlock(this.tappedBlock()!)],
    [EDIT_PRESET_PANEL_ACTIONS.ENABLED_DISABLED_BLOCK, () => this.toggleEnabledBlock(this.tappedBlock()!)],
    [EDIT_PRESET_PANEL_ACTIONS.CLEAR_BLOCK, () => this.presetEditorState.clearBlock(this.tappedBlock()?.id!)],
  ]);

  // Public methods
  openEditorToolbar(tappedBlock: PresetBlock) {
    this.tappedBlock.set(tappedBlock);
    this.isToolBarOpen.set(true);
  }

  onSelectOptionFromEditorPanel(action: EDIT_PRESET_PANEL_ACTIONS): void {


    try {
      
      const actionHandler = this.editorPanelActions.get(action);
      if(!actionHandler) throw new Error(`Handler not implemented for this action ${action}`);

      actionHandler();

    } catch (error) {
      this.toastLauncher.error("Oops! An error occurred.", error as string);
    }

    this.isToolBarOpen.set(false);
  }

  toggleEnabledBlock(block: PresetBlock) {
    if (block.enabled) {
      this.presetEditorState.disableBlock(block.id);
      return;
    }

    this.presetEditorState.enableBlock(block.id);
  }
}
