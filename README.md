# FastForward Logistics Dashboard

FastForward Logistics Dashboard is a Vue 3 + TypeScript single-page application built with Vite and Vuetify. It demonstrates a logistics-focused operations dashboard that visualizes monthly shipment trends, on-time delivery rates, regional performance, and open exceptions using Chart.js.

**Why this project is useful**

- Provides a ready-to-use dashboard template for logistics and supply-chain teams to monitor operational KPIs.
- Includes realistic sample data and interactive month filtering to tell an operational story (volume growth, improving on-time delivery, and exception trends).
- Serves as a starting point for customizing visualizations, adding data integrations (APIs, warehouses), and building alerts or drilldowns.

**Getting started**

1. Install dependencies:

```bash
npm install
```

2. Run the development server:

```bash
npm run dev
```

3. Build for production:

```bash
npm run build
```

4. Preview the production build locally:

```bash
npm run preview
```

Notes:
- The main application entry is `src/main.ts` and the dashboard view is in `src/views/HomeView.vue`.
- Sample metrics and logistics data are stored in `src/data/metrics.json` and are used to populate charts and summary cards.

**Where to get help**

- For issues with local setup (install/build/dev), check the output in your terminal and ensure Node.js (v16+) and npm are installed.
- Open an issue in this repository describing steps to reproduce, expected behavior, and observed behavior.
- For Vuetify/Vite/Chart.js specific questions, consult their official docs:
	- Vuetify: https://vuetifyjs.com
	- Vite: https://vitejs.dev
	- Chart.js: https://www.chartjs.org

**Maintainers & Contributions**

- Maintained by: Colin Robins (project owner/maintainer). Contact via repository issues.
- Contributions: PRs welcome. Please fork, branch from `main`, and open a PR with a clear description and any screenshots for UI changes.
- Suggested contribution areas: data integrations (APIs), additional charts, improved accessibility, tests, and CI build steps.

---

If you'd like, I can also:

- Add unit or integration tests,
- Hook the dashboard to a mock API for live-like data,
- Or commit these README changes and create a release note.
