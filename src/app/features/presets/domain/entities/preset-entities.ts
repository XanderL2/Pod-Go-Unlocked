interface Preset {
    name: string;
    version: string;
    tempo: string;
    pedalSetup: PresetBlock[];
}


interface PresetBlock {
    name: string;
    position: number;
    enabled: boolean;
    type: BlockCategory;
};

enum BlockCategory {

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
    FX_LOOP = 'FX_LOOP',

    // Empty
    EMPTY_BLOCK = 'EMPTY_BLOCK'
}

