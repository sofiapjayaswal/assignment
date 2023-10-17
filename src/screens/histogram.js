import { useState, useEffect } from "react";
import Select from "react-select";
import { outputs, inputs, dropdownStyles } from '../constants';
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
  const [userMin, setUserMin] = useState(""); // min set by user
  const [userMax, setUserMax] = useState(""); // max set by user
  const [propertyMin, setPropertyMin] = useState(null); // min of the chosen output
  const [propertyMax, setPropertyMax] = useState(null); // max of the chosen output
  const [allChecked, setAllChecked] = useState(false); // if all inputs are checked
  const [checkedInputValues, setCheckedInputValues] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [minMaxError, setMinMaxError] = useState(false);
  
  // find min and max of output chosen by user
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

  // when user has inputted all required sections and there is no error with the min and max specify, get chart data
  useEffect(() => {
    if (!minMaxError && outputProperty !== "" && userMin !== "" && userMax !== "" && checkedInputValues.length > 0) {
      let experimentsInRange = [];
      for (let experiment in dataset) {
        if (userMin < dataset[experiment]["outputs"][outputProperty] && dataset[experiment]["outputs"][outputProperty] < userMax) {
          experimentsInRange.push(dataset[experiment]);
        }
      }

      // find average for each specified input
      let averages = checkedInputValues.map((input) => {
        let totalSum = 0;
        for (let experiment of experimentsInRange) {
          totalSum += experiment["inputs"][input.value];
        }
        return totalSum / experimentsInRange.length;
      });
      setChartData(averages);
    }
  }, [outputProperty, checkedInputValues, userMin, userMax, minMaxError]);

  // check whether there the inputted min and max are within the output measurement range
  useEffect(() => {
    if ((userMin !== "" || userMax !== "") && (userMin < propertyMin || userMax > propertyMax || isNaN(userMax) || isNaN(userMin))) {
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
  
  // configuration for chart
  const data = {
    labels: checkedInputValues.map((input) => input.label),
    datasets: [{
      data: chartData,
      backgroundColor: '#8D86C9',
    }]
  };

  const chartOptions = {
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        title: {
          display: true,
          text: "Average Input Measurement",
        },
      },
    },
  };

  return (
    <div className="histo-screen">
      <h3>Instructions</h3>
      <ol className="instructions-list">
        <li>Select an output measurement that you want to examine.</li>
        <li>Specify a range for that measurement.</li>
        <li>Choose the inputs that you want to see the average measurement that produced the specified output range.</li>
      </ol>
      <h4>Output:</h4>
      <Select 
        options={outputs} 
        onChange={(e) => setOutputProperty(e.value)} 
        placeholder="Select Output" 
        className = "histo-dropdown"
        styles={dropdownStyles}
      />
      
      {outputProperty !== "" ? <div>Set minimum and maximum values for the selected output, values should be between {propertyMin} and {propertyMax}.</div> : null}
      
      <div className="min-max-inputs">
        <div>
          <label htmlFor="min"><h4>Minimum output measurement:</h4></label>
          <input id="min" placeholder="Minimum" disabled={outputProperty === ""} value={userMin} onChange={(e) => setUserMin(e.target.value)} />
        </div>
        <div>
          <label htmlFor="max"><h4>Maximum output measurement:</h4></label>
          <input id="max" placeholder="Maximum" disabled={outputProperty === ""} value={userMax} onChange={(e) => setUserMax(e.target.value)} />
        </div>
      </div>
      
      {minMaxError ? <div className="error-message">Error: ensure that entered minimum and maximum are within specified range!</div> : null}
      
      <h4>Inputs:</h4>
      <Select
        isMulti
        isDisabled={outputProperty === ""}
        options={inputs}
        closeMenuOnSelect={false}
        onChange={(options) => onInputSelectChange(options)}
        value={checkedInputValues}
        placeholder="Select Inputs to Examine"
        styles={dropdownStyles}
        className = "histo-dropdown"
      />
      
      <div className="select-all-container">
        <label htmlFor="select-all">View Averages for All Inputs</label>
        <input
          onChange={onAllCheckedChange}
          type="checkbox"
          id="select-all"
          value="select-all"
          checked={allChecked}
          disabled={outputProperty === ""}
        />
      </div>
      {chartData.length > 0 ? <Bar data={data} options={chartOptions} /> : null}
    </div>
  );
}

export default Histo;