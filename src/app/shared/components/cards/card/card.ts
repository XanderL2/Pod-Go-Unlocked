import { Component, input } from '@angular/core';

@Component({
  selector: 'app-card',
  imports: [],
  templateUrl: './card.html',
  styleUrl: './card.scss',
})
export class Card {

  title = input.required<string>();
  description = input.required<string>();
  imagePath = input.required<string>();


}
