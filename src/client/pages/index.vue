<template>
  <div>
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
        <md-switch
          v-model="liveUpdate"
          class="calculate-priorities__live-update"
        >
          Live update
        </md-switch>
        <priority-matrix
          :edge-size="edgeSize"
          :priorities="priorities"
          class="calculate-priorities__matrix"
          @updateMatrix="updatePriorities"
        />
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
import { mapGetters, mapState, mapMutations, mapActions } from 'vuex'

import { globalRoads, wmsSelectionFromFactor, selectionToCustomFactorLayer, generateWmsLayer, priorities } from '../lib/project-layers'
import layers from '../lib/_mapbox/layers'
import wps from '../lib/wps'

import { LayersList, PriorityMatrix } from '../components'

const defaultPriorities = [
  1, 1, 1, 1, 2,
  1, 2, 2, 2, 3,
  2, 2, 3, 3, 4,
  3, 3, 4, 4, 5,
  3, 4, 4, 5, 5,
]

export default {
  components: { LayersList, PriorityMatrix },
  data() {
    return {
      liveUpdate: false,
      priorities: defaultPriorities,
      selectedLayerIndex: undefined,
    }
  },
  computed: {
    ...mapState('mapbox/wms', [ 'layers' ]),
    ...mapGetters('mapbox/wms', [ 'extendedLayers' ]),
    edgeSize() { return Math.sqrt(this.priorities.length) },
    prioritiesMatrix() {
      const result = []
      const edgeSize = this.edgeSize
      for(let i=1;i<=edgeSize;i++) {
        const row = []
        for(let j=0;j<edgeSize;j++) {
          const index = (i - 1) * edgeSize + j
          row.push(this.priorities[index])
        }
        result.push(row)
      }
      return result
    }
  },
  methods: {
    calculatePrioritiesMap() {
      wps({
        functionId: 'ra2ce_calc_ratio',
        uid: '1234',
        json_matrix: { values: this.prioritiesMatrix },
      })
        .then(wpsResponse => console.log('wpsResponse', wpsResponse))
        .catch(err => console.log('Error calling wps service:', err))

      console.log('PRIOS', priorities)

      this.$store.dispatch('mapbox/wms/remove', priorities.id)
      this.$store.dispatch('mapbox/wms/add', priorities)
    },
    selectLayer(index) {
      console.log('Select the layer with index:', index)
      this.$store.commit('mapbox/setLegendLayer', {
        layer: 'ra2ce:operator_costs',
        style: 'ra2ce',
       })
    },
    toggleLayerVisibility({ index, active }) {
      this.$store.dispatch('mapbox/wms/setOpacity', {
        id: this.extendedLayers[index].id,
        opacity: active ? 1 : 0,
      })
    },
    updatePriorities({ value, x, y }) {
      console.log('update...', { value, x, y })
      const newPriorities = [ ...this.priorities ]
      if(value < 1 || value > 5) {
        this.priorities = newPriorities
        return
      }

      const index = (y-1) * this.edgeSize + (x-1)
      newPriorities[index] = value
      this.priorities = newPriorities

      if(this.liveUpdate) {
        console.log('and calculate')
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

  .calculate-priorities__matrix {
    margin-bottom: var(--spacing-default);
  }

  .calculate-priorities__button {
    margin-bottom: var(--spacing-default);
  }
</style>
