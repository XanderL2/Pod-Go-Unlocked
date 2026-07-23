import { PodGoPresetModel } from "../../data/models/preset-models";

export abstract class PresetRepository {
    abstract loadPresetFromRawString(jsonString: string): Preset;
    abstract unlockPresetBlock(preset: PodGoPresetModel): PodGoPresetModel; 
    abstract restorePresetBlock(preset: PodGoPresetModel): PodGoPresetModel; 
    abstract getUnlockedTemplates(preset: PodGoPresetModel): PodGoPresetModel; 
}
