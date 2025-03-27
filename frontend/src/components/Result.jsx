import React from "react";
import { Chart } from "react-google-charts";

const data = [
  ["Candidate", "no of votes"],
  ["c1", 1000],
  ["c2", 1170],
  ["c3", 660],
  ["c4", 1030],
];

const options = {
  title: "Election Result",
  chartArea: { width: "50%" },
  hAxis: { title: "Candidate", minValue: 0 },
  vAxis: { title: "Total" },
};

const Result = () => {
  return  <div className="flex flex-col justify-center items-center p-4 gap-4 "> <div className="text-2xl">Election Result page</div>
  <Chart chartType="ColumnChart" width="600px" height="400px" data={data} options={options} /> </div>
};

export default Result;
