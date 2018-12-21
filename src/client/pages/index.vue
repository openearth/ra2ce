<template>
  <div>
    <portal
      v-if="getPrioritiesError"
      to="map-notification"
    >
      <map-notification
        :message="getPrioritiesError"
        type="error"
      />
    </portal>
    <portal
      v-if="getPrioritiesMessage"
      to="map-notification"
    >
      <map-notification
        :message="getPrioritiesMessage"
      />
    </portal>
    <portal to="side-panel">
      <div>
        <layers-list
          :layers="extendedLayers"
          @selectLayer="selectLayer"
          @toggleLayerVisibility="toggleLayerVisibility"
        />
      </div>
    </portal>
    <portal to="side-panel-bottom">
      <div class="calculate-priorities">
        <priority-matrix
          :edge-size="edgeSize"
          :priorities="priorities"
          class="calculate-priorities__matrix"
          @updateMatrix="updatePriorities"
        />
        <md-switch
          v-model="liveUpdate"
          class="calculate-priorities__live-update"
        >
          Live update
        </md-switch>
        <button
          :disabled="liveUpdate"
          class="calculate-priorities__button button button--primary button--full-width"
          @click="calculatePrioritiesMap"
        >
          RA2CE!
        </button>
      </div>
    </portal>
  </div>
</template>

<script>
import debounce from 'lodash.debounce'
import { mapGetters, mapState } from 'vuex'

import { generateWmsLayer, priorities } from '../lib/project-layers'
import layers from '../lib/_mapbox/layers'
import wps from '../lib/wps'

import { LayersList, MapNotification, PriorityMatrix } from '../components'

export default {
  components: { LayersList, MapNotification, PriorityMatrix },
  data() {
    return {
      getPrioritiesError: undefined,
      getPrioritiesMessage: undefined,
      liveUpdate: false,
      selectedLayerIndex: undefined,
    }
  },
  computed: {
    ...mapState('mapbox/wms', [ 'layers' ]),
    ...mapGetters('mapbox/wms', [ 'extendedLayers', 'layerLegends' ]),
    ...mapState('priorities', [ 'edgeSize', 'priorities' ]),
    ...mapGetters('priorities', [ 'prioritiesMatrix' ])
  },
  methods: {
    calculatePrioritiesMap: debounce(function() {
      this.getPrioritiesMessage = 'Calculating the priorities layer'
      this.getPrioritiesError = undefined
      wps({
        functionId: 'ra2ce_calc_ratio',
        uid: '1234',
        json_matrix: { values: this.prioritiesMatrix },
      })
        .then(layer => {
          this.getPrioritiesMessage = undefined
          this.$store.dispatch('mapbox/wms/remove', priorities.id)
          this.$store.dispatch('mapbox/wms/add', priorities)
        })
        .catch(err => {
          this.getPrioritiesMessage = undefined
          this.getPrioritiesError = 'Error Calculating the priorities layer, please retry'
        })
    }, 300),
    selectLayer(index) {
      this.$store.commit('mapbox/setLegendLayer', this.layerLegends[index])
    },
    toggleLayerVisibility({ index, active }) {
      this.$store.dispatch('mapbox/wms/setOpacity', {
        id: this.extendedLayers[index].id,
        opacity: active ? 1 : 0,
      })
    },
    updatePriorities(updateData) {
      this.$store.commit('priorities/updatePriorities', updateData)

      if(this.liveUpdate) {
        this.calculatePrioritiesMap()
      }
    }
  }
}
</script>

<style>
  .calculate-priorities {
    width: 100%;
  }

  .calculate-priorities__live-update {
    margin-bottom: var(--spacing-half);
  }

  .calculate-priorities__button {
    margin-bottom: var(--spacing-default);
  }
</style>
