export default {
  name: 'v-mapbox-layer',

  inject: ['getMap'],

  render() {
    return null;
  },

  props: {
    options: {
      default: () => {
        return {};
      },
      type: [Object, String]
    },
    // Allows to place a layer before another
    before: {
      type: String,
      required: false
    }
  },

  methods: {
    deferredMountedTo(map) {
      // if we were already mounted, we need to remove the old layer
      const oldLayer = map.getLayer(this.options.id);
      if(oldLayer) {
        map.removeLayer(this.options.id);
        try {
          map.removeSource(oldLayer.source);
        } catch {
          console.warn('could not remove source', oldLayer.source);
        }
      }
      // if we  want to add a layer before another layer, use the before option
      if(this.before) {
        map.addLayer(this.options, this.before);
      } else {
        map.addLayer(this.options);
      }
    }
  },

  watch: {
    options: {
      deep: true,
      handler() {
        const map = this.getMap();
        if(map) {
          this.deferredMountedTo(map);
        }
      }
    }
  },

  mounted() {
    // We can mount the layer if the map exists
    const map = this.getMap();
    if(map) {
      this.deferredMountedTo(map);
    }
  }
};
