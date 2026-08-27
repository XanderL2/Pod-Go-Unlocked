const ICONS_BASE = 'icons';
const IMAGES_BASE = 'images';

export const ASSET_PATHS = {
  icons: {
    presetBlocks: `${ICONS_BASE}/preset-blocks`,
    feedback: `${ICONS_BASE}/feedback`,
    links: `${ICONS_BASE}/links`,
    identity: `${ICONS_BASE}/identity`,
  },
  images: {
    'import-tutorial':`${IMAGES_BASE}/import-export-tutorial`,
  },
} as const;