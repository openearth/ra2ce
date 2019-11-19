<template>
  <mgl-raster-layer
    ref="pathLayer"
    :source-id="`${layer.id}-source`"
    :layer-id="`${layer.id}-layer`"
    :layer="layer"
    v-bind="$attrs"
  />
</template>

<script>
import { MglRasterLayer } from "vue-mapbox";

export default {
  inject: ['map'],
  components: {
    MglRasterLayer
  },
  props: {
    layer: {
      type: Object,
      required: true
    }
  },
  destroyed() {
    this.removeLayer();
  },
  methods: {
    removeLayer() {
      this.map.removeLayer(this.layer.id);
      this.map.removeSource(this.layer.id);
    }
  },
  watch: {
    layer: {
      deep: true,
      handler({ id }, newLayer) {
        const map = this.map;
        const oldLayer = map.getLayer(id);
        if(oldLayer) {
          map.removeLayer(id);
          map.removeSource(id);
          map.addLayer(newLayer, this.before);
        }
      }
    }
  }
};
</script>
