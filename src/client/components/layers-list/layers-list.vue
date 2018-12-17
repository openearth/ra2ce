<template>
  <div>
    <md-list class="layers-list">
      <md-subheader class="layers-list__header">
        Map layers
      </md-subheader>
      <div class="layers-list__list">
        <div
          v-for="(layer, index) in layers"
          :key="layer.id"
        >
          <md-list-item class="layers-list__list-item">
            <md-button
              class="md-icon-button"
              @click="toggleLayerVisibility(index)"
            >
              <md-icon :disabled="!layer.visible">
                {{ layer.visible ? 'visibility' : 'visibility_off' }}
              </md-icon>
            </md-button>
            <span class="layers-list__list-item-title">{{ formatId2Title(layer.id) }}</span>
          </md-list-item>
        </div>
      </div>
    </md-list>
  </div>
</template>

<script>

export default {
  props: {
    layers: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      selectedLayerIndex: null,
    }
  },
  methods: {
    formatId2Title(id) {
      return id.split('_').join(' ')
    },
    toggleLayerVisibility(index) {
      this.$emit('toggleLayerVisibility', { index, active: !this.layers[index].visible })
    },
    toggleLayer(index) {
      if (this.selectedLayerIndex === index) {
        this.selectedLayerIndex = null
        return
      }

      this.selectedLayerIndex = index
    },
  },
}
</script>

<style>
.layers-list {
  z-index: 1;
  padding: var(--spacing-default) 0 !important;
}

.layers-list__header {
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding-bottom: .7rem !important;
  border-bottom: 1px solid #eee;
  background-color: transparent;
  font-size: 1rem !important;
  font-weight: bold;
}

.layers-list__list {
  position: relative;
}

.layers-list__list-item {
  border-bottom: 1px solid #eee;
}

.layers-list__list .md-list-item-content {
  padding: .8rem 0;
}

.layers-list__list-item-title {
  margin-right: auto;
  font-size: var(--font-size-default);
  text-transform: capitalize;
}

.layers-list__list-item-button {
  margin: 0 20px !important;
}

.layers-list__list-item-settings {
  --card-width: 270px;
  width: var(--card-width);
  position: absolute;
  top: 0;
  right: calc(calc(var(--card-width) * -1) - 25px);
  padding: var(--spacing-default);
  background-color: #fff;
  z-index: 2;
  box-shadow: 0 2px 5px 0 var(--neutral-color);
}

.layers-list__list-item-settings .md-subheader {
  padding: 0;
}

.layers-list__list-item-settings-wrapper {
  position: relative;
}

.layers-list__list-item-settings-button {
  position: absolute !important;
  top: calc(calc(var(--spacing-default) - 10px) * -1);
  right: calc(calc(var(--spacing-default) - 10px) * -1);
  margin: 0 !important;
}
</style>
