export default {
  namespaced: true,

  state: {
    wmsLayers: [],
    layerVisibilityProxies: [],
    legendLayer: null
  },

  getters: {
    wmsLayers: state => state.wmsLayers,
    layerVisibilityProxies: state => state.layerVisibilityProxies,
    layersWithVisibility: state => state.wmsLayers.map(layer => {
      const { visible } = state.layerVisibilityProxies.find(p => p.id === layer.id);
      return {
        ...layer,
        visible
      };
    }),
    legendLayer: state => state.legendLayer
  },

  mutations: {
    ADD_WMS_LAYER(state, newLayer) {
      const layerExists = state.wmsLayers.some(storedLayer => storedLayer.id === newLayer.id);
      if(!layerExists) {
        state.wmsLayers = [
          ...state.wmsLayers, {
            ...newLayer
          }
        ];
        state.layerVisibilityProxies = [
          ...state.layerVisibilityProxies, {
            id: newLayer.id,
            visible: true
          }
        ];
      }
    },
    REMOVE_WMS_LAYER(state, id) {
      state.wmsLayers = state.wmsLayers.filter(layer => layer.id !== id);
    },
    UPDATE_LAYER_VISIBILITY(state, { id, map }) {
      const layerProxy = state.layerVisibilityProxies.find(proxy => proxy.id === id);
      const opacityToSet = layerProxy.visible ? 0 : 1;
      map.setPaintProperty(id, 'raster-opacity', opacityToSet);
      layerProxy.visible = !layerProxy.visible;
    },
    RESET_LAYERS_VISIBILITY(state) {
      state.layerVisibilityProxies = state.layerVisibilityProxies.map(proxy => ({
    SET_LEGEND_LAYER(state, layer) {
      state.legendLayer = layer;
        ...proxy,
        visible: true
      }));
    },
    }
  }
};
