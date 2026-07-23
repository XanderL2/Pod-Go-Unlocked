export interface Preset {
    name: string;
    version: number;
    tempo: number;
    pedalSetup: PresetBlock[];
}


export interface PresetBlock {
    name: string;
    position: number;
    enabled: boolean;
    type: BlockCategory;
};

export enum BlockCategory {

    // Common pedal types
    DIST = 'DIST',
    DYNAMIC = 'DYNAMIC',
    EQ = 'EQ',
    MODULATION = 'MODULATION',
    DELAY = 'DELAY',
    REVERB = 'REVERB',
    PITCH = 'PITCH',
    FILTER = 'FILTER',
    LOOPER = 'LOOPER',

    // Special pedal block
    WAH_BLOCK = 'WAH_BLOCK',
    AMP_BLOCK = 'AMP_BLOCK',
    CAB_IR_BLOCK = 'CAB_BLOCK',
    VOLUME_BLOCK = 'VOLUME_BLOCK',
    FX_LOOP = 'FX_LOOP',

    // Empty
    EMPTY_BLOCK = 'EMPTY_BLOCK'
}

