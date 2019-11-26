import buildGeoserverUrl from './build-geoserver-url';

export default layer => buildGeoserverUrl({
  request: 'GetLegendGraphic',
  service: 'WMS',
  format: 'image/png',
  width: 40,
  height: 60,
  layer
});
