<script setup lang="ts">
import { ref, provide } from 'vue'
import metrics from './data/metrics.json'

const months = ['All', ...metrics.map((m: any) => m.month)]
const selectedMonth = ref<string>('All')
provide('selectedMonth', selectedMonth)
provide('months', months)
</script>

<template>
  <v-app>
    <v-app-bar color="primary" dark elevated>
      <v-toolbar-title>My Dashboard</v-toolbar-title>
      <v-spacer />
      <v-select
        v-model="selectedMonth"
        :items="months"
        dense
        hide-details
        style="max-width: 200px"
      />
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>

    <v-footer padless>
      <v-sheet width="100%" class="text-center pa-4" elevation="0">
        Built with Vue 3, TypeScript, Vuetify 3, Chart.js, and Vue Router.
      </v-sheet>
    </v-footer>
  </v-app>
</template>
