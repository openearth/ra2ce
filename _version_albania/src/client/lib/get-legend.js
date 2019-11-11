import geoServerUrl from './geoserver-url'

export default function({
  url,
  layer='',
  format='image/png',
  width=40,
  height=60,
  ...rest
}) {
  return geoServerUrl({
    request: 'GetLegendGraphic',
    service: 'WMS',
    url,
    layer,
    format,
    width,
    height,
    ...rest,
  })
}
