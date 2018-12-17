<template>
  <form
    @submit.prevent
  >
    <fieldset>
      <legend>Priorities matrix</legend>
      <table>
        <tbody>
          <tr
            v-for="y in edgeSize"
            :key="y"
          >
            <td
              v-for="x in edgeSize"
              :key="x*y"
            >
              <input
                :value="priorities[ x * y - 1 ]"
                :min="1"
                :max="edgeSize"
                type="number"
                @change="(event) => updateMatrix({ value: event.target.value, x, y })"
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
  computed: {
    edgeSize() {
      return Math.sqrt(this.priorities.length)
    }
  },
  methods: {
    updateMatrix({ value, x, y }) {
      console.log('Update matrix', { value, x, y })
      this.$emit('updateMatrix', { value: Number(value), x, y })
    }
  }
}
</script>
