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
        RA2CE is a webgis tool that allows visualisation of priorities of societal/operator costs on infrastructure for various types of hazard for the Duch infrastructuren network.
      </v-card-text>
      <v-card-text class="text--primary">
        The website is currently under maintenance. As a consequence, the presented prioritization may not be correct and should be checked carefully. 
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
//const LOCALSTORAGE_KEY = 'ra2ce_accepted';

export default {
  data: () => ({
    showWelcomeDialog: true
  }),
 /*  beforeMount() {
    // show welcome screen every time
    const accepted = window.localStorage.getItem(LOCALSTORAGE_KEY);
    if (accepted) {
      this.showWelcomeDialog = false;
    }
  }, */
  methods: {
    onStartClick() {
      this.showWelcomeDialog = false;
      //window.localStorage.setItem(LOCALSTORAGE_KEY, true);
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
