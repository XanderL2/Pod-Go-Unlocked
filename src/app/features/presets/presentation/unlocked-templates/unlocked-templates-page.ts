import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Card } from '../../../../shared/components/cards/card/card';
import { Icon } from '../../../../shared/components/icons/icon/icon';

interface UnlockedTemplate {
  title: string;
  description: string;
  image: string;
  presetSource: string;
}

@Component({
  selector: 'app-unlocked-templates-page',
  imports: [Card, Icon],
  templateUrl: './unlocked-templates-page.html',
  styleUrl: './unlocked-templates-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UnlockedTemplatesPage {
  // Properties:
  UNLOCKED_TEMPLATES: UnlockedTemplate[] = [
    {
      title: 'Direct Essentials',
      description:
        'Amp + Cab/IR only. Use it when playing directly into your interface, PA or headphones.',
      image: 'images/unlocked-templates/only-amp-cab.webp',
      presetSource: 'templates/only-amp-cab.pgp',
    },
    {
      title: 'Pedalboard Mode',
      description: 'No Amp or Cab/IR. Use it when running the POD Go into a real guitar amplifier.',
      image: 'images/unlocked-templates/pedalboard-mode.webp',
      presetSource: 'templates/pedalboard-mode.pgp',
    },

    {
      title: 'Direct + Wah',
      description: 'Amp + Cab/IR + Wah. Use it when you want a simple direct setup with a wah.',
      image: 'images/unlocked-templates/only-wah-amp+cab.webp',
      presetSource: 'templates/only-wah-amp+cab.pgp',
    },
    {
      title: 'Pedalboard + FX Loop',
      description:
        'Pedalboard with an FX Loop. Use it when connecting external pedals or an amp FX loop.',
      image: 'images/unlocked-templates/pedalboard+fxloop.webp',
      presetSource: 'templates/pedalboard+fxloop.pgp',
    },
    {
      title: 'IR Loader',
      description: 'IR only. Use it when you already have an external amp or preamp in your setup.',
      image: 'images/unlocked-templates/only-ir.webp',
      presetSource: 'templates/only-ir.pgp',
    },
  ];

  // Methods:
  onDownloadTemplate(template: UnlockedTemplate): void {
    this.downloadPublicFile(template.presetSource, `${template.title}.pgp`);
  }

  downloadPublicFile(source: string, fileName: string): void {
    const downloadLink = document.createElement('a');

    downloadLink.href = source;
    downloadLink.download = fileName;

    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  }
}
