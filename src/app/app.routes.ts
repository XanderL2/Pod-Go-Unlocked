import { Routes } from '@angular/router';
import { UNLOCK_PRESET_ROUTES } from './features/unlock-preset/unlock-preset.routes';
import { UnlockPresetPage } from './features/unlock-preset/unlock-preset-page/unlock-preset-page';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'unlock-preset' 
  },
  ...UNLOCK_PRESET_ROUTES,
  {
    path: '**',
    redirectTo: 'unlock-preset',
  },
];
