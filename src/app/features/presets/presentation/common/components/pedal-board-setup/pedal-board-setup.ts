import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { PresetBlock } from '../../../../domain/entities/preset-entities';
import { EffectBlock } from "../effect-block/effect-block";

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

}
