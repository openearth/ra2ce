export const WORLD_CENTER_LATITUDE = 35.204111
export const WORLD_CENTER_LONGITUDE = 17.690741

export const ALBANIA_CENTER_LATITUDE = 	41.327953
export const ALBANIA_CENTER_LONGITUDE = 19.819025

export const MAP_CENTER = [
  ALBANIA_CENTER_LONGITUDE,
  ALBANIA_CENTER_LATITUDE,
]

export const MAP_ZOOM = 7

export const MAP_BASELAYERS = [
  'light',
  'satellite',
].map(layer => ({
  style: `mapbox://styles/mapbox/${layer}-v9`,
  title: layer,
  thumbnail: `/thumbnails/${layer}.png`
}))

export const MAP_BASELAYER_DEFAULT = MAP_BASELAYERS[0]
