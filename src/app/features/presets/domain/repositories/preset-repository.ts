import { Preset } from "../../data/models/preset-models";

export abstract class PresetRepository {
    abstract loadPresetFromRawString(jsonString: string): Preset;
    abstract unlockPresetBlock(preset: Preset): Preset; 
    abstract restorePresetBlock(preset: Preset): Preset; 
    abstract getUnlockedTemplates(preset: Preset): Preset; 
}
