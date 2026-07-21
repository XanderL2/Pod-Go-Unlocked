import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { DomSanitizer } from '@angular/platform-browser';

type IconColor =
  'primary' | 'secondary' | 'tertiary' | 'error' | 'info' | 'warning' | 'success' | 'currentColor';
type IconSize = 'lg' | 'md' | 'sm' | 'flexible';

@Component({
  selector: 'app-icon',
  imports: [CommonModule],
  templateUrl: './icon.html',
  styleUrl: './icon.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Icon {
  // Inputs
  url = input.required<string>();
  color = input<IconColor>('currentColor');
  size = input<IconSize>('sm');
  label = input<string | null>();

  // Services
  private http = inject(HttpClient);
  private sanitizer = inject(DomSanitizer);

  // Properties
  private iconResource = rxResource({
    params: () => ({ iconUrl: this.url() }),
    stream: ({ params }) => this.http.get(params.iconUrl, { responseType: 'text' }),
  });

  safeSvg = computed(() => {
    const val = this.iconResource.value();
    return val ? this.sanitizer.bypassSecurityTrustHtml(val) : null;
  });
}
