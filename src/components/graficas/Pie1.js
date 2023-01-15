import React, { useMemo } from "react";
import {
  Chart as ChartJS,
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  BarController,
  BubbleController,
  DoughnutController,
  LineController,
  PieController,
  PolarAreaController,
  RadarController,
  ScatterController,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  RadialLinearScale,
  TimeScale,
  TimeSeriesScale,
  Decimation,
  Filler,
  Legend,
  Title,
  Tooltip,
  SubTitle
} from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(
    ArcElement,
    LineElement,
    BarElement,
    PointElement,
    BarController,
    BubbleController,
    DoughnutController,
    LineController,
    PieController,
    PolarAreaController,
    RadarController,
    ScatterController,
    CategoryScale,
    LinearScale,
    LogarithmicScale,
    RadialLinearScale,
    TimeScale,
    TimeSeriesScale,
    Decimation,
    Filler,
    Legend,
    Title,
    Tooltip,
    SubTitle
);

//const scores = [74.56, 10.54, 9.42, 5.42];
//const labels = ["Google", "Bing", "Baidu", "Otros"];

const options = {
  responsive: true
};

export default function Pie1(scores,labels,nombre) {
  console.log("inPie1 Scores: ", scores)
  console.log("inPie1 Labels: ", labels)
  console.log("inPie1 Nombre: ", nombre)
  const data = useMemo(function () {
    return {
      datasets: [
        {
          label: nombre,
          //backgroundColor:['#FF0000', 'blue', 'green', '#FFFF00'],
          //backgroundColor:['red', 'blue', 'green', 'yellow'],
          backgroundColor:['blue', 'green','yellow','black','red','brown'],
          data: scores
        },
      ],
      labels,
    };
  }, []);
  console.log("inPie1 Data: ",data)

  return (
      <Pie data={data} options={options} />
  );
}