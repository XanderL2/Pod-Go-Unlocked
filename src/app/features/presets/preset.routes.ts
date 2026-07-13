import { Routes } from '@angular/router';
import { UnlockPresetPage } from './presentation/unlock-preset/unlock-preset-page';
import { PresetEditorPage } from './presentation/preset-editor/preset-editor-page';
import { presetLoadedGuard } from './presentation/preset-editor/guards/preset-loaded-guard';

export const UNLOCK_PRESET_ROUTES: Routes = [
  {
    path: 'unlock-preset',
    component: UnlockPresetPage,
  },
  {
    path: 'preset-editor',
    component: PresetEditorPage,
    canActivate: [presetLoadedGuard]
  }
];
