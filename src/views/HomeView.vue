<script setup lang="ts">
import { inject, computed } from 'vue'
import metrics from '../data/metrics.json'
import { Bar, Line } from 'vue-chartjs'
import type { ChartData, ChartOptions } from 'chart.js'

const selectedMonth = inject<any>('selectedMonth')

const months = metrics.map((m: any) => m.month)

const filtered = computed(() => {
  if (!selectedMonth || selectedMonth.value === 'All') return metrics
  return metrics.filter((m: any) => m.month === selectedMonth.value)
})

const revenueSeries = computed(() => ({
  labels: metrics.map((m: any) => m.month),
  datasets: [
    {
      label: 'Revenue',
      backgroundColor: metrics.map((m: any) => (selectedMonth && selectedMonth.value === m.month ? '#ffd54f' : '#7c4dff')),
      data: metrics.map((m: any) => m.revenue),
    },
  ],
})) as unknown as ChartData<'bar', number[], string>

const visitorsSeries = computed(() => ({
  labels: metrics.map((m: any) => m.month),
  datasets: [
    {
      label: 'Visitors',
      borderColor: '#4fc3f7',
      backgroundColor: 'rgba(79,195,247,0.12)',
      data: metrics.map((m: any) => m.visitors),
      fill: false,
    },
  ],
})) as unknown as ChartData<'line', number[], string>

const conversionsSeries = computed(() => ({
  labels: metrics.map((m: any) => m.month),
  datasets: [
    {
      label: 'Conversions',
      borderColor: '#66bb6a',
      backgroundColor: 'rgba(102,187,106,0.18)',
      data: metrics.map((m: any) => Math.round(m.conversions * 10000) / 100),
      fill: true,
    },
  ],
})) as unknown as ChartData<'line', number[], string>

const revenueOptions: any = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: { legend: { display: false } },
}

const visitorsOptions: any = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: { legend: { display: false } },
}

const conversionsOptions: any = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: { legend: { display: false } },
  scales: { y: { ticks: { callback: (v: any) => v + '%' } } },
}

function formatMoney(n: number) {
  return n.toLocaleString(undefined, { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })
}

const summary = computed(() => {
  const data = filtered.value
  const totalRevenue = data.reduce((s: number, r: any) => s + r.revenue, 0)
  const totalVisitors = data.reduce((s: number, r: any) => s + r.visitors, 0)
  const avgConversion = data.reduce((s: number, r: any) => s + r.conversions, 0) / data.length
  const totalOrders = data.reduce((s: number, r: any) => s + r.orders, 0)
  return { totalRevenue, totalVisitors, avgConversion, totalOrders }
})

const compare = (value: number, prev: number) => {
  const diff = value - prev
  const pct = prev ? Math.round((diff / prev) * 100) : 0
  return { diff, pct, up: diff >= 0 }
}

const lastMonthIndex = metrics.length - 1
const last = metrics[lastMonthIndex]
const prev = metrics[lastMonthIndex - 1]

function getMonthIndex(month: string) {
  return metrics.findIndex((m: any) => m.month === month)
}

function changeForMetric(key: string) {
  if (!selectedMonth || selectedMonth.value === 'All') {
    return compare((last as any)[key], (prev as any)[key])
  }
  const idx = getMonthIndex(selectedMonth.value)
  if (idx <= 0) return compare(((metrics as any)[idx]?.[key]) ?? 0, ((metrics as any)[idx]?.[key]) ?? 0)
  return compare((metrics as any)[idx][key], (metrics as any)[idx - 1][key])
}

const revenueChange = computed(() => changeForMetric('revenue'))
const visitorsChange = computed(() => changeForMetric('visitors'))
const conversionsChange = computed(() => changeForMetric('conversions'))
const ordersChange = computed(() => changeForMetric('orders'))

</script>

<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <v-sheet class="pa-6" elevation="3">
          <div class="dashboard-header">
            <h1>My Dashboard</h1>
            <p class="subtitle-1">Monthly business metrics — select a month to filter.</p>
          </div>

          <!-- Summary cards -->
          <v-row class="mt-6" dense>
            <v-col cols="12" sm="6" md="3">
              <v-card>
                <v-card-title>Revenue</v-card-title>
                <v-card-text>
                  <div class="text-h5">{{ formatMoney(summary.totalRevenue) }}</div>
                  <div class="caption" :class="revenueChange.up ? 'text-success' : 'text-error'">
                    <v-icon small>{{ revenueChange.up ? 'mdi-arrow-up' : 'mdi-arrow-down' }}</v-icon>
                    {{ revenueChange.pct }}% vs previous month
                  </div>
                </v-card-text>
              </v-card>
            </v-col>

            <v-col cols="12" sm="6" md="3">
              <v-card>
                <v-card-title>Visitors</v-card-title>
                <v-card-text>
                  <div class="text-h5">{{ summary.totalVisitors.toLocaleString() }}</div>
                  <div class="caption" :class="visitorsChange.up ? 'text-success' : 'text-error'">
                    <v-icon small>{{ visitorsChange.up ? 'mdi-arrow-up' : 'mdi-arrow-down' }}</v-icon>
                    {{ visitorsChange.pct }}% vs previous month
                  </div>
                </v-card-text>
              </v-card>
            </v-col>

            <v-col cols="12" sm="6" md="3">
              <v-card>
                <v-card-title>Conversions</v-card-title>
                <v-card-text>
                  <div class="text-h5">{{ Math.round(summary.avgConversion * 10000) / 100 }}%</div>
                  <div class="caption" :class="conversionsChange.up ? 'text-success' : 'text-error'">
                    <v-icon small>{{ conversionsChange.up ? 'mdi-arrow-up' : 'mdi-arrow-down' }}</v-icon>
                    {{ conversionsChange.pct }}% vs previous month
                  </div>
                </v-card-text>
              </v-card>
            </v-col>

            <v-col cols="12" sm="6" md="3">
              <v-card>
                <v-card-title>Orders</v-card-title>
                <v-card-text>
                  <div class="text-h5">{{ summary.totalOrders.toLocaleString() }}</div>
                  <div class="caption" :class="ordersChange.up ? 'text-success' : 'text-error'">
                    <v-icon small>{{ ordersChange.up ? 'mdi-arrow-up' : 'mdi-arrow-down' }}</v-icon>
                    {{ ordersChange.pct }}% vs previous month
                  </div>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>

          <!-- Charts -->
          <v-row class="mt-6" dense>
            <v-col cols="12" md="6">
              <v-card outlined height="320">
                <v-card-title>Monthly Revenue</v-card-title>
                <v-card-text style="height:260px">
                  <Bar :data="revenueSeries" :options="revenueOptions" />
                </v-card-text>
              </v-card>
            </v-col>

            <v-col cols="12" md="6">
              <v-card outlined height="320">
                <v-card-title>Visitors Over Time</v-card-title>
                <v-card-text style="height:260px">
                  <Line :data="visitorsSeries" :options="visitorsOptions" />
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>

          <v-row class="mt-6" dense>
            <v-col cols="12">
              <v-card outlined>
                <v-card-title>Conversions Trend</v-card-title>
                <v-card-text style="height:260px">
                  <Line :data="conversionsSeries" :options="conversionsOptions" />
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.dashboard-header h1 {
  margin: 0;
  font-weight: 600;
}

.dashboard-header p {
  margin-top: 12px;
  color: rgba(255,255,255,0.7);
}

.text-success { color: #66bb6a }
.text-error { color: #ef5350 }
</style>
