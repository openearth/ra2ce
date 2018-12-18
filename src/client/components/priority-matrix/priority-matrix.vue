<template>
  <form
    class="priority-matrix"
    @submit.prevent
  >
    <fieldset>
      <legend>Priorities matrix</legend>
      <table class="priority-matrix__table">
        <tbody class="priority-matrix__tbody">
          <tr
            v-for="y in edgeSize"
            :key="y"
            class="priority-matrix__row"
          >
            <td
              v-for="x in edgeSize"
              :key="((y-1) * edgeSize + x)"
              class="priority-matrix__element"
            >
              <input
                :value="priorities[ ((y-1) * edgeSize + x) - 1 ]"
                :min="1"
                :max="edgeSize"
                type="number"
                class="priority-matrix__value"
                @change="(event) => updateMatrix({ value: event.target.value, x, y })"
                @focus="$event.target.select()"
              >
            </td>
          </tr>
        </tbody>
      </table>
    </fieldset>
  </form>
</template>

<script>
export default {
  props: {
    edgeSize: {
      type: Number,
      required: true,
      default: undefined,
    },
    priorities: {
      type: Array,
      required: true,
      default: () => [],
      validator: (priorities) => {
        const prioritiesLength = priorities.length
        if(prioritiesLength === 0) { return false }
        return Number.isInteger(Math.sqrt(prioritiesLength))
      }
    }
  },
  methods: {
    updateMatrix({ value, x, y }) {
      this.$emit('updateMatrix', { value: Number(value), x, y })
    }
  }
}
</script>

<style>
  .priority-matrix__table,
  .priority-matrix__tbody,
  .priority-matrix__row {
    width: 100%;
  }

  .priority-matrix__row {
    display: flex;
    justify-content: space-evenly;
    margin-bottom: .5rem;

  }

  .priority-matrix__element {
    width: 40px;
    height: 40px;
  }

  .priority-matrix__value {
    width: 100%;
    height: 100%;
    text-align: center;
    font-size: 20px;
    line-height: 20px;
  }
</style>
