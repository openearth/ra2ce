<template>
  <div>


    <!-- @TODO :: Vuetify this -->
    <select
      v-model="selectedHazard"
    >
      <option disabled value="">Please select one</option>
      <option
        v-for="hazard in hazards"
        :key="hazard.layer_name"
        :value="hazard.layer_name"
      >
        {{ hazard.name }}
      </option>
    </select>



    <risks-list
      :risks="risks"
      :activeLegendId="legendLayerId || ''"
      @updateVisibility="onVisibilityChange"
      @updateLegend="onLegendChange"
      class="mb-8"
    />
    <priority-matrix
      :edge-size="edgeSize"
      :priorities="priorities"
      @updateMatrix="updatePriorities"
      @reset="restart"
    />
    <div class="mt-4 d-flex align-center">
      <v-switch
        label="Live Update"
        v-model="liveUpdate"
      ></v-switch>
      <v-spacer />
      <v-btn
        :disabled="liveUpdate"
        @click="calculatePrioritiesMap"
        color="primary"
      >
        RA2CE! 🏎
      </v-btn>
    </div>
  </div>
</template>

<script>
import debounce from 'lodash.debounce';
import wps from '@/lib/wps';
import { HAZARDS } from '@/lib/constants';
import { generateWmsLayer, priorities } from '@/lib/project-layers';

import RisksList from '@/components/risks-list';
import PriorityMatrix from '@/components/priority-matrix';

export default {
  components: {
    RisksList,
    PriorityMatrix,
  },

  data: () => ({
    selectedHazard: '',
    liveUpdate: false,
    getPrioritiesMessage: null,
    getPrioritiesError: null
  }),

  computed: {
    wmsLayers() {
      return this.$store.getters['mapbox/wmsLayers'];
    },
    risks() {
      return this.$store.getters['mapbox/layersWithVisibility'];
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
    },
    hazards() {
      return HAZARDS;
    }
  },

  watch: {
    liveUpdate(newVal) {
      if(newVal) this.calculatePrioritiesMap();
    },

    selectedHazard(hazard) {
      // First remove existing layers
      this.wmsLayers.forEach(({ id }) => {
        this.$store.commit('mapbox/REMOVE_WMS_LAYER', id);
      });
      // Then add layers
      [
        {
          id: `${ hazard }_herstelkosten`,
          layer: `ra2ce:${ hazard }_herstelkosten`,
        },
        {
          id: `${ hazard }_stremmingskosten`,
          layer: `ra2ce:${ hazard }_stremmingskosten`,
        },
        // {
        //   id: `${ hazard }_herstelkosten`,
        //   layer: `ra2ce:${ hazard }_classroads_testing`,
        //   style: 'ra2ce'
        // }
      ]
      .map(generateWmsLayer)
      .forEach(layer => {
        this.$store.commit('mapbox/ADD_WMS_LAYER', layer);
      });
    }
  },

  methods: {
    onVisibilityChange(id) {
      const map = this.$root.map;
      this.$store.commit('mapbox/UPDATE_LAYER_VISIBILITY', { id, map });
    },

    onLegendChange(id) {
      this.$store.commit('mapbox/SET_LEGEND_LAYER', this.legendLayerId === id ? null : id);
    },

    updatePriorities(updateData) {
      this.$store.commit('priorities/UPDATE_PRIORITIES', updateData);

      if(this.liveUpdate) {
        this.calculatePrioritiesMap();
      }
    },

    calculatePrioritiesMap: debounce(function() {
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
    }, 300),

    restart() {
      this.$store.commit('priorities/RESET_PRIORITIES');
      this.calculatePrioritiesMap();
    }
  }

};
</script>
