import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Icon } from "../../../../../../shared/components/icons/icon/icon";

@Component({
  selector: 'app-effect-block',
  imports: [Icon],
  templateUrl: './effect-block.html',
  styleUrl: './effect-block.scss',
})
export class EffectBlock {

  type = input.required();
  name = input.required<string>();
  iconUrl = input.required<string>();

}
