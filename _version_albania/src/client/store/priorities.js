const initialPriorities = [
  1, 1, 1, 1, 2,
  1, 2, 2, 2, 3,
  2, 2, 3, 3, 4,
  3, 3, 4, 4, 5,
  3, 4, 4, 5, 5,
]

export const state = () => ({
  edgeSize: Math.sqrt(initialPriorities.length),
  priorities: initialPriorities,
})

export const mutations = {
  resetPriorities(state) {
    state.priorities = initialPriorities
  },
  updatePriorities(state, { value, x, y }) {
    const newPriorities = [ ...state.priorities ]

    if(value < 1 || value > 5) {
      state.priorities = newPriorities
      return
    }

    const index = (y-1) * state.edgeSize + (x-1)
    newPriorities[index] = value
    state.priorities = newPriorities
  }
}

export const getters = {
  prioritiesMatrix(state) {
    const result = []
    const edgeSize = state.edgeSize

    for(let i=1;i<=edgeSize;i++) {
      const row = []
      for(let j=0;j<edgeSize;j++) {
        const index = (i - 1) * edgeSize + j
        row.push(state.priorities[index])
      }
      result.push(row)
    }
    return result
  }
}