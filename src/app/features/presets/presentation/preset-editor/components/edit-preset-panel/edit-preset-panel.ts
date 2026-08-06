import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { BlockCategory, PresetBlock } from '../../../../domain/entities/preset-entities';
import { BlockNameFormatterPipe } from '../../../common/pipes/block-name-formatter-pipe';
import { EditBlockButton } from "../edit-block-button/edit-block-button";
import { ASSET_PATHS } from '../../../../../../core/constants/assets-paths';
import { BLOCK_ICON_MAP } from '../../../common/utils/preset-utils';

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


  // Properties:
  feedBackIconsPath = ASSET_PATHS.icons.feedback;
  BLOCK_ICON_MAP = BLOCK_ICON_MAP;
  BLOCK_CATEGORIES = BlockCategory;

}
