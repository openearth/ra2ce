import buildGeoserverUrl from './build-geoserver-url';

export default function({
  url,
  layer='',
  format='image/png',
  width=40,
  height=60,
  ...rest
}) {
  return buildGeoserverUrl({
    request: 'GetLegendGraphic',
    service: 'WMS',
    url,
    layer,
    format,
    width,
    height,
    ...rest,
  });
}
