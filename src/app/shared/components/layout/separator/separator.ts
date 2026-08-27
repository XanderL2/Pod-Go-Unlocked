import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-separator',
  imports: [],
  templateUrl: './separator.html',
  styleUrl: './separator.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Separator {}
