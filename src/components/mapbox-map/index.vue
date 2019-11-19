<template>
  <div class="mapbox-map">
    <v-mapbox
      class="mapbox-map__map"
      :access-token="mapBoxToken"
      :map-style="mapConfig.style"
      :center="mapConfig.center"
      :zoom="mapConfig.zoom"
      @mb-created="onMapCreated"
      id="map"
      ref="map"
    >
      <!-- Map Controls -->
      <v-mapbox-geocoder />
      <v-mapbox-navigation-control position="bottom-right" />
      <map-control-baselayer
        :layers="mapBaseLayers"
        position="bottom-right"
      >
      <map-control-fitbounds
        :fitToBounds="fitToBounds"
        position="bottom-right"
      />

      <!-- Map Layers -->
      <map-layer
        v-for="layer in wmsLayers"
        :key="layer.id"
        :options="layer"
      />
    </v-mapbox>
  </div>
</template>

<script>
import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import { MAP_CENTER, MAP_ZOOM, MAP_BASELAYERS, MAP_BASELAYER_DEFAULT } from '@/lib/constants';
import { operatorCosts, societalCosts } from '@/lib/project-layers';
import MapLayer from './map-layer.js';
import MapControlBaselayer from './map-control-baselayer';
import MapControlFitbounds from './map-control-fitbounds';

export default {
  components: {
    MapLayer,
    MapControlBaselayer,
    MapControlFitbounds
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
    },
    mapBaseLayers() {
      return MAP_BASELAYERS;
    }
  },

  methods: {
    onMapCreated(map) {
      // @TODO :: We need the updated vue2mapbox!!
      // console.log(map);
      this.$root.map = map;
      map.on('load', () => {
        this.$root.mapLoaded = true;
      });
    },
    fitToBounds() {
      // @REFACTOR :: We do a simple flyto at the moment, we could also fit to actual bounds of layers
      this.$root.map.flyTo({
        center: this.mapConfig.center,
        zoom: this.mapConfig.zoom
      });
    }
  },

  created() {
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
