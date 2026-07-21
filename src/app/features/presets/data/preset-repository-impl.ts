import { inject, Injectable } from '@angular/core';
import { PresetRepository } from '../domain/repositories/preset-repository';
import { RawPodGoPreset } from './models/preset-models';
import { PresetFileDataSource } from './datasources/PresetFileDataSource';

@Injectable({
  providedIn: 'root',
})
export class PresetRepositoryImpl extends PresetRepository {

  private _dataSource = inject(PresetFileDataSource);

  override loadPresetFromRawString(jsonString: string): RawPodGoPreset {
    const preset = this._dataSource.toPresetModel(jsonString);
    return preset;
  }

  override unlockPresetBlock(preset: RawPodGoPreset): RawPodGoPreset {
    throw new Error('Method not implemented.');
  }

  override restorePresetBlock(preset: RawPodGoPreset): RawPodGoPreset {
    throw new Error('Method not implemented.');
  }

  override getUnlockedTemplates(preset: RawPodGoPreset): RawPodGoPreset {
    throw new Error('Method not implemented.');
  }

}
