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
import { Icon } from '../../../../shared/components/icons/icon/icon';
import { ASSET_PATHS } from '../../../../core/constants/assets-paths';
import { Location } from '@angular/common';

@Component({
  selector: 'app-preset-editor-page',
  imports: [PedalBoardSetup, Button, BottomSheet, EditPresetPanel, Icon],
  templateUrl: './preset-editor-page.html',
  styleUrl: './preset-editor-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PresetEditorPage {
  // Services:
  private readonly presetEditorState = inject(PresetEditorState);
  private readonly toastLauncher = inject(ToastLauncher);
  private readonly location = inject(Location);

  // Properties
  activePreset = this.presetEditorState.activePreset;
  feedBackIcons = ASSET_PATHS.icons.feedback;
  isToolBarOpen = signal<boolean>(false);
  tappedBlock = signal<PresetBlock | null>(null);
  EDIT_PRESET_PANEL_ACTIONS = EDIT_PRESET_PANEL_ACTIONS;
  editorPanelActions: Map<EDIT_PRESET_PANEL_ACTIONS, Function> = new Map([
    [
      EDIT_PRESET_PANEL_ACTIONS.ENABLED_DISABLED_BLOCK,
      () => this.toggleEnabledBlock(this.tappedBlock()!),
    ],
    [
      EDIT_PRESET_PANEL_ACTIONS.ENABLED_DISABLED_BLOCK,
      () => this.toggleEnabledBlock(this.tappedBlock()!),
    ],
    [
      EDIT_PRESET_PANEL_ACTIONS.CLEAR_BLOCK,
      () => this.presetEditorState.clearBlock(this.tappedBlock()?.id!),
    ],

    // Replaceable actions:
    [
      EDIT_PRESET_PANEL_ACTIONS.REPLACE_WITH_WAH,
      () => this.presetEditorState.replaceBlockBy(BlockCategory.WAH_BLOCK, this.tappedBlock()?.id!),
    ],
    [
      EDIT_PRESET_PANEL_ACTIONS.REPLACE_WITH_VOLUME,
      () =>
        this.presetEditorState.replaceBlockBy(BlockCategory.VOLUME_BLOCK, this.tappedBlock()?.id!),
    ],
    [
      EDIT_PRESET_PANEL_ACTIONS.REPLACE_WITH_EQ,
      () => this.presetEditorState.replaceBlockBy(BlockCategory.EQ, this.tappedBlock()?.id!),
    ],
    [
      EDIT_PRESET_PANEL_ACTIONS.REPLACE_WITH_FX_LOOP,
      () => this.presetEditorState.replaceBlockBy(BlockCategory.FX_LOOP, this.tappedBlock()?.id!),
    ],
  ]);

  // Public methods
  openEditorToolbar(tappedBlock: PresetBlock) {
    this.tappedBlock.set(tappedBlock);
    this.isToolBarOpen.set(true);
  }

  onSelectOptionFromEditorPanel(action: EDIT_PRESET_PANEL_ACTIONS): void {
    try {
      const handleToAction = this.editorPanelActions.get(action);
      if (!handleToAction) throw new Error(`Handler not implemented for this action ${action}`);

      handleToAction();
    } catch (error) {
      this.toastLauncher.error('Oops! An error occurred.', error as string);
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

  onContextMenuFromBlocks(block: PresetBlock): void {
    try {
      this.toggleEnabledBlock(block);
    } catch (error) {
      this.toastLauncher.error('Oops! An error occurred.', error as string);
    }
  }

  cancelEdition(): void {
    this.location.back();
    this.presetEditorState.clearActivePreset();
  }

  async exportPreset(): Promise<void> {
    try {
      const exportablePreset = this.presetEditorState.toExportablePreset(this.activePreset()!);
      const fileName = `${this.activePreset()?.name || 'preset'} unlocked.pgp`;
      await this.downloadPreset(exportablePreset, fileName);
    } catch (error) {
      if ((error as Error)?.name === 'AbortError') return;
      this.toastLauncher.error('Oops! An error occurred.', error as string);
    }
  }

  private async downloadPreset(fileContent: string, fileName: string): Promise<void> {
    if ('showSaveFilePicker' in window) {
      const handle = await (window as any).showSaveFilePicker({
        suggestedName: fileName,
        types: [{ description: 'POD Go Preset', accept: { 'application/json': ['.pgp'] } }],
      });

      const writable = await handle.createWritable();
      await writable.write(fileContent);
      await writable.close();
      return;
    }

    const blob = new Blob([fileContent], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');

    link.href = url;
    link.download = fileName;
    link.click();

    URL.revokeObjectURL(url);
  }
}
