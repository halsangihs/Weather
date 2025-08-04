import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";


ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const TemperatureChart = ({ hourlyData }) => {
  console.log("Graph Data Received:", hourlyData);

  if (!hourlyData || hourlyData.length === 0) {
    return <p className="text-gray-500 text-center mt-4">No sufficient data for the graph.</p>;
  }

  const labels = hourlyData.map((entry) =>
    new Date(entry.dt_txt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  );
  const temps = hourlyData.map((entry) => entry.main.temp);

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Temperature (°C)",
        data: temps,
        fill: false,
        backgroundColor: "rgba(75,192,192,1)",
        borderColor: "#4BC0C0",
      },
    ],
  };

  return (
    <div className="bg-white p-6 mt-4 shadow-md rounded-md w-full max-w-3xl">
      <h2 className="text-xl font-bold text-center mb-4">Hourly Temperature</h2>
      <Line data={data} />
    </div>
  );
};

export default TemperatureChart;
