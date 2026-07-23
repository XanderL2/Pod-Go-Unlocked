import { inject, Injectable } from "@angular/core";
import { PresetRepository } from "../repositories/preset-repository";
import { PresetRepositoryImpl } from "../../data/preset-repository-impl";
import { Preset } from "../entities/preset-entities";

@Injectable({
  providedIn: 'root',
})
export class LoadPresetFromJsonStringUseCase {

  private _repositoryImpl: PresetRepository = inject(PresetRepositoryImpl);

  read( rawPreset: string ): Preset {
    return this._repositoryImpl.loadPresetFromRawString(rawPreset);
  }

}

