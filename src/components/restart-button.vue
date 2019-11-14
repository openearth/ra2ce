<template>
  <v-tooltip bottom>
    <template v-slot:activator="{ on }">
      <v-btn text icon v-on="on" @click="restart">
        <v-icon>mdi-file-restore</v-icon>
      </v-btn>
    </template>
    <span>Restart</span>
  </v-tooltip>
</template>

<script>
  export default {
    methods: {
      restart() {
        this.$store.commit('priorities/RESET_PRIORITIES');
      }
    }
  };
</script>
