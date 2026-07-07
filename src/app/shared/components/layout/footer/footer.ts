import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Icon } from "../../icons/icon/icon";

@Component({
  selector: 'app-footer',
  imports: [Icon],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Footer {}
