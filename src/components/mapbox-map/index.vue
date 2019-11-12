<template>
  <div class="mapbox-map">
    <pre>
      {{
        wmsLayers
      }}
    </pre>
    <v-mapbox
      class="mapbox-map__map"
      :access-token="mapBoxToken"
      map-style="mapbox://styles/mapbox/light-v9"
      :center="[19.819025, 41.327953]"
      lala="[5.2913, 52.1326]"
      :zoom="7"
      @mb-created="onMapCreated"
      id="map"
      ref="map"
    >
      <!-- Map Controls -->
      <v-mapbox-geocoder />
      <v-mapbox-navigation-control position="bottom-right" />

      <!-- Map Layers -->
      <v-mapbox-layer
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
import { operatorCosts, societalCosts } from '@/lib/project-layers';

export default {
  computed: {
    mapBoxToken() {
      return process.env.VUE_APP_MAPBOX_TOKEN;
    },
    wmsLayers() {
      return this.$store.getters['mapbox/wmsLayers'];
    }
  },

  methods: {
    onMapCreated(map) {
      this.$root.map = map;
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
