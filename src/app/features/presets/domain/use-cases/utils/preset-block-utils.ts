import { Preset, PresetBlock } from "../../entities/preset-entities";

export function findBlockById(
  blockId: number,
  blocks: PresetBlock[],
): PresetBlock {

  const blockFound = blocks.find((block) => block.id === blockId);

  if(!blockFound) {
    throw new Error('Block not found');
  }

  return blockFound;
}

export function updatePresetBlock(
  blockId: number,
  pedalBoardSetup: PresetBlock[],
  blockUpdates: Partial<PresetBlock>,
): PresetBlock[] {
  const blockToUpdate = findBlockById(blockId, pedalBoardSetup);

  if (!blockToUpdate) {
    throw new Error('Block not found');
  }

  return pedalBoardSetup.map((block) => {
    if (block.id === blockId) {
      return { ...block, ...blockUpdates };
    }

    return block;
  });
}

