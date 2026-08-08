import { Preset } from "../entities/preset-entities";

export abstract class PresetRepository {

    abstract getUnlockedTemplates(): Preset; 
    abstract exportPreset(preset: Preset): string;
    abstract loadPresetFromRawString(jsonString: string): Preset;
 }
