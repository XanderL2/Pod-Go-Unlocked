import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { PresetBlock } from '../../../../domain/entities/preset-entities';
import { EffectBlock } from "../effect-block/effect-block";
import { UNLOCK_PRESET_ROUTES } from '../../../../preset.routes';
import { Icon } from "../../../../../../shared/components/icons/icon/icon";
import { ASSET_PATHS } from '../../../../../../core/constants/assets-paths';
import { BLOCK_ICON_MAP } from '../../../common/utils/preset-utils';

@Component({
  selector: 'app-pedal-board-setup',
  imports: [EffectBlock, Icon],
  templateUrl: './pedal-board-setup.html',
  styleUrl: './pedal-board-setup.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PedalBoardSetup {

  // Inputs
  blocks = input.required<PresetBlock[]>();

  // Outputs:
  blockTapped = output<PresetBlock>();
  contextMenuBlock = output<PresetBlock>();


  // Properties:
  feedBackIconsPath = ASSET_PATHS.icons.feedback;


  emitContextBlock(blockTapped: PresetBlock) {
    this.contextMenuBlock.emit(blockTapped);
  }

  emitTappedBlock(blockTapped: PresetBlock): void {
    this.blockTapped.emit(blockTapped);
  }
}
