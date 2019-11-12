

export default {
  namespaced: true,

  state: {
    wmsLayers : []
  },

  getters: {
    wmsLayers: state => state.wmsLayers
  },

  mutations: {
    ADD_WMS_LAYER(state, newLayer) {
      const layerExists = state.wmsLayers.some(storedLayer => storedLayer.id === newLayer.id);
      if(!layerExists) {
        state.wmsLayers = [ ...state.wmsLayers, newLayer ];
      }
    }
  },

  actions: {

  }
};
