import { inject, Injectable } from '@angular/core';
import { Preset } from '../entities/preset-entities';
import { PresetRepository } from '../repositories/preset-repository';
import { PresetRepositoryImpl } from '../../data/preset-repository-impl';

@Injectable({
  providedIn: 'root',
})
export class ToExportablePresetUseCase {

  private readonly _repositoryImpl: PresetRepository = inject(PresetRepositoryImpl);

  export(preset: Preset): string {
    return this._repositoryImpl.toExportablePresetData(preset);
  }
  
}
