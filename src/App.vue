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
    <v-app-bar height="64" dark flat style="background: linear-gradient(90deg,#5b3cff 0%, #6a4cff 100%);">
      <v-toolbar-title class="text-subtitle-1 hide-on-mobile" style="font-weight:600; letter-spacing:0.2px">My Dashboard</v-toolbar-title>
      <v-toolbar-title class="text-subtitle-1 show-on-mobile" style="font-weight:600; letter-spacing:0.2px; font-size:16px; display:none">Dashboard</v-toolbar-title>
      <v-spacer />
      <v-select
        v-model="selectedMonth"
        :items="months"
        dense
        hide-details
        style="max-width: 220px"
        class="month-select"
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
