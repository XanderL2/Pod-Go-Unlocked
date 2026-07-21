import { RawPodGoPreset } from "../../data/models/preset-models";

export abstract class PresetRepository {
    abstract loadPresetFromRawString(jsonString: string): RawPodGoPreset;
    abstract unlockPresetBlock(preset: RawPodGoPreset): RawPodGoPreset; 
    abstract restorePresetBlock(preset: RawPodGoPreset): RawPodGoPreset; 
    abstract getUnlockedTemplates(preset: RawPodGoPreset): RawPodGoPreset; 
}
