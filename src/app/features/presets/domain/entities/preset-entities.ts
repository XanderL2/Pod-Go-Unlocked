export interface Preset {
  name: string;
  version: number;
  tempo: number;
  pedalSetup: PresetBlock[];
}

export interface PresetBlock {
  id: number;
  name: string;
  position: number;
  enabled: boolean;
  type: BlockCategory;
}

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
  WAH_BLOCK = 'WAH',
  AMP_BLOCK = 'AMP',
  CAB_IR_BLOCK = 'CAB',
  VOLUME_BLOCK = 'VOLUME',
  FX_LOOP = 'FX_LOOP',

  // Empty
  EMPTY_BLOCK = 'EMPTY',

  // Unknown
  UNKNOWN = 'UNKNOWN',
}

export type REPLACEABLE_BLOCKS =
  BlockCategory.WAH_BLOCK | BlockCategory.VOLUME_BLOCK | BlockCategory.EQ | BlockCategory.FX_LOOP;
