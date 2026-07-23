import { ASSET_PATHS } from "../../../../../core/constants/assets-paths";
import { BlockCategory } from "../../../domain/entities/preset-entities";


export const BLOCK_ICON_MAP: Record<BlockCategory, string> = {
  // Special blocks / Hardware
  [BlockCategory.AMP_BLOCK]: `${ASSET_PATHS.icons.presetBlocks}/head-amp.svg`,
  [BlockCategory.CAB_IR_BLOCK]: `${ASSET_PATHS.icons.presetBlocks}/cabinet-amp.svg`,
  [BlockCategory.WAH_BLOCK]: `${ASSET_PATHS.icons.presetBlocks}/expression-pedal.svg`,
  [BlockCategory.VOLUME_BLOCK]: `${ASSET_PATHS.icons.presetBlocks}/expression-pedal.svg`,
  
  // Modulation pedal 
  [BlockCategory.MODULATION]: `${ASSET_PATHS.icons.presetBlocks}/modulation-pedal.svg`,

  // Empty block
  [BlockCategory.EMPTY_BLOCK]: `${ASSET_PATHS.icons.presetBlocks}/empty-pedal.svg`,

  // Standard default icons 
  [BlockCategory.DIST]: `${ASSET_PATHS.icons.presetBlocks}/basic-pedal.svg`,
  [BlockCategory.DYNAMIC]: `${ASSET_PATHS.icons.presetBlocks}/basic-pedal.svg`,
  [BlockCategory.EQ]: `${ASSET_PATHS.icons.presetBlocks}/basic-pedal.svg`,
  [BlockCategory.DELAY]: `${ASSET_PATHS.icons.presetBlocks}/basic-pedal.svg`,
  [BlockCategory.REVERB]: `${ASSET_PATHS.icons.presetBlocks}/basic-pedal.svg`,
  [BlockCategory.PITCH]: `${ASSET_PATHS.icons.presetBlocks}/basic-pedal.svg`,
  [BlockCategory.FILTER]: `${ASSET_PATHS.icons.presetBlocks}/basic-pedal.svg`,
  [BlockCategory.LOOPER]: `${ASSET_PATHS.icons.presetBlocks}/basic-pedal.svg`,
  [BlockCategory.FX_LOOP]: `${ASSET_PATHS.icons.presetBlocks}/basic-pedal.svg`,
};