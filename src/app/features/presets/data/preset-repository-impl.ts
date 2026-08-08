import { inject, Injectable } from '@angular/core';
import { PresetRepository } from '../domain/repositories/preset-repository';
import { PresetFileMapper } from './datasources/preset-file/preset-file-mapper';
import { PresetFileDataSource } from './datasources/preset-file/preset-file-datasource';
import { Preset } from '../domain/entities/preset-entities';

@Injectable({
  providedIn: 'root',
})
export class PresetRepositoryImpl extends PresetRepository {
  private _dataSource = inject(PresetFileDataSource);

  override loadPresetFromRawString(jsonString: string): Preset {

    const presetModel = PresetFileMapper.toPresetModel(jsonString);
    const presetEntity = PresetFileMapper.toPresetEntity(presetModel);

    return presetEntity;
  }

   override getUnlockedTemplates(): Preset {
    throw new Error('Method not implemented.');
  }
  override exportPreset(preset: Preset): string {
    throw new Error('Method not implemented.');
  }



}
