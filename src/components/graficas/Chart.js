import { Line } from "react-chartjs-2";

const Chart = ({ data, options, onUpdate }) => {
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
      <Line data={data} options={options} />
  );
};

export default Chart;