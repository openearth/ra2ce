export default {
  namespaced: true,

  state: {
    wmsLayers: [],
    legendLayerId: null
  },

  getters: {
    wmsLayers: state => state.wmsLayers,
    legendLayerId: state => state.legendLayerId
  },

  mutations: {
    ADD_WMS_LAYER(state, newLayer) {
      const layerExists = state.wmsLayers.some(storedLayer => storedLayer.id === newLayer.id);
      if(!layerExists) {
        state.wmsLayers = [
          ...state.wmsLayers, {
            ...newLayer,
            visible: true
          }
        ];
      }
    },
    REMOVE_WMS_LAYER(state, id) {
      state.wmsLayers = state.wmsLayers.filter(layer => layer.id !== id);
    },
    SET_LEGEND_LAYER(state, id) {
      state.legendLayerId = id;
    }
  }
};