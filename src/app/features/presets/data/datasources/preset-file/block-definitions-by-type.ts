import { BlockCategory, REPLACEABLE_BLOCKS } from '../../../domain/entities/preset-entities';
import { Block } from '../../models/preset-models';

export const DEFAULT_BLOCKS_BY_TYPE: Record<REPLACEABLE_BLOCKS, (position: number) => Block> = {
  [BlockCategory.WAH_BLOCK]: (position) => ({
    '@enabled': false,
    '@model': 'HD2_WahFasselStereo',
    '@no_snapshot_bypass': false,
    '@position': position,
    '@type': 0,
    FcHigh: 2155.0,
    FcLow: 455.0,
    Level: 0.0,
    Mix: 1.0,
    Pedal: 1.0,
  }),

  [BlockCategory.VOLUME_BLOCK]: (position) => ({
    '@enabled': true,
    '@model': 'HD2_VolPanVolStereo',
    '@no_snapshot_bypass': false,
    '@position': position,
    '@type': 0,
    Pedal: 1.0,
    VolumeTaper: false,
  }),

  [BlockCategory.EQ]: (position) => ({
    '@enabled': false,
    '@model': 'HD2_EQ_STATIC_ParametricStereo',
    '@no_snapshot_bypass': false,
    '@position': position,
    '@type': 0,
    HighCut: 20100.0,
    HighFreq: 8000.0,
    HighGain: 0.0,
    HighQ: 0.707,
    Level: 0.0,
    LowCut: 19.9,
    LowFreq: 110.0,
    LowGain: 0.0,
    LowQ: 0.707,
    MidFreq: 2000.0,
    MidGain: 0.0,
    MidQ: 0.707,
  }),

  [BlockCategory.FX_LOOP]: (position) => ({
    '@enabled': false,
    '@model': 'HD2_FXLoopMono1',
    '@no_snapshot_bypass': false,
    '@position': position,
    '@trails': false,
    '@type': 5,
    Mix: 1.0,
    Return: 0.0,
    Send: 0.0,
  }),
};
