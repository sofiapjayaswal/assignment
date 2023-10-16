import { useState, useEffect } from "react";
import Select from "react-select";
import { outputs, inputs } from '../constants';
import dataset from '../dataset.json';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  Tooltip,
  Legend,
  CategoryScale,
  BarController,
  BarElement,
} from 'chart.js';
ChartJS.register(Tooltip, Legend, CategoryScale, BarController, BarElement);

function Histo() {
  const [outputProperty, setOutputProperty] = useState("");
  const [userMin, setUserMin] = useState("");
  const [userMax, setUserMax] = useState("");
  const [propertyMin, setPropertyMin] = useState(null);
  const [propertyMax, setPropertyMax] = useState(null);
  const [allChecked, setAllChecked] = useState(false);
  const [checkedInputValues, setCheckedInputValues] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [minMaxError, setMinMaxError] = useState(false);
  
  useEffect(() => {
    let localMin = Infinity;
    let localMax = -Infinity;

    for (let experiment in dataset) {
      const outputValue = dataset[experiment]["outputs"][outputProperty];
      if (outputValue < localMin) {
        localMin = outputValue;
      }
      if (outputValue > localMax) {
        localMax = outputValue;
      }
    }
    setPropertyMin(localMin);
    setPropertyMax(localMax);
  }, [outputProperty]);

  useEffect(() => {
    if (outputProperty !== "" && userMin !== "" && userMax !== "" && checkedInputValues.length > 0) {
      let experimentsInRange = [];
      for (let experiment in dataset) {
        if (userMin < dataset[experiment]["outputs"][outputProperty] && dataset[experiment]["outputs"][outputProperty] < userMax) {
          experimentsInRange.push(dataset[experiment]);
        }
      }

      let averages = checkedInputValues.map((input) => {
        let totalSum = 0;
        for (let experiment of experimentsInRange) {
          totalSum += experiment["inputs"][input.value];
        }
        return totalSum / experimentsInRange.length;
      });
      setChartData(averages);
    }
  }, [outputProperty, checkedInputValues, userMin, userMax]);

  useEffect(() => {
    if (userMin !== "" && userMax !== "" && (userMin < propertyMin || userMax > propertyMax || isNaN(userMax) || isNaN(userMin))) {
      setMinMaxError(true)
    } else {
      setMinMaxError(false)
    }
  }, [userMin, userMax, propertyMax, propertyMin]);

  const onAllCheckedChange = () => {
    let checked = !allChecked;
    setAllChecked(!allChecked);
    checked ? setCheckedInputValues(inputs) : setCheckedInputValues([]);
  }

  const onInputSelectChange = (options) => {
    setCheckedInputValues(options);
    options.length === inputs.length ? setAllChecked(true) : setAllChecked(false);
  }

  // cha  
  const data = {
    labels: checkedInputValues.map((input) => input.label),
    datasets: [{
      label: 'Uncountable Dataset',
      data: chartData,
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
    }]
  };

  return (
    <div className="histo-screen">
      <p>First, select an output measurement that you want to examine.<br/>Then specify a range for that measurement.<br/>Lastly, choose the inputs that you want to see the average measurement of that produced the specified output range.</p>
      <Select options={outputs} onChange={(e) => setOutputProperty(e.value)} placeholder="Select Output" className = "histo-dropdown"/>
      {outputProperty !== "" ? <div>Set minimum and maximum values for the selected output, values should be between {propertyMin} and {propertyMax}.</div> : null}
      <div className="min-max-inputs">
        <input placeholder="Minimum" disabled={outputProperty === ""} value={userMin} onChange={(e) => setUserMin(e.target.value)} />
        <input placeholder="Maximum" disabled={outputProperty === ""} value={userMax} onChange={(e) => setUserMax(e.target.value)} />
      </div>
      {minMaxError ? <div>Error: ensure that entered minimum and maximum are within specified range!</div> : null}
      <Select
        isMulti
        isDisabled={outputProperty === ""}
        options={inputs}
        closeMenuOnSelect={false}
        onChange={(options) => onInputSelectChange(options)}
        value={checkedInputValues}
        placeholder="Select Inputs to Examine"
        className = "histo-dropdown"
      />
      <input
        onChange={onAllCheckedChange}
        type="checkbox"
        id="selectAll"
        value="selectAll"
        checked={allChecked}
        disabled={outputProperty === ""}
      />
      <label htmlFor="selectAll">Select all</label>

      {chartData.length > 0 ? <Bar data={data} /> : null}
    </div>
  );
}

export default Histo;