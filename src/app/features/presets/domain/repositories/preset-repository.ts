import { PodGoPresetModel } from "../../data/models/preset-models";
import { Preset } from "../entities/preset-entities";

export abstract class PresetRepository {
    abstract loadPresetFromRawString(jsonString: string): Preset;
    abstract unlockPresetBlock(preset: PodGoPresetModel): PodGoPresetModel; 
    abstract restorePresetBlock(preset: PodGoPresetModel): PodGoPresetModel; 
    abstract getUnlockedTemplates(preset: PodGoPresetModel): PodGoPresetModel; 
}
