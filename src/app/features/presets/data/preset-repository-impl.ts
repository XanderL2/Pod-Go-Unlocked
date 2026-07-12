import { inject, Injectable } from '@angular/core';
import { PresetRepository } from '../domain/repositories/preset-repository';
import { Preset } from './models/preset-models';
import { PresetFileDataSource } from './datasources/PresetFileDataSource';

@Injectable({
  providedIn: 'root',
})
export class PresetRepositoryImpl extends PresetRepository {

  private _dataSource = inject(PresetFileDataSource);

  override loadPresetFromRawString(jsonString: string): Preset {
    const preset = this._dataSource.toPresetModel(jsonString);
    return preset;
  }

  override unlockPresetBlock(preset: Preset): Preset {
    throw new Error('Method not implemented.');
  }

  override restorePresetBlock(preset: Preset): Preset {
    throw new Error('Method not implemented.');
  }

  override getUnlockedTemplates(preset: Preset): Preset {
    throw new Error('Method not implemented.');
  }

}
