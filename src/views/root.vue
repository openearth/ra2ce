<template>
  <div>
    <risks-list
      :risks="risks"
      :activeLegendId="legendLayerId || ''"
      @updateVisibility="onVisibilityChange"
      @updateLegend="onLegendChange"
    />
    <priority-matrix
      :edge-size="edgeSize"
      :priorities="priorities"
      @updateMatrix="updatePriorities"
    />
    <v-btn
      :disabled="liveUpdate"
      @click="calculatePrioritiesMap"
    >
      RA2CE!
    </v-btn>
  </div>
</template>

<script>
import debounce from 'lodash.debounce';
import wps from '@/lib/wps';
import { priorities } from '@/lib/project-layers';

import RisksList from '@/components/risks-list';
import PriorityMatrix from '@/components/priority-matrix';

export default {
  components: {
    RisksList,
    PriorityMatrix
  },

  data: () => ({
    liveUpdate: false,
    getPrioritiesMessage: null,
    getPrioritiesError: null
  }),

  computed: {
    risks() {
      return this.$store.getters['mapbox/wmsLayers'];
    },
    legendLayerId() {
      return this.$store.getters['mapbox/legendLayerId'];
    },
    edgeSize() {
      return this.$store.getters['priorities/edgeSize'];
    },
    priorities() {
      return this.$store.getters['priorities/priorities'];
    },
    prioritiesMatrix() {
      return this.$store.getters['priorities/prioritiesMatrix'];
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
    },
    updatePriorities(updateData) {
      this.$store.commit('priorities/updatePriorities', updateData);

      if(this.liveUpdate) {
        this.calculatePrioritiesMap();
      }
    },
    calculatePrioritiesMap: debounce(function() {
      console.log('start!');
      this.getPrioritiesMessage = 'Calculating the priorities layer';
      this.getPrioritiesError = null;
      wps({
        functionId: 'ra2ce_calc_ratio',
        uid: '1234',
        json_matrix: { values: this.prioritiesMatrix },
      })
      .then(() => {
        this.getPrioritiesMessage = null;
        this.$store.commit('mapbox/REMOVE_WMS_LAYER', priorities.id);
        this.$store.commit('mapbox/ADD_WMS_LAYER', priorities);
      })
      .catch(() => {
        this.getPrioritiesMessage = null;
        this.getPrioritiesError = 'Error Calculating the priorities layer, please retry';
      });
    }, 300)
  }

};
</script>
