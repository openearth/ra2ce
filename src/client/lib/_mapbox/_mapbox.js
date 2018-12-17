import 'mapbox-gl/dist/mapbox-gl.css'
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css'

let mapboxgl
let MapboxGeocoder

if (process.browser) {
  // use old skool `require` because there is no support for dynamic `import`
  mapboxgl = require('mapbox-gl')
  mapboxgl.accessToken = process.env.MAPBOX_TOKEN

  MapboxGeocoder = require('@mapbox/mapbox-gl-geocoder')
}

export {
  mapboxgl as default,
  MapboxGeocoder
}
