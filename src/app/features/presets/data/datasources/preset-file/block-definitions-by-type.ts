import { BlockCategory, REPLACEABLE_BLOCKS } from '../../../domain/entities/preset-entities';
import { Block, FootswitchBlock } from '../../models/preset-models';

/**
 * Footswitch index reserved for the expression pedal toe switch. Blocks driven by
 * EXP 1 / EXP 2 carry this index, which is what lets the toe switch toggle between
 * them on the hardware.
 */
export const EXPRESSION_PEDAL_FOOTSWITCH_INDEX = 9;

/**
 * Footswitch entry a pedal-driven block needs so the toe switch can reach it.
 * Values mirror what POD Go Edit itself writes for these two models.
 */
export const EXPRESSION_PEDAL_FOOTSWITCH_BY_TYPE: Partial<
  Record<BlockCategory, () => FootswitchBlock>
> = {
  [BlockCategory.WAH_BLOCK]: () => ({
    '@fs_enabled': false,
    '@fs_index': EXPRESSION_PEDAL_FOOTSWITCH_INDEX,
    '@fs_label': 'Fassel',
    '@fs_ledcolor': 196619,
    '@fs_momentary': false,
    '@fs_primary': true,
  }),

  [BlockCategory.VOLUME_BLOCK]: () => ({
    '@fs_enabled': true,
    '@fs_index': EXPRESSION_PEDAL_FOOTSWITCH_INDEX,
    '@fs_label': 'Volume Pedal',
    '@fs_ledcolor': 65408,
    '@fs_momentary': false,
  }),
};

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
