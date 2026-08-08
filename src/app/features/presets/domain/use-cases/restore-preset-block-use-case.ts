import { inject, Injectable } from '@angular/core';
import { PresetRepository } from '../repositories/preset-repository';
import { PresetRepositoryImpl } from '../../data/preset-repository-impl';

@Injectable({
  providedIn: 'root',
})
export class RestorePresetBlockUseCase {

  private _repositoryImpl: PresetRepository = inject(PresetRepositoryImpl);


  enableBlock() {

  }

  disableBlock() {

  }

}
