import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ColorVariant } from '../../../types/style-variants';


@Component({
  selector: 'app-button',
  imports: [],
  templateUrl: './button.html',
  styleUrl: './button.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Button {

  // Inputs
  type = input<string>('button');
  label = input<string>();
  color = input<ColorVariant>('primary');
  disabled = input<boolean>(false);


}
