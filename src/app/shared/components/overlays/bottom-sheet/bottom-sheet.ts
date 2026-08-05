import {
  ChangeDetectionStrategy,
  Component,
  DOCUMENT,
  ElementRef,
  computed,
  effect,
  inject,
  input,
  model,
  output,
  signal,
  viewChild,
} from '@angular/core';

// How far the sheet has to be dragged down for the release to close it instead
// of letting it snap back
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
  // Two-way: the host opens it with [(isOpen)] and the sheet closes itself
  isOpen = model<boolean>(false);
  label = input<string>('Bottom sheet');

  // Outputs
  closed = output<void>();

  // View
  private panel = viewChild<ElementRef<HTMLElement>>('panel');

  // Properties
  isDragging = signal<boolean>(false);
  // How far the finger has pulled the panel down, read by the styles as --_drag
  dragOffset = computed(() => `${this.dragDistance()}px`);

  private dragDistance = signal<number>(0);
  private dragStartY = 0;
  private readonly document = inject(DOCUMENT);

  constructor() {
    // While the sheet is up it owns the screen: the page behind it must not
    // scroll, and focus moves into the panel so the keyboard follows the content
    effect((onCleanup) => {
      if (!this.isOpen()) return;

      this.dragDistance.set(0);
      this.panel()?.nativeElement.focus();

      const body = this.document.body;
      body.style.overflow = 'hidden';

      onCleanup(() => (body.style.overflow = ''));
    });
  }

  close(): void {
    if (!this.isOpen()) return;

    this.isOpen.set(false);
    this.closed.emit();
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
    if (!this.isDragging()) return;

    this.isDragging.set(false);

    // The distance is left in place when closing, so the exit animation starts
    // where the finger let go instead of jumping back up first
    if (this.dragDistance() >= DISMISS_DISTANCE) {
      this.close();
      return;
    }

    this.dragDistance.set(0);
  }
}
