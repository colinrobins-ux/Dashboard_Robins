import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Filler,
  BarElement,
  BarController,
  LineController,
} from 'chart.js'

// Register all chart elements we'll use across components
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Filler,
  BarElement,
  BarController,
  LineController,
)

export default ChartJS
