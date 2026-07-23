import { Pipe, type PipeTransform } from '@angular/core';

@Pipe({
  name: 'blockNameFormatter',
})
export class BlockNameFormatterPipe implements PipeTransform {
  transform(value: string | null | undefined, fallback: string): string {
    if (!value || value.trim() === '') {
      return fallback;
    }

    return this.formatBlockName(value);
  }

  private formatBlockName(rawName: string): string {

    const clean = rawName.replace('HD2_', '');
    return clean;
  }
}
