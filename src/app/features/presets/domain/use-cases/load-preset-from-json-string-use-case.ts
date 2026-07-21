import { inject, Injectable } from "@angular/core";
import { PresetRepository } from "../repositories/preset-repository";
import { PresetRepositoryImpl } from "../../data/preset-repository-impl";
import { RawPodGoPreset } from "../../data/models/preset-models";

@Injectable({
  providedIn: 'root',
})
export class LoadPresetFromJsonStringUseCase {

  private _repositoryImpl: PresetRepository = inject(PresetRepositoryImpl);

  read( rawPreset: string ): RawPodGoPreset {
    return this._repositoryImpl.loadPresetFromRawString(rawPreset);
  }

}

