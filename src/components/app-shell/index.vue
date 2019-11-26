<template>
  <v-app>
    <sidebar />

    <v-app-bar
      class="app-header"
      app
      color="primary"
      dark
    >
      <v-toolbar-title>
        RA2CE
      </v-toolbar-title>
      <v-spacer/>
    </v-app-bar>

    <v-content>
      <risk-legend
        v-if="legendLayer"
        :legendLayer="legendLayer"
      />
      <mapbox-map />
    </v-content>

    <welcome-dialog />

    <portal-target name="notifications" />
  </v-app>
</template>

<script>
import Sidebar from './sidebar';
import WelcomeDialog from './welcome-dialog';
import MapboxMap from '@/components/mapbox-map';
import RiskLegend from '@/components/risk-legend';

export default {
  components: {
    Sidebar,
    WelcomeDialog,
    MapboxMap,
    RiskLegend
  },

  computed: {
    legendLayer() {
      return this.$store.getters['mapbox/legendLayer'];
    }
  }
};
</script>

<style src="@/assets/css/index.css"></style>
