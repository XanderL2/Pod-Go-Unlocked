import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { BlockCategory, PresetBlock } from '../../../../domain/entities/preset-entities';
import { BlockNameFormatterPipe } from '../../../common/pipes/block-name-formatter-pipe';
import { EditBlockButton } from "../edit-block-button/edit-block-button";
import { ASSET_PATHS } from '../../../../../../core/constants/assets-paths';
import { BLOCK_ICON_MAP } from '../../../common/utils/preset-utils';


export enum EDIT_PRESET_PANEL_ACTIONS {
  ENABLED_DISABLED_BLOCK = 'ENABLED_DISABLED_BLOC',
  CLEAR_BLOCK = 'CLEAR_BLOCK',

  REPLACE_WITH_WAH = 'REPLACE_WITH_WAH',
  REPLACE_WITH_VOLUME = 'REPLACE_WITH_VOLUME',
  REPLACE_WITH_EQ = 'REPLACE_WITH_EQ',
  REPLACE_WITH_FX_LOOP = 'REPLACE_WITH_FX_LOOP',
}


@Component({
  selector: 'app-edit-preset-panel',
  imports: [BlockNameFormatterPipe, EditBlockButton],
  templateUrl: './edit-preset-panel.html',
  styleUrl: './edit-preset-panel.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditPresetPanel {

  // Inputs:
  block = input.required<PresetBlock>();

  // OUTPUTS
  selectOption = output<EDIT_PRESET_PANEL_ACTIONS>();

  // Properties:
  feedBackIconsPath = ASSET_PATHS.icons.feedback;
  BLOCK_ICON_MAP = BLOCK_ICON_MAP;
  BLOCK_CATEGORIES = BlockCategory;
  OPTIONS = EDIT_PRESET_PANEL_ACTIONS;
}
