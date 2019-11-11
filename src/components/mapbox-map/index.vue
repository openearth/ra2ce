<template>
  <div class="mapbox-map">
    <v-mapbox
      class="mapbox-map__map"
      :access-token="mapBoxToken"
      map-style="mapbox://styles/mapbox/streets-v11"
      :center="[5.2913, 52.1326]"
      :zoom="7"
      @mb-created="onMapCreated"
    >
    </v-mapbox>
  </div>
</template>

<script>
import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';

export default {
  computed: {
    mapBoxToken() {
      return process.env.VUE_APP_MAPBOX_TOKEN;
    }
  },

  methods: {
    onMapCreated(map) {
      this.$root.map = map;
    }
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
