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
  SubTitle,
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
    SubTitle,
);

const Pie3 = ({ data, options, onUpdate }) => {
    // const dataIn = data[0]; COMMENTED OUT
    // const optionsIn = options[0]; COMMENTED OUT
    // REMOVED onClick function
    /*
    return (
      <>
        <div className="header">
          <h1 className="title">Plot</h1>
          <div className="links">
            <a className="btn btn-gh" onClick={onUpdate}>
              Update plot
            </a>
          </div>
        </div>
        <Line data={data} options={options} />
      </>
    );
    */
    return (
        <Pie data={data} options={options} />
    );
  };
  
  export default Pie3;