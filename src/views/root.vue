<template>
  <div>
    <risks-list
      :risks="risks"
      :activeLegendId="legendLayerId || ''"
      @updateVisibility="onVisibilityChange"
      @updateLegend="onLegendChange"
    />
  </div>
</template>

<script>
import RisksList from '@/components/risks-list';

export default {
  components: {
    RisksList
  },

  computed: {
    risks() {
      return this.$store.getters['mapbox/wmsLayers'];
    },
    legendLayerId() {
      return this.$store.getters['mapbox/legendLayerId'];
    }
  },

  methods: {
    onVisibilityChange(id) {
      const map = this.$root.map;
      const risk = this.risks.find(risk => risk.id === id);
      const opacityToSet = risk.visible ? 0 : 1;
      map.setPaintProperty(id, 'raster-opacity', opacityToSet);
      risk.visible = !risk.visible;
    },
    onLegendChange(id) {
      this.$store.commit('mapbox/SET_LEGEND_LAYER', this.legendLayerId === id ? null : id);
    }
  }

};
</script>
