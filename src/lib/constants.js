export const ALBANIA_CENTER_LATITUDE = 	41.327953;
export const ALBANIA_CENTER_LONGITUDE = 19.819025;

export const NETHERLANDS_CENTER_LATITUDE = 52.1326;
export const NETHERLANDS_CENTER_LONGITUDE = 5.2913;

export const MAP_CENTER = [
  NETHERLANDS_CENTER_LONGITUDE,
  NETHERLANDS_CENTER_LATITUDE,
];

export const MAP_ZOOM = 7;

export const MAP_BASELAYERS = [
  'light',
  'satellite',
].map(layer => ({
  style: `mapbox://styles/mapbox/${ layer }-v9`,
  title: layer,
  thumbnail: `/thumbnails/${ layer }.png`
}));

export const MAP_BASELAYER_DEFAULT = MAP_BASELAYERS[0];

export const HAZARDS = [
  {"layer_name": "plasvorming", "name": "Plasvorming op de weg"},
  // {"layer_name": "erosieafschuivingwegtalud", "name": "Erosie en afschuiving wegtalud"},
  // {"layer_name": "erosieafschuivingnaastweg", "name": "Erosie en afschuiving talud naast weg"},
  // {"layer_name": "thermischeexpansie", "name": "Thermische expansie/spatten"},
  // {"layer_name": "bruggen", "name": "Niet kunnen sluiten bruggen"},
  {"layer_name": "bosbermbranden", "name": "Bermbranden"}
];

export const CUSTOM_LAYERS = {
  OPERATOR_COSTS: {
    id: 'bosbermbranden_herstelkosten',
    layer: 'ra2ce:bosbermbranden_herstelkosten',
  },

  SOCIETAL_COSTS: {
    id: 'bosbermbranden_herstelkosten',
    layer: 'ra2ce:bosbermbranden_herstelkosten',
  },

  PRIORITIES: {
    id: 'priorities',
    layer: 'ra2ce:classroads_testing',
    style: 'ra2ce'
  }
};
