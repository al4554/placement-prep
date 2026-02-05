import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import PageWrapper from "../components/PageWrapper";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export default function Analytics() {
  const { token } = useAuth();
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/analytics/topics", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then(setData);
  }, [token]);

  const chartData = {
    labels: data.map((d) => d._id),
    datasets: [
      {
        label: "Total Solved",
        data: data.map((d) => d.total),
        backgroundColor: "#3b82f6",
        borderRadius: 4,
      },
    ],
  };

  const chartOptions = {
    plugins: {
      legend: {
        labels: {
          color: "white", // dark mode legend text fix
        },
      },
    },
    scales: {
      x: {
        ticks: { color: "white" }, // axis label fix
      },
      y: {
        ticks: { color: "white" },
      },
    },
  };

  return (
    <PageWrapper>
      <div className="p-10">
        <h1 className="text-3xl font-bold mb-6 dark:text-white">
          📊 Topic Analytics
        </h1>

        {/* BAR CHART */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow mb-10">
          <Bar data={chartData} options={chartOptions} />
        </div>

        {/* TOPIC CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {data.map((topic) => (
            <div
              key={topic._id}
              className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow"
            >
              <h3 className="font-semibold mb-2 dark:text-white">
                {topic._id}
              </h3>

              {topic.difficultySplit.map((d) => (
                <p
                  key={d.difficulty}
                  className="text-sm text-gray-700 dark:text-gray-300"
                >
                  {d.difficulty}: {d.count}
                </p>
              ))}
            </div>
          ))}
        </div>
      </div>
    </PageWrapper>
  );
}
