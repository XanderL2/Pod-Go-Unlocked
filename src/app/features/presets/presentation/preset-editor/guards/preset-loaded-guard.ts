import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';
import { PresetEditorState } from '../services/preset-editor-state';

export const presetLoadedGuard: CanActivateFn = (route, state) => {

  const presetEditorState = inject(PresetEditorState);
  const router = inject(Router);

  if(!presetEditorState.editorPreset()) {
    router.navigate(['/']);
    return false;
  }

  return true;
};
