<template>
  <v-tooltip bottom>
    <template v-slot:activator="{ on }">
      <v-btn
        @click="$emit('button-click')"
        text
        icon
        v-on="on"
      >
        <v-icon>mdi-file-restore</v-icon>
      </v-btn>
    </template>
    <span>Restart</span>
  </v-tooltip>
</template>
