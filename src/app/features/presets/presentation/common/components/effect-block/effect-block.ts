import { Component, computed, input } from '@angular/core';
import { Icon } from '../../../../../../shared/components/icons/icon/icon';
import { BlockCategory } from '../../../../domain/entities/preset-entities';
import { BLOCK_ICON_MAP } from '../../utils/preset-utils';
import { BlockNameFormatterPipe } from '../../pipes/block-name-formatter-pipe';

@Component({
  selector: 'app-effect-block',
  imports: [Icon, BlockNameFormatterPipe],
  templateUrl: './effect-block.html',
  styleUrl: './effect-block.scss',
})
export class EffectBlock {
  type = input.required<BlockCategory>();
  name = input.required<string>();
  iconByType = computed(() => BLOCK_ICON_MAP[this.type()]);
  classStyleByType = computed(() => {
    if (this.type() === BlockCategory.AMP_BLOCK || this.type() === BlockCategory.CAB_IR_BLOCK) {
      return `effectBlock__amp-cab-ir`
    }

    return `effectBlock__${this.type().toLowerCase()}`;
  });
}
