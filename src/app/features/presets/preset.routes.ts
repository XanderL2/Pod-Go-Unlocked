import { Routes } from '@angular/router';
import { UnlockPresetPage } from './presentation/unlock-preset/unlock-preset-page';
import { PresetEditorPage } from './presentation/preset-editor/preset-editor-page';
import { presetLoadedGuard } from './presentation/preset-editor/guards/preset-loaded-guard';
import { RestoreBlockPage } from './presentation/restore-block/restore-block-page';

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
    path: 'preset-editor',
    component: PresetEditorPage,
    canActivate: [presetLoadedGuard]
  }
];
