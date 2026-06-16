# FastForward Logistics Dashboard - Projected Brief

## What is this?
A single-page analytics dashboard showing monthly business metrics. Think shopify admin or a simple google analytics view.

## Data
Generate a fake dataset as a JSON file (src/data/metrics.json).
12 months of data (Jan-Dec 2025) each month contaning:
- revenue (dollar amount, trending upwared with some variation)
- visitors (number, season pattern - higher in summer)
- conversions (percentage, fluctuated between 205%)
- orders (numbers, correlates loosely with )

##Layout (vuetify)
- v-app-bar at teh top with dashboard title and a month picker
- the month picker should defaulte to showing all months
- when a specific momnth is selected, all cards and charts filter to that month. When :all" is selected, show the full year.
- Below the app bar: a row of 4 summary cards (v-cards) showing the key metrics - revenue, visitors, conversions, orders
- Below the cards: a row of 2 charts
    - left: bar chart showing monthly revenue
    - right: line chart showing visitors over time
- below that: one full-width area chart showing conversions trend
- use v-container, v-row, v-col for responsive grid layout

## Interactions
- month picker in the app bar filters everything - summary cards show that month's numbers, charts highlight or filter to that month
- when all is selected, summary cards show yearly totals/averages and charts show all 12 months
- cards should show a small up./down arrow or color indicating chnage from previous moth

## Style
- dark theme by default (vuetify dark theme)
- clean, minimal, lots of whitespace
- charts should use a cohesive color palette, not a rainbow
- mobile responsive - cards stack on small screens

## Tech
- vue 3 + typescript + vuetify 3
- chart.js via vue-chartjs for all charts
- fake data from a local json file (no api calls)
- single page 0 no routing needed for this app