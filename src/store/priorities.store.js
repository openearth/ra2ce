const initialPriorities = [
  1, 1, 1, 1, 2,
  1, 2, 2, 2, 3,
  2, 2, 3, 3, 4,
  3, 3, 4, 4, 5,
  3, 4, 4, 5, 5,
];

export default {
  namespaced: true,

  state: {
    edgeSize: Math.sqrt(initialPriorities.length),
    priorities: initialPriorities,
  },

  getters: {
    edgeSize: state => state.edgeSize,
    priorities: state => state.priorities,
    prioritiesMatrix(state) {
      const result = [];
      const edgeSize = state.edgeSize;

      for(let i=1; i<=edgeSize; i++) {
        const row = [];
        for(let j=0; j<edgeSize; j++) {
          const index = (i - 1) * edgeSize + j;
          row.push(state.priorities[index]);
        }
        result.push(row);
      }
      return result;
    }
  },

  mutations: {
    RESET_PRIORITIES(state) {
      state.priorities = initialPriorities;
    },
    UPDATE_PRIORITIES(state, { value, x, y }) {
      const newPriorities = [ ...state.priorities ];

      if(value < 1 || value > 5) {
        state.priorities = newPriorities;
        return;
      }

      const index = (y-1) * state.edgeSize + (x-1);
      newPriorities[index] = value;
      state.priorities = newPriorities;
    }
  }
};
