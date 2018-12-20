import geoServerUrl from './geoserver-url'

export default function({
  url,
  layer='',
  format='image/png',
  width=170,
  ...rest
}) {
  return geoServerUrl({
    request: 'GetLegendGraphic',
    service: 'WMS',
    url,
    layer,
    format,
    width,
    ...rest,
  })
}
