import { BlockCategory, Preset, PresetBlock } from '../../../domain/entities/preset-entities';
import { Block, PodGoPresetModel, ToneDsp0 } from '../../models/preset-models';


// Effects prefixes
const DIST_PREFIXES = ['dist', 'dst', 'gain', 'drive', 'overdrive'];
const DYNAMIC_PREFIXES = ['dyn', 'comp', 'gate'];
const EQ_PREFIXES = ['eq'];
const MODULATION_PREFIXES = ['chorus', 'tremolo', 'flanger', 'phaser', 'mod', 'modulation', 'vibrato'];
const DELAY_PREFIXES = ['delay'];
const REVERB_PREFIXES = ['reverb', 'hall'];
const PITCH_PREFIXES = ['pitch', 'whammy'];
const FILTER_PREFIXES = ['filter'];
const LOOPER_PREFIXES = ['looper'];

// Special blocks prefixes;
const WAH_BLOCK_PREFIXES = ['wah'];
const AMP_BLOCK_PREFIXES = ['amp'];
const VOLUME_BLOCK_PREFIXES = ['volume', 'vol'];
const CAB_IR_BLOCK_PREFIXES = ['cab', 'ir'];
const FX_LOOP_BLOCK_PREFIXES = ['fxloop', 'fx_loop'];


export class PresetFileMapper {

  /**
   * Takes the raw string from the .pgp file and turns it into a structured Preset object.
   */
  static toPresetModel(jsonString: string): PodGoPresetModel {
    try {

      const parsedData = JSON.parse(jsonString);

      if (!parsedData.schema || parsedData.schema !== 'L6Preset') {
        throw new Error('Invalid file format. This is not a valid Line 6 preset.');
      }

      if (!parsedData.data || parsedData.data.device !== 2162695) {
        throw new Error('Unsupported device. This file is not for POD Go.');
      }

      return parsedData as PodGoPresetModel;

    } catch (error) {
      throw new Error(`Failed to parse preset file: ${(error as Error).message}`);
    }
  }


  static toPresetEntity(model: PodGoPresetModel) : Preset {

    const { data, version } = model;

    return {
      name: data.meta.name,
      tempo: data.tone.global['@tempo'],
      version: version,
      pedalSetup: this.toPresetList(data.tone.dsp0)
    };
  }
  


  private static toPresetList(toneObj: ToneDsp0 ): PresetBlock[] {

    const presetList: PresetBlock[] = []; 

    const keys = Object.keys(toneObj) as (keyof ToneDsp0)[];
    const allowedKeys = keys.filter((key) => key.startsWith('block'));

    allowedKeys.forEach((key) => {
      const toneItem = toneObj[key] as unknown as Block; 
      const position = parseInt(key.replace(/\D/g, ''), 10);

      const preset = this.mapBlockToPresetBlock(toneItem, position);
      presetList.push(preset);
    });

    return presetList;
  }

  private static mapBlockToPresetBlock(block: Block, position: number): PresetBlock {

    const name = block['@model'] || block['@label'] || '';

    return {
      name,
      enabled: block['@enabled'] || false,
      position: position,
      type: this.determinateCategory(name)
    }

  }

  private static determinateCategory(name: string): BlockCategory {

    if(!name) {
      return BlockCategory.EMPTY_BLOCK;
    }

    // Common effects
    if(this.hasCategoryPrefixes(name, DIST_PREFIXES)) return BlockCategory.DIST;
    if(this.hasCategoryPrefixes(name, DYNAMIC_PREFIXES)) return BlockCategory.DYNAMIC;
    if(this.hasCategoryPrefixes(name, EQ_PREFIXES)) return BlockCategory.EQ;
    if(this.hasCategoryPrefixes(name, MODULATION_PREFIXES)) return BlockCategory.MODULATION;
    if(this.hasCategoryPrefixes(name, DELAY_PREFIXES)) return BlockCategory.DELAY;
    if(this.hasCategoryPrefixes(name, REVERB_PREFIXES)) return BlockCategory.REVERB;
    if(this.hasCategoryPrefixes(name, PITCH_PREFIXES)) return BlockCategory.PITCH;
    if(this.hasCategoryPrefixes(name, FILTER_PREFIXES)) return BlockCategory.FILTER;
    if(this.hasCategoryPrefixes(name, LOOPER_PREFIXES)) return BlockCategory.LOOPER;

    // Special effects blocks
    if(this.hasCategoryPrefixes(name, WAH_BLOCK_PREFIXES)) return BlockCategory.WAH_BLOCK;
    if(this.hasCategoryPrefixes(name, VOLUME_BLOCK_PREFIXES)) return BlockCategory.VOLUME_BLOCK;
    if(this.hasCategoryPrefixes(name, AMP_BLOCK_PREFIXES)) return BlockCategory.AMP_BLOCK;
    if(this.hasCategoryPrefixes(name, CAB_IR_BLOCK_PREFIXES)) return BlockCategory.CAB_IR_BLOCK;
    if(this.hasCategoryPrefixes(name, FX_LOOP_BLOCK_PREFIXES)) return BlockCategory.FX_LOOP;

    return BlockCategory.EMPTY_BLOCK;
  }

  private static hasCategoryPrefixes(name: string, prefixes: string[]): boolean {
    const lowerName = name.toLowerCase(); 
    return prefixes.some((prefix) => lowerName.includes(prefix)); 
  }
  
}