<template>
  <div class="mapbox-map">
    <mgl-map
      :mapStyle="mapConfig.style"
      :accessToken="mapBoxToken"
      :center="mapConfig.center"
      :zoom="mapConfig.zoom"
      @load="onMapCreated"
    >
      <!-- Map Controls -->
      <mgl-navigation-control position="bottom-right" />
      <map-search position="top-right" />

      <!-- Map Layers -->
      <raster-layer
        v-for="layer in wmsLayers"
        :key="layer.id"
        :layer="layer"
      />
    </mgl-map>
  </div>
</template>

<script>
import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import Mapbox from "mapbox-gl";
import { MglMap, MglNavigationControl } from "vue-mapbox";
import { MAP_CENTER, MAP_ZOOM, MAP_BASELAYER_DEFAULT } from '@/lib/constants';
import { operatorCosts, societalCosts } from '@/lib/project-layers';
import RasterLayer from './raster-layer';
import MapSearch from './map-search';

export default {
  components: {
    RasterLayer,
    MglMap,
    MglNavigationControl,
    MapSearch
  },
  computed: {
    mapBoxToken() {
      return process.env.VUE_APP_MAPBOX_TOKEN;
    },
    wmsLayers() {
      return this.$store.getters['mapbox/wmsLayers'];
    },
    mapConfig() {
      return {
        center: MAP_CENTER,
        zoom: MAP_ZOOM,
        style: MAP_BASELAYER_DEFAULT.style
      };
    }
  },
  methods: {
    onMapCreated(map) {
      this.$root.map = map;
    }
  },
  created() {
    this.mapbox = Mapbox;
    this.$store.commit('mapbox/ADD_WMS_LAYER', operatorCosts);
    this.$store.commit('mapbox/ADD_WMS_LAYER', societalCosts);
  }
};
</script>

<style>
.mapbox-map {
  height: 100%;
  width: 100%;
}

.mapbox-map__map {
  height: 100%;
  width: 100%;
}
</style>
