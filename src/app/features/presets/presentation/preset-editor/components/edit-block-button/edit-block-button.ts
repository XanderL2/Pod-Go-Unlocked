import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { Icon } from "../../../../../../shared/components/icons/icon/icon";
import { ASSET_PATHS } from '../../../../../../core/constants/assets-paths';
import { BlockCategory } from '../../../../domain/entities/preset-entities';
import { ColorVariant } from '../../../../../../shared/types/style-variants';

@Component({
  selector: 'app-edit-block-button',
  imports: [Icon],
  templateUrl: './edit-block-button.html',
  styleUrl: './edit-block-button.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditBlockButton {

  // Inputs
  title = input.required<string>();
  subTitle = input.required<string>();
  icon = input.required<string>()
  style = input<BlockCategory | ColorVariant>('primary');


  // Properties
  classByStyleInput = computed(() => this.style()?.toLowerCase());




}
