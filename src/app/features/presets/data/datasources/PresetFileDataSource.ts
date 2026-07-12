import { Injectable } from '@angular/core';
import { Preset } from '../models/preset-models';

@Injectable({
  providedIn: 'root',
})
export class PresetFileDataSource {

  /**
   * Takes the raw string from the .pgp file and turns it into a structured Preset object.
   */
  toPresetModel(jsonString: string): Preset {
    try {

      const parsedData = JSON.parse(jsonString);

      if (!parsedData.schema || parsedData.schema !== 'L6Preset') {
        throw new Error('Invalid file format. This is not a valid Line 6 preset.');
      }

      if (!parsedData.data || parsedData.data.device !== 2162695) {
        throw new Error('Unsupported device. This file is not for POD Go.');
      }

      return parsedData as Preset;

    } catch (error) {
      throw new Error(`Failed to parse preset file: ${(error as Error).message}`);
    }
  }

}
