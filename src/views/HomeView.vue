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

const yearStartMonth = 'Jun 2025'
const yearLogistics = logistics.slice(logistics.findIndex((l: any) => l.month === yearStartMonth))

const shipmentVolumeSeries = computed(() => ({
  labels: yearLogistics.map((m: any) => m.month),
  datasets: [
    {
      label: 'Shipment Volume',
      borderColor: '#5c6bc0',
      backgroundColor: 'rgba(92,107,192,0.18)',
      data: yearLogistics.map((m: any) => m.shipments),
      fill: true,
      tension: 0.35,
    },
  ],
})) as unknown as ChartData<'line', number[], string>

const onTimeDeliverySeries = computed(() => ({
  labels: yearLogistics.map((m: any) => m.month),
  datasets: [
    {
      label: 'On-time Delivery',
      borderColor: '#26a69a',
      backgroundColor: 'rgba(38,166,154,0.18)',
      data: yearLogistics.map((m: any) => Math.round(m.onTime * 1000) / 10),
      fill: false,
      tension: 0.35,
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

function handleChartClick(evt: any, elements: any, series: any) {
  try {
    if (!elements || !elements.length) return
    const el = elements[0]
    const idx = el.index
    const month = (series.value.labels as any)[idx]
    if (!month) return
    selectedMonth.value = selectedMonth.value === month ? 'All' : month
  } catch (e) {
    // ignore
  }
}

const shipmentOptions: any = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    tooltip: {
      callbacks: {
        label(context: any) {
          const v = context.parsed && context.parsed.y != null ? context.parsed.y : context.raw
          return `${v.toLocaleString()} shipments`
        },
      },
    },
  },
  onClick(evt: any, elements: any) {
    handleChartClick(evt, elements, shipmentVolumeSeries)
  },
  onHover(evt: any, elements: any) {
    try {
      const target = evt?.native?.target || evt?.target
      if (target) target.style.cursor = elements && elements.length ? 'pointer' : 'default'
    } catch (e) {}
  },
}

const onTimeOptions: any = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    tooltip: {
      callbacks: {
        label(context: any) {
          const v = context.parsed && context.parsed.y != null ? context.parsed.y : context.raw
          return `${v.toFixed(1)}% on-time`
        },
      },
    },
  },
  scales: { y: { ticks: { callback: (v: any) => `${v}%` } } },
  onClick(evt: any, elements: any) {
    handleChartClick(evt: any, elements: any, onTimeDeliverySeries)
  },
  onHover(evt: any, elements: any) {
    try {
      const target = evt?.native?.target || evt?.target
      if (target) target.style.cursor = elements && elements.length ? 'pointer' : 'default'
    } catch (e) {}
  },
}

const conversionsOptions: any = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    tooltip: {
      callbacks: {
        label(context: any) {
          const v = context.parsed && context.parsed.y != null ? context.parsed.y : context.raw
          return v + '%'
        },
      },
    },
  },
  scales: { y: { ticks: { callback: (v: any) => v + '%' } } },
  onClick(evt: any, elements: any) {
    handleChartClick(evt, elements, conversionsSeries)
  },
  onHover(evt: any, elements: any) {
    try {
      const target = evt?.native?.target || evt?.target
      if (target) target.style.cursor = elements && elements.length ? 'pointer' : 'default'
    } catch (e) {}
  },
}

function formatMoney(n: number) {
  return n.toLocaleString(undefined, { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })
}

// Logistics-specific synthetic monthly data (realistic-looking, tells a story)
const logistics = [
  { month: 'Jan 2025', shipments: 18000, onTime: 0.88, openExceptions: 420, regions: { 'North America': 0.43, EMEA: 0.28, APAC: 0.22, LATAM: 0.07 } },
  { month: 'Feb 2025', shipments: 18500, onTime: 0.89, openExceptions: 390, regions: { 'North America': 0.42, EMEA: 0.29, APAC: 0.22, LATAM: 0.07 } },
  { month: 'Mar 2025', shipments: 19500, onTime: 0.90, openExceptions: 360, regions: { 'North America': 0.41, EMEA: 0.30, APAC: 0.23, LATAM: 0.06 } },
  { month: 'Apr 2025', shipments: 20500, onTime: 0.915, openExceptions: 300, regions: { 'North America': 0.41, EMEA: 0.30, APAC: 0.24, LATAM: 0.05 } },
  { month: 'May 2025', shipments: 22000, onTime: 0.92, openExceptions: 260, regions: { 'North America': 0.40, EMEA: 0.30, APAC: 0.25, LATAM: 0.05 } },
  { month: 'Jun 2025', shipments: 24000, onTime: 0.935, openExceptions: 220, regions: { 'North America': 0.40, EMEA: 0.29, APAC: 0.26, LATAM: 0.05 } },
  { month: 'Jul 2025', shipments: 26000, onTime: 0.94, openExceptions: 200, regions: { 'North America': 0.41, EMEA: 0.28, APAC: 0.26, LATAM: 0.05 } },
  { month: 'Aug 2025', shipments: 28000, onTime: 0.945, openExceptions: 180, regions: { 'North America': 0.42, EMEA: 0.28, APAC: 0.25, LATAM: 0.05 } },
  { month: 'Sep 2025', shipments: 27000, onTime: 0.905, openExceptions: 320, regions: { 'North America': 0.40, EMEA: 0.30, APAC: 0.24, LATAM: 0.06 } },
  { month: 'Oct 2025', shipments: 25000, onTime: 0.92, openExceptions: 240, regions: { 'North America': 0.41, EMEA: 0.29, APAC: 0.25, LATAM: 0.05 } },
  { month: 'Nov 2025', shipments: 24000, onTime: 0.93, openExceptions: 200, regions: { 'North America': 0.42, EMEA: 0.29, APAC: 0.24, LATAM: 0.05 } },
  { month: 'Dec 2025', shipments: 33000, onTime: 0.94, openExceptions: 180, regions: { 'North America': 0.44, EMEA: 0.27, APAC: 0.24, LATAM: 0.05 } },
]

const yearStartMonth = 'Jun 2025'
const yearLogistics = logistics.slice(logistics.findIndex((l: any) => l.month === yearStartMonth))

const logisticsMonths = logistics.map((l: any) => l.month)

const logisticsByMonth = (m: string) => logistics.find((l: any) => l.month === m)

const logisticsSelected = computed(() => {
  if (!selectedMonth || selectedMonth.value === 'All') return logistics[logistics.length - 1]
  return logisticsByMonth(selectedMonth.value) || logistics[logistics.length - 1]
})

function formatNumber(n: number) { return n.toLocaleString() }

const logisticsChange = (key: 'shipments' | 'onTime' | 'openExceptions') => {
  const idx = logistics.findIndex((l: any) => l.month === logisticsSelected.value.month)
  if (idx <= 0) return { diff: 0, pct: 0, up: true }
  const cur = (logistics as any)[idx][key]
  const prev = (logistics as any)[idx - 1][key]
  const diff = cur - prev
  const pct = prev ? Math.round((diff / prev) * 100) : 0
  return { diff, pct, up: diff >= 0 }
}

const regionsSorted = computed(() => {
  const r = logisticsSelected.value?.regions || {}
  return Object.entries(r).map(([k, v]) => ({ region: k, pct: Math.round((v as number) * 100) })).sort((a: any, b: any) => b.pct - a.pct)
})



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
        <v-sheet class="pa-6 compact-sheet" elevation="3">
          <div class="dashboard-header">
            <h1>FastForward Logistics Dashboard</h1>
            <p class="subtitle-1">Monthly business metrics — select a month to filter.</p>
          </div>

          <!-- Logistics summary cards -->
          <v-row class="mt-6" dense>
            <v-col cols="12" sm="6" md="3">
              <v-card class="summary-card">
                <v-card-title>Shipment Volume</v-card-title>
                <v-card-text>
                  <div class="text-h5">{{ formatNumber(logisticsSelected.shipments) }} shipments</div>
                  <div class="caption" :class="logisticsChange('shipments').up ? 'text-success' : 'text-error'">
                    <v-icon small>{{ logisticsChange('shipments').up ? 'mdi-arrow-up' : 'mdi-arrow-down' }}</v-icon>
                    {{ logisticsChange('shipments').pct }}% vs previous month
                  </div>
                </v-card-text>
              </v-card>
            </v-col>

            <v-col cols="12" sm="6" md="3">
              <v-card class="summary-card">
                <v-card-title>On-time Delivery</v-card-title>
                <v-card-text>
                  <div class="text-h5">{{ (logisticsSelected.onTime * 100).toFixed(1) }}%</div>
                  <div class="caption" :class="logisticsChange('onTime').up ? 'text-success' : 'text-error'">
                    <v-icon small>{{ logisticsChange('onTime').up ? 'mdi-arrow-up' : 'mdi-arrow-down' }}</v-icon>
                    {{ logisticsChange('onTime').pct }}% vs previous month
                  </div>
                </v-card-text>
              </v-card>
            </v-col>

            <v-col cols="12" sm="6" md="3">
              <v-card class="summary-card">
                <v-card-title>Regional Performance</v-card-title>
                <v-card-text>
                  <div class="text-subtitle-2">Top region: {{ regionsSorted[0].region }} — {{ regionsSorted[0].pct }}%</div>
                  <div class="caption" style="margin-top:8px">Breakdown</div>
                  <div style="display:flex; gap:12px; margin-top:8px">
                    <div v-for="r in regionsSorted" :key="r.region" style="min-width:72px">
                      <div class="caption">{{ r.region }}</div>
                      <div class="text-h6">{{ r.pct }}%</div>
                    </div>
                  </div>
                </v-card-text>
              </v-card>
            </v-col>

            <v-col cols="12" sm="6" md="3">
              <v-card class="summary-card">
                <v-card-title>Open Exceptions</v-card-title>
                <v-card-text>
                  <div class="text-h5">{{ formatNumber(logisticsSelected.openExceptions) }}</div>
                  <div class="caption" :class="logisticsChange('openExceptions').up ? 'text-error' : 'text-success'">
                    <v-icon small>{{ logisticsChange('openExceptions').up ? 'mdi-alert' : 'mdi-check' }}</v-icon>
                    {{ logisticsChange('openExceptions').pct }}% vs previous month
                  </div>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>

          <!-- Charts -->
          <v-row class="mt-6" dense>
            <v-col cols="12" md="6">
              <v-card outlined height="320">
                <v-card-title>Shipment Volume</v-card-title>
                <v-card-text style="height:260px">
                  <Line :data="shipmentVolumeSeries" :options="shipmentOptions" />
                </v-card-text>
              </v-card>
            </v-col>

            <v-col cols="12" md="6">
              <v-card outlined height="320">
                <v-card-title>On-time Delivery</v-card-title>
                <v-card-text style="height:260px">
                  <Line :data="onTimeDeliverySeries" :options="onTimeOptions" />
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

.summary-card {
  border: 1px solid rgba(255,255,255,0.06);
  border-radius: 10px;
  box-shadow: none;
}

.summary-card .v-card__title {
  font-weight: 600;
}

/* compact sheet adjustments for small screens */
@media (max-width: 600px) {
  .compact-sheet { padding: 16px !important }
  .summary-card { padding: 12px }
  .v-card__title { font-size: 14px }
  .text-h5 { font-size: 18px }
  .month-select { max-width: 140px !important }
  .hide-on-mobile { display: inline-flex }
  .show-on-mobile { display: inline-flex }
}

@media (max-width: 400px) {
  .hide-on-mobile { display: none }
  .show-on-mobile { display: inline-flex }
}
</style>
