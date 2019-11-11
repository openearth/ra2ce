<template>
  <v-app>
    <sidebar />

    <v-app-bar
      class="app-header"
      app color="indigo"
      dark
    >
      <v-toolbar-title>
        RA2CE
      </v-toolbar-title>
    </v-app-bar>

    <v-content>
      <!-- <app-map /> -->
    </v-content>

    <welcome-dialog />

  </v-app>
</template>

<script>
// import AppMap from '@/components/app-map';
import Sidebar from '@/components/app-shell/sidebar';
import WelcomeDialog from './welcome-dialog';

export default {
  components: {
    Sidebar,
    WelcomeDialog
  }
};
</script>

<style src="@/assets/css/index.css"></style>
