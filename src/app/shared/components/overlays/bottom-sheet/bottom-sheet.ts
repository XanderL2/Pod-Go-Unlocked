import {
  ChangeDetectionStrategy,
  Component,
  DOCUMENT,
  ElementRef,
  effect,
  inject,
  input,
  model,
  signal,
  viewChild,
} from '@angular/core';

// Drag the sheet down further than this and releasing closes it
const DISMISS_DISTANCE = 96;

@Component({
  selector: 'app-bottom-sheet',
  imports: [],
  templateUrl: './bottom-sheet.html',
  styleUrl: './bottom-sheet.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(document:keydown.escape)': 'close()',
  },
})
export class BottomSheet {

  // Inputs
  // Two-way: the host opens it, the sheet closes itself
  isOpen = model<boolean>(false);
  label = input<string>('Bottom sheet');

  // Properties
  isDragging = signal<boolean>(false);
  dragDistance = signal<number>(0);

  private panel = viewChild<ElementRef<HTMLElement>>('panel');
  private dragStartY = 0;
  private document = inject(DOCUMENT);

  constructor() {
    // An open sheet owns the screen: the page behind it stops scrolling and
    // focus moves into the panel
    effect((onCleanup) => {
      if (!this.isOpen()) return;

      this.dragDistance.set(0);
      this.panel()?.nativeElement.focus();
      this.document.body.style.overflow = 'hidden';

      onCleanup(() => (this.document.body.style.overflow = ''));
    });
  }

  close(): void {
    this.isOpen.set(false);
  }

  // -- Drag to dismiss ---------------------------------------------------
  // Pointer events cover mouse, touch and pen alike, and capturing the pointer
  // keeps the moves coming even when the finger slides off the grabber

  startDragging(event: PointerEvent): void {
    this.dragStartY = event.clientY;
    this.isDragging.set(true);
    (event.target as HTMLElement).setPointerCapture(event.pointerId);
  }

  updateDragging(event: PointerEvent): void {
    if (!this.isDragging()) return;

    // Downwards only: pulling up must not lift the sheet past its resting place
    this.dragDistance.set(Math.max(0, event.clientY - this.dragStartY));
  }

  finishDragging(): void {
    this.isDragging.set(false);

    // On close the distance stays put, so the exit slides on from where the
    // finger let go instead of jumping back up first
    if (this.dragDistance() < DISMISS_DISTANCE) {
      this.dragDistance.set(0);
      return;
    }

    this.close();
  }
}
