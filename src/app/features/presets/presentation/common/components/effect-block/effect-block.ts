import { Component, computed, input } from '@angular/core';
import { Icon } from "../../../../../../shared/components/icons/icon/icon";
import { BlockCategory } from '../../../../domain/entities/preset-entities';
import { BLOCK_ICON_MAP } from '../../utils/preset-utils';

@Component({
  selector: 'app-effect-block',
  imports: [Icon],
  templateUrl: './effect-block.html',
  styleUrl: './effect-block.scss',
})
export class EffectBlock {

  type = input.required<BlockCategory>();
  name = input.required<string>();
  iconByType = computed(() => BLOCK_ICON_MAP[this.type()])
}
