<template>
  <div class="layer-legend">
    <img
      :src="legendUrl"
      class="layer-legend__image"
      alt="risk legend"
    >
  </div>
</template>

<script>
import buildLegendUrl from '@/lib/build-legend-url';

export default {
  props: {
    legendLayer: {
      type: String,
      required: true
    }
  },

  computed: {
    legendUrl() {
      return buildLegendUrl(this.legendLayer);
    }
  }
};
</script>

<style>
  .layer-legend {
    position: absolute;
    width: 175px;
    bottom: 2rem;
    left: .5rem;
    background-color: white;
    outline: 0;
    border: 0;
    border-radius: 4px;
    box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.1);
    z-index: 1;
  }

  .layer-legend__image {
    border-radius: 4px;
  }
</style>
