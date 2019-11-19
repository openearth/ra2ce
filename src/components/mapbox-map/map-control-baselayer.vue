<template>
  <button
    class="baselayer-control mapboxgl-ctrl"
    @click="switchBaseLayer"
    ref="$control"
    v-show="showControl"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <path
        d="M0 0h24v24H0z"
        fill="none"
      />
      <path
        d="M11.99 18.54l-7.37-5.73L3 14.07l9 7 9-7-1.63-1.27-7.38 5.74zM12 16l7.36-5.73L21 9l-9-7-9 7 1.63 1.27L12 16z"
      />
    </svg>
  </button>
</template>

<script>
export default {
  inject: ['getMap'],

  props: {
    layers: {
      type: Array,
      required: true
    },
    position: {
      type: String,
      required: false
    }
  },

  data: () => ({
    showControl: false,
    currentLayerIndex: 0
  }),

  computed: {
    // @REFACTOR :: This is now tightly coupling control with implementation.
    // We should come up with a robust way to rerender layers on style change.
    wmsLayers() {
      return this.$store.getters['mapbox/wmsLayers'];
    },
  },

  mounted() {
    const map = this.getMap();
    // If we are already loaded
    if(map && map.loaded()) {
      this.addToMap(map);
    }
  },

  methods: {
    switchBaseLayer() {
      const nextIndex = (this.currentLayerIndex + 1) % this.layers.length;
      const { style } = this.layers[nextIndex];
      const map = this.getMap();

      // First remove all layers
      this.wmsLayers.forEach(({ id }) => {
        map.removeLayer(id);
        map.removeSource(id);
      });
      this.$store.commit('mapbox/RESET_LAYERS_VISIBILITY');

      map.setStyle(style);
      this.currentLayerIndex = nextIndex;

      // Then re-add all layers
      map.once('style.load', () => {
        this.wmsLayers.forEach((layer) => {
          map.addLayer(layer);
        });
      });
    },

    deferredMountedTo(map) {
      this.addToMap(map);
    },

    addToMap(map) {
      const { $control } = this.$refs;
      const control = new MapControlBaselayer($control);
      map.addControl(control, this.position);
      this.showControl = true;
    }
  }
};

class MapControlBaselayer {
  constructor($element) {
    this._container = $element;
  }

  onAdd() {
    return this._container;
  }

  onRemove() {
    this._container.parentNode.removeChild(this._container);
  }
}
</script>

<style>
.baselayer-control {
  width: 30px;
  height: 30px;
  padding: 3px;
  background-color: white;
  outline: 0;
  border: 0;
  border-radius: 4px;
  box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.1);
}

.baselayer-control:hover {
  background-color: #f2f2f2; /* #ffffff + rgba(0, 0, 0, 0.05) */
}
</style>
