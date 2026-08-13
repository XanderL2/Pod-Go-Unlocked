/**
 * The root structure of a POD Go preset file (.pgp).
 */
export interface PodGoPresetModel {
    /** Main container for sound and hardware data */
    data: Data;
    /** File type data from the Line 6 store */
    meta: PresetMeta;
    /** File identifier (Always "L6Preset") */
    schema: string;
    /** File format version */
    version: number;
}

/**
 * Main hardware and tone container.
 */
export interface Data {
    /** Product ID (Always 2162695 for POD Go) */
    device: number;
    /** Internal firmware version code */
    device_version: number;
    /** Basic preset info (Name, date) */
    meta: DataMeta;
    /** The complete sound mapping */
    tone: Tone;
}

/**
 * Preset name and editor program info.
 */
export interface DataMeta {
    /** Editor software name (e.g., "POD Go Edit") */
    application: string;
    /** Version of the editor app */
    appversion: number;
    /** System build ID text */
    build_sha: string;
    /** Last save date (Timestamp) */
    modifieddate: number;
    /** The name of your preset (e.g., "Solo wah") */
    name: string;
}

/**
 * The full tone structure (blocks, scenes, switches, and expression pedals).
 */
export interface Tone {
    /** Expression pedal and external controller settings (absent when no block is pedal-driven) */
    controller?: Controller;
    /** The 10 hardware effect blocks, input, and output */
    dsp0: ToneDsp0;
    /** Secondary chip data (Always empty {} on POD Go) */
    dsp1: Dsp1;
    /** Foot switch buttons assignment mapping */
    footswitch: Footswitch;
    /** General settings (BPM tempo, first snapshot) */
    global: Global;
    /** Quick Scene 1 configuration */
    snapshot0: Snapshot;
    /** Quick Scene 2 configuration */
    snapshot1: Snapshot;
    /** Quick Scene 3 configuration */
    snapshot2: Snapshot;
    /** Quick Scene 4 configuration */
    snapshot3: Snapshot;
}

/**
 * Expression pedal assignments.
 */
export interface Controller {
    dsp0: { [key: string]: { [key: string]: ControllerParams } };
}

/**
 * Minimum and maximum range for expression pedals.
 */
export interface ControllerParams {
    /** Controller ID (e.g., 1 for EXP 1, 2 for EXP 2) */
    "@controller": number;
    /** Maximum pedal value (Usually 1.0) */
    "@max": number;
    /** Minimum pedal value (Usually 0.0) */
    "@min": number;
}

/**
 * The 10 fixed effect blocks inside the POD Go.
 */
export interface ToneDsp0 {
    block0: Block; // Volume Pedal block
    block1: Block; // Wah or Distortion block
    block2: Block; // FX block
    block3: Block; // FX block
    block4: Block; // FX Loop block
    block5: Block; // Amp model block
    block6: Block; // Cab or IR block
    block7: Block; // EQ block
    block8: Block; // Delay block
    block9: Block; // Reverb block
    /** Guitar input and noise gate settings */
    input: Input;
    /** Main output volume and pan settings */
    output: Output;
}

export type Dsp0BlockKey =
  | 'block0'
  | 'block1'
  | 'block2'
  | 'block3'
  | 'block4'
  | 'block5'
  | 'block6'
  | 'block7'
  | 'block8'
  | 'block9';

/**
 * A flexible layout for any effect block and its knobs.
 */
export interface Block {
    /** Is the pedal active or bypassed? */
    "@enabled"?: boolean;
    /** The model ID name from Line 6 (e.g., "HD2_WahFasselStereo") */
    "@model"?: string;
    /** If true, snapshots cannot change the On/Off state */
    "@no_snapshot_bypass"?: boolean;
    /** Visual position in the signal path (0 to 9) */
    "@position": number;
    /** Block type category (Amp, Cab, Delay, etc.) */
    "@type"?: number;
    /** Keeps echo/reverb tail alive after bypass */
    "@trails"?: boolean;
    /** Selected microphone type (For Cabs) */
    "@mic"?: number;
    /** Volume of the amp when turned off */
    "@bypassvolume"?: number;
    /** Dynamic list of all physical knobs and parameters */
    [key: string]: any;
}

/**
 * Guitar physical input properties.
 */
export interface Input {
    /** Input channel number */
    "@input": number;
    /** Input system name */
    "@model": string;
    /** Noise gate release speed */
    decay: number;
    /** Is the noise gate active? */
    noiseGate: boolean;
    /** Noise gate trigger volume level */
    threshold: number;
}

/**
 * Main audio output jacks properties.
 */
export interface Output {
    /** Output system name */
    "@model": string;
    /** Output channel number */
    "@output": number;
    /** Total volume boost or cut in dB */
    gain: number;
    /** Stereo balance between Left and Right */
    pan: number;
}

/**
 * Reserved empty interface for Helix compatibility.
 */
export interface Dsp1 {}

/**
 * Group of physical foot switches.
 */
export interface Footswitch {
    dsp0: { [key: string]: FootswitchBlock };
}

/**
 * Settings for a foot switch button.
 */
export interface FootswitchBlock {
    /** Can this foot switch be used? */
    "@fs_enabled": boolean;
    /** Hardware button index number (e.g., FS1, FS2) */
    "@fs_index": number;
    /** Text name shown on the small screen */
    "@fs_label": string;
    /** LED light ring color code */
    "@fs_ledcolor": number;
    /** If true, only stays On while your foot holds it down */
    "@fs_momentary": boolean;
    /** Is this the primary effect for the switch? */
    "@fs_primary"?: boolean;
}

/**
 * Initial system parameters when you load the file.
 */
export interface Global {
    /** Which snapshot opens first (0 to 3) */
    "@current_snapshot": number;
    /** The default active block on the screen */
    "@cursor_group": string;
    /** Global type tag */
    "@model": string;
    /** Physical expression pedal switch state */
    "@pedalstate": number;
    /** General BPM speed for time/delay effects */
    "@tempo": number;
}

/**
 * Quick scene profile snapshot data.
 */
export interface Snapshot {
    /** LED color code for this scene */
    "@ledcolor": number;
    /** Custom name of the scene (e.g., "SNAPSHOT 1") */
    "@name": string;
    /** Expression pedal state for this scene */
    "@pedalstate": number;
    /** Custom BPM tempo for this scene */
    "@tempo": number;
    /** True if this scene is active and customized */
    "@valid": boolean;
    /** On/Off map for all 10 blocks in this scene */
    blocks: SnapshotBlocks;
    /** Expression pedal values for this scene (absent when no block is pedal-driven) */
    controllers?: SnapshotControllers;
}

/**
 * Quick True/False mapping for effect blocks inside a snapshot.
 */
export interface SnapshotBlocks {
    dsp0: { [key: string]: boolean };
}

/**
 * Values for controllers inside a specific snapshot.
 */
export interface SnapshotControllers {
    dsp0: { [key: string]: { [key: string]: SnapshotPedalValue } };
}

/**
 * Specific value settings for a snapshot pedal.
 */
export interface SnapshotPedalValue {
    /** Is foot switch mapping active here? */
    "@fs_enabled": boolean;
    /** Current position value (0.0 to 1.0) */
    "@value": number;
}

/**
 * Shop registration data from Line 6.
 */
export interface PresetMeta {
    original: number;
    pbn: number;
    /** Flag: 0 if open source, changes if it is a paid item */
    premium: number;
}