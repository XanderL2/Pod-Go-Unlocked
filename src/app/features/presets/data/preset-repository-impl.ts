import { inject, Injectable } from '@angular/core';
import { PresetRepository } from '../domain/repositories/preset-repository';
import { PresetFileDataSource } from './datasources/preset-file/preset-file-datasource';
import { Preset } from '../domain/entities/preset-entities';
import { PodGoPresetModel } from './models/preset-models';

@Injectable({
  providedIn: 'root',
})
export class PresetRepositoryImpl extends PresetRepository {

  private readonly _dataSource = inject(PresetFileDataSource);
  private _rawPreset: PodGoPresetModel | null = null; 

  override loadPresetFromRawString(jsonString: string): Preset {
    this._rawPreset = this._dataSource.toPresetModel(jsonString);
    return this._dataSource.toPresetEntity(this._rawPreset);
  }

  override getUnlockedTemplates(): Preset {
    throw new Error('Method not implemented.');
  }

  override toExportablePresetData(preset: Preset): string {

    if(!this._rawPreset?.data.tone.dsp0) {
      throw new Error("Preset not have pedal board setup on DSP0 param");
    }

    const exportablePreset = this._dataSource.toExportablePresetData(preset, this._rawPreset);
    return exportablePreset;

  }
}
