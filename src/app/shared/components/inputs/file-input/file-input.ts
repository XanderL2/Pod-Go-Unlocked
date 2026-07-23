import { ChangeDetectionStrategy, Component, input, output, signal } from '@angular/core';
import { Icon } from "../../icons/icon/icon";
import { ASSET_PATHS } from '../../../../core/constants/assets-paths';

@Component({
  selector: 'app-file-input',
  imports: [Icon],
  templateUrl: './file-input.html',
  styleUrl: './file-input.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FileInput {

  // Inputs
  accept = input.required<string>();
  label = input.required<string>();
  iconUrl = input<string | null>(null);

  dragIcon = input<string | null>(null);


  // Outputs
  filesDropped = output<FileList>();


  // Properties
  isDragging = signal<boolean>(false);

  dragEnter(e: DragEvent): void {
    this.preventDefaultBehavior(e);
    this.isDragging.set(true);
  }

  dragLeave(e: DragEvent): void {
    this.preventDefaultBehavior(e);
    this.isDragging.set(false);
  }

  dropFile(e: DragEvent): void {
    this.preventDefaultBehavior(e);
    this.isDragging.set(false);

    const files = e.dataTransfer?.files ?? null;
    this.emitFile(files);
  }

  selectFile(e: Event) {
    const element = e.target as HTMLInputElement;
    const files = element.files;

    this.emitFile(files);
  }

  emitFile(fileList: FileList | null) {
    if(fileList?.length && fileList.length >= 1) {
      this.filesDropped.emit(fileList)
    }
  }


  private preventDefaultBehavior(e: Event) {
    e.preventDefault();
    e.stopPropagation();
  }

}
