import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

export default function ProgressGraph({ data }) {
  const chartData = {
    labels: data.map(d => d.date),
    datasets: [
      {
        label: "Questions Solved",
        data: data.map(d => d.solvedCount),
        borderColor: "#16a34a",
        tension: 0.3
      }
    ]
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow mt-10">
      <h2 className="font-semibold mb-4">Progress Graph</h2>
      <Line data={chartData} />
    </div>
  );
}
