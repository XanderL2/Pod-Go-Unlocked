import { Preset } from "../entities/preset-entities";

export abstract class PresetRepository {

    abstract getUnlockedTemplates(): Preset; 
    abstract exportPreset(preset: Preset): string;
    abstract loadPresetFromRawString(jsonString: string): Preset;
    // abstract unlockPresetBlock(preset: Preset, block: PresetBlock): Preset; 
    // abstract restorePresetBlock(preset: Preset, block: PresetBlock): Preset; 
    // abstract enableBlock( block: PresetBlock): 

}
