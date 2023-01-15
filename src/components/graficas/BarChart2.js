import React, { useMemo } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const scores = [327.16, 126.19, 60.43, 49.64, 46.72];
const labels = ["Estados Unidos", "Mèxico", "Italia", "Colombia", "España"];

const options = {
  maintainAspectRatio: false,
  responsive: true
};

export default function BarChart2() {
  const data = useMemo(function () {
    return {
      datasets: [
        {
          label: "Habitantes",
          backgroundColor:'rgba(0,255,0,1)',
          borderColor: 'black',
          borderWith: 1,
          hoverBackgroundColor: 'rgba(0,120,100,1)',
          hoverBorderColor: '#FFFF00',
          data: scores
        },
      ],
      labels,
    };
  }, []);

  return (
    <div className="App">
      <Bar data={data} options={options} />
    </div>
  );
}