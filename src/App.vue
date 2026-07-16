<script setup lang="ts">
import { ref, provide } from 'vue'
import metrics from './data/metrics.json'

const months = ['All', ...metrics.map((m: any) => m.month)]
const selectedMonth = ref<string>('May 2025')
provide('selectedMonth', selectedMonth)
provide('months', months)
</script>

<template>
  <v-app>
    <v-app-bar height="64" dark flat style="background: linear-gradient(90deg,#5b3cff 0%, #6a4cff 100%);">
      <v-toolbar-title class="hide-on-mobile" style="font-weight:700; letter-spacing:0.2px; font-size:1.2rem">FastForward Logistics Dashboard</v-toolbar-title>
      <v-toolbar-title class="show-on-mobile" style="font-weight:700; letter-spacing:0.2px; font-size:16px; display:none">Dashboard</v-toolbar-title>
      <v-spacer />
      <div class="header-control">
        <span class="header-label">Select month</span>
        <v-select
          v-model="selectedMonth"
          :items="months"
          density="compact"
          hide-details
          variant="solo"
          style="max-width: 220px"
          class="month-select"
        />
      </div>
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

<style scoped>
.header-control {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-left: 12px;
}

.header-label {
  font-size: 0.95rem;
  font-weight: 600;
  white-space: nowrap;
}

.month-select {
  min-width: 180px;
}
</style>
