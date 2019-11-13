<template>
  <form
    class="priority-matrix"
    @submit.prevent
  >
    <table class="priority-matrix__table">
      <caption class="priority-matrix__caption">Priorities matrix</caption>
      <tbody class="priority-matrix__tbody">
        <tr class="priority-matrix__y-axis">
          <th
            scope="rowgroup"
            rowspan="6"
          >
            Societal losses classes
          </th>
        </tr>
        <tr class="priority-matrix__row">
          <th
            colspan="6"
            scope="row"
          >
            Operator costs classes
          </th>
        </tr>
        <tr class="priority-matrix__row">
          <th
            class="priority-matrix__element"
            scope="col"
          >
            &nbsp;
          </th>
          <th
            class="priority-matrix__element"
            scope="col"
          >
            1
          </th>
          <th
            class="priority-matrix__element"
            scope="col"
          >
            2
          </th>
          <th
            class="priority-matrix__element"
            scope="col"
          >
            3
          </th>
          <th
            class="priority-matrix__element"
            scope="col"
          >
            4
          </th>
          <th
            class="priority-matrix__element"
            scope="col"
          >
            5
          </th>
        </tr>
        <tr
          v-for="y in edgeSize"
          :key="y"
          class="priority-matrix__row"
        >
          <!-- <th scope="col">boven 1</th> -->
          <th scope="row">{{ y }}</th>
          <td
            v-for="x in edgeSize"
            :key="((y-1) * edgeSize + x)"
            class="priority-matrix__element"
          >
            <input
              :class="`priority-matrix__value--${priorityToClass(priorities[ ((y-1) * edgeSize + x) - 1 ])}`"
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
  </form>
</template>

<script>
import priorityToClass from '@/lib/priority-to-class';

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
        const prioritiesLength = priorities.length;
        if(prioritiesLength === 0) return false;
        return Number.isInteger(Math.sqrt(prioritiesLength));
      }
    }
  },
  methods: {
    priorityToClass(priority) {
      return priorityToClass(priority);
    },
    updateMatrix({ value, x, y }) {
      this.$emit('updateMatrix', { value: Number(value), x, y });
    }
  }
};
</script>

<style>
  .priority-matrix__table {
    position: relative;
  }

  .priority-matrix__table,
  .priority-matrix__tbody,
  .priority-matrix__row {
    width: 100%;
  }

  .priority-matrix__caption {
    font-size: 16px;
    font-weight: 500;
    color: rgba(0, 0, 0, 0.54);
    margin: 0 -1rem;
    padding: 0 1rem 0.7rem;
    text-align: left;
    border-bottom: solid 1px #eee;

    margin-top: 4rem; /* @TODO :: Style properly */
  }

  .priority-matrix__row {
    /* display: flex;
    justify-content: space-evenly; */
    margin-bottom: .5rem;

  }

  .priority-matrix__element {
    width: 40px;
    height: 40px;
  }

  input.priority-matrix__value[type='number'] {
    -moz-appearance:textfield;
  }

  input.priority-matrix__value::-webkit-outer-spin-button,
  input.priority-matrix__value::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  .priority-matrix__value {
    color: #2f2d2e;
    width: 100%;
    height: 100%;
    border: 1px solid #b3b2b3;
    text-align: center;
    font-size: 20px;
    line-height: 20px;
  }

  .priority-matrix__y-axis {
    position: absolute;
    transform: rotateZ(-90deg);
    left: -60px;
    top: 180px;
  }

  .priority-matrix__value--very-low {
    background-color: #1AAE54;
  }

  .priority-matrix__value--low {
    background-color: #94CE58;
  }

  .priority-matrix__value--medium {
    background-color: #FFFD38;
  }

  .priority-matrix__value--high {
    background-color: #FDBF2D;
  }

  .priority-matrix__value--very-high {
    background-color: #FC0D1B;
  }
</style>
