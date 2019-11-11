import { parseUrl } from 'query-string'

export const state = () => ({
  layers: [],
})

export const mutations = {
  add(state, layer) {
    if(!state.layers.some(storedLayer => storedLayer.id == layer.id)) {
      state.layers = [ ...state.layers, layer ]
    }
  },
  remove(state, id) {
    state.layers = state.layers.filter(layer => layer.id !== id)
  },
  resetLayers(state) {
    state.layers = []
  },
  setOpacity(state, { id, opacity }) {
    const index = state.layers.findIndex(layer => layer.id === id)

    if(index > -1) {
      const newLayers = [ ...state.layers ]
      newLayers[index] = { ...newLayers[index], opacity }
      state.layers = newLayers
    }
  },
}

export const actions = {
  add({ commit, rootGetters }, layer) {
    const map = rootGetters['mapbox/map']

    if(!map.getLayer(layer.id)) {
      map.addLayer(layer)
      commit('add', layer)
    }
  },
  setOpacity({ commit, rootGetters }, { id, opacity }) {
    const map = rootGetters['mapbox/map']

    if(map.getLayer(id)) {
      map.setPaintProperty(id, 'raster-opacity', opacity)
      commit('setOpacity', { id, opacity })
    }
  },
  remove({ commit, rootGetters }, id) {
    const map = rootGetters['mapbox/map']

    if(map.getLayer(id)) {
      map.removeLayer(id)
      map.removeSource(id)
      commit('remove', id)
    }
  },
  resetLayers({ commit, rootGetters, state }, id) {
    const map = rootGetters['mapbox/map']

    state.layers.forEach(({ id }) => {
      if(map.getLayer(id)) {
        map.removeLayer(id)
        map.removeSource(id)
      }
    })

    commit('resetLayers')
  }
}

export const getters = {
  extendedLayers(state, _1, _2, rootGetters) {
    const map = rootGetters['mapbox/map']

    return state.layers
      .map(layer => {
        const visible = typeof layer.opacity === 'undefined'
          ? map.getPaintProperty(layer.id, 'raster-opacity') !== 0
          : !!(map.getPaintProperty(layer.id, 'raster-opacity') !== 0 && layer.opacity !== 0 )

          return {
          ...layer,
          visible,
        }
      })
  },
  layerLegends(state) {
    return state.layers
      .map(layer => layer.source.tiles[0] )
      .map(parseUrl)
      .map(url => url.query)
      .map(({ style, layers }) => ({ style, layer: layers }))
  }
}
