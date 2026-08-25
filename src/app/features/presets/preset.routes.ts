import { Routes } from '@angular/router';
import { UnlockPresetPage } from './presentation/unlock-preset/unlock-preset-page';
import { PresetEditorPage } from './presentation/preset-editor/preset-editor-page';
import { presetLoadedGuard } from './presentation/preset-editor/guards/preset-loaded-guard';
import { RestoreBlockPage } from './presentation/restore-block/restore-block-page';
import { UnlockedTemplatesPage } from './presentation/unlocked-templates/unlocked-templates-page';

export const UNLOCK_PRESET_ROUTES: Routes = [
  {
    path: 'unlock-preset',
    component: UnlockPresetPage,
  },
  {
    path: 'restore-block',
    component: RestoreBlockPage
  },
  {
    path: 'unlocked-templates',
    component: UnlockedTemplatesPage
  },
  {
    path: 'preset-editor',
    component: PresetEditorPage,
    canActivate: [presetLoadedGuard]
  }
];
