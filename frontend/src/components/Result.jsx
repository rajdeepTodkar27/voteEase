import React, { useState,useEffect } from "react";
import { useForm } from "react-hook-form";
import { Chart } from "react-google-charts";
import axios from "axios";


const options = {
  title: "Election Result",
  chartArea: { width: "50%" },
  hAxis: { title: "Candidate", minValue: 0 },
  vAxis: { title: "Total Votes" },
};

const Result = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const [chartData, setChartData] = useState([]);
  const selectedElection = watch("election");
  const [resultlist, setresultlist] = useState({})
  const [electionInchart, setelectionInchart] = useState("")

  useEffect(() => {
    axios.get("http://localhost:4000/user/checkresult", {headers:{Authorization: `Bearer ${sessionStorage.getItem("token")}`}})
    .then(res=>{
      setresultlist(res.data.data)
    })
    .catch(err=>console.log(err))
  }, [ ])


  const fetchElectionResults = (data) => {
    let electionname=data.election
    let newResults = [["Candidate", "No of Votes"]];

    setelectionInchart(electionname)
    resultlist[electionname].forEach(element => {
        newResults.push([element.candidatename, element.totalvotes]);
    });
   
    setChartData(newResults || []);
    
    
  };
  
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-100">
  <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-lg">
    <h2 className="text-3xl font-semibold mb-6 text-center text-gray-800">
       Election Results
    </h2>

    <form
      onSubmit={handleSubmit(fetchElectionResults)}
      className="flex flex-col gap-4"
    >
      <select
        {...register("election", { required: "Please select an election" })}
        className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value=""> Select an Election</option>
        {Object.keys(resultlist).map((key) => (
          <option key={key} value={key}>{key}</option>
        ))}
      </select>
      {errors.election && <p className="text-red-500">{errors.election.message}</p>}

      <button
        type="submit"
        className={`w-full px-4 py-3 rounded-lg text-white font-semibold transition ${
          selectedElection ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-400 cursor-not-allowed"
        }`}
        disabled={!selectedElection}
      >
         Fetch Results
      </button>
    </form>
  </div>

  {electionInchart && (
    <div className="text-lg font-medium mt-6 bg-white shadow-md px-6 py-3 rounded-md">
      {electionInchart} Elections
    </div>
  )}

  <div className="w-full max-w-4xl flex justify-center mt-8 p-4">
    {chartData.length > 0 ? (
      <Chart
        chartType="ColumnChart"
        width="100%"
        height="400px"
        data={chartData}
        options={options}
      />
    ) : (
      <p className="text-gray-600 text-lg mt-4 text-center">
        {selectedElection
          ? "Click 'Fetch Results' to load data."
          : " Select an election to see results."}
      </p>
    )}
  </div>
</div>

  );
};

export default Result;
