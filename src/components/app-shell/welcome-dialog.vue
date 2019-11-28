<template>
  <v-dialog
    v-model="showWelcomeDialog"
    max-width="640"
    persistent
  >
    <v-card>
      <v-card-title>
        Welcome
      </v-card-title>
      <div class="welcome-dialog__images">
        <img
          src="@/assets/img/OE_logo.png"
          alt="OE logo"
        >
        <img
          src="@/assets/img/logo-m-2x.png"
          alt="Deltares logo"
        >
      </div>
      <v-card-text>
        Ra2ce is a webGIS toolkit based on global road datasets <a href="https://www.openstreetmap.org/" target="_blank">OpenStreetMap</a> in combination with various hazard data. It helps users to visualize the best ratio of societal/operator costs on infrastructure.
      </v-card-text>
      <v-card-actions class="px-6 pb-6">
        <v-spacer></v-spacer>
        <v-btn
          class="primary"
          text
          @click="onStartClick"
        >
          Let's get started
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
const LOCALSTORAGE_KEY = 'ra2ce_accepted';

export default {
  data: () => ({
    showWelcomeDialog: true
  }),
  beforeMount() {
    const accepted = window.localStorage.getItem(LOCALSTORAGE_KEY);

    if (accepted) {
      this.showWelcomeDialog = false;
    }
  },
  methods: {
    onStartClick() {
      this.showWelcomeDialog = false;

      window.localStorage.setItem(LOCALSTORAGE_KEY, true);
    }
  }
};
</script>

<style>
  .welcome-dialog__images {
    display: flex;
    padding: 0 1.5rem 1.5rem;
    align-items: flex-start;
  }

  .welcome-dialog__images img {
    width: 10rem;
    margin-right: 1rem;
  }
</style>
