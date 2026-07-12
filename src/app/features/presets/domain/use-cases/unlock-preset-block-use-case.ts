import { inject, Injectable } from '@angular/core';
import { Preset } from '../../data/models/preset-models';
import { PresetRepository } from '../repositories/preset-repository';
import { PresetRepositoryImpl } from '../../data/preset-repository-impl';

@Injectable({
  providedIn: 'root',
})
export class UnlockPresetUseCase {

  private _repositoryImpl: PresetRepository = inject(PresetRepositoryImpl);


  removeLockedEffect(preset: Preset): Preset {
    // todo: implements remove locked effect function
    return preset;
  }


}
