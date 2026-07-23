import { inject, Injectable } from '@angular/core';
import { PresetRepository } from '../domain/repositories/preset-repository';
import { PodGoPresetModel } from './models/preset-models';
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

  override unlockPresetBlock(preset: PodGoPresetModel): PodGoPresetModel {
    throw new Error('Method not implemented.');
  }

  override restorePresetBlock(preset: PodGoPresetModel): PodGoPresetModel {
    throw new Error('Method not implemented.');
  }

  override getUnlockedTemplates(preset: PodGoPresetModel): PodGoPresetModel {
    throw new Error('Method not implemented.');
  }

}
