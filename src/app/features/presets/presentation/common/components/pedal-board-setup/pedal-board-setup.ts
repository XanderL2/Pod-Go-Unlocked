import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { PresetBlock } from '../../../../domain/entities/preset-entities';
import { EffectBlock } from "../effect-block/effect-block";
import { UNLOCK_PRESET_ROUTES } from '../../../../preset.routes';

@Component({
  selector: 'app-pedal-board-setup',
  imports: [EffectBlock],
  templateUrl: './pedal-board-setup.html',
  styleUrl: './pedal-board-setup.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PedalBoardSetup {

  // Inputs
  blocks = input.required<PresetBlock[]>();

  // Outputs:
  blockTapped = output<PresetBlock>();



  onBlockTapped(blockTapped: PresetBlock): void {
    this.blockTapped.emit(blockTapped);
  }
}
