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
  ArcElement,
  DoughnutController,
  PieController,
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
  ArcElement,
  DoughnutController,
  PieController,
)

export default ChartJS
