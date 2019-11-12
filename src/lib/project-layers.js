import buildGeoserverUrl from './build-geoserver-url';
import wms from './mapbox/layers/wms';

export const generateWmsLayer = ({ url, id, layer, style='', paint={} }) => {
  const tile = buildGeoserverUrl({
    url,
    service: 'WMS',
    request: 'GetMap',
    layers: layer,
    style,
    width: 256,
    height: 256,
    srs: 'EPSG:3857',
    transparent: true,
    bbox: '{bbox-epsg-3857}',
    format: 'image/png',
    encode: false
  });

  return wms({
    id,
    tiles: [ tile ],
    tileSize: 256,
    paint
  });
};

export const operatorCosts = generateWmsLayer({
  id: 'operator_costs',
  layer: 'ra2ce:operator_costs',
});

export const societalCosts = generateWmsLayer({
  id: 'societal_losses',
  layer: 'ra2ce:societal_costs',
});

export const priorities = generateWmsLayer({
  id: 'priorities',
  layer: 'ra2ce:classroads_testing',
  style: 'ra2ce',
});
