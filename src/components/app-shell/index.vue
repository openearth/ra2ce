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
      <mapbox-map />
    </v-content>

    <welcome-dialog />

  </v-app>
</template>

<script>
import Sidebar from '@/components/app-shell/sidebar';
import MapboxMap from '@/components/mapbox-map';
import WelcomeDialog from './welcome-dialog';

export default {
  components: {
    Sidebar,
    MapboxMap,
    WelcomeDialog
  }
};
</script>

<style src="@/assets/css/index.css"></style>
