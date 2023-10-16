import Select from 'react-select';
import { useEffect, useState } from 'react';
import dataset from '../dataset.json'
import { Scatter } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { outputs, inputs } from '../constants'
ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend);


function ScatterScreen() {
  const [inputProperty, setInputProperty] = useState("")
  const [outputProperty, setOutputProperty] = useState("")
  const [data, setData] = useState([])

  useEffect(() => {
    if (inputProperty !== "" && outputProperty !== "") {
      let tempData = []
      for (let experiment in dataset) {
        tempData.push({x: dataset[experiment]["inputs"][inputProperty], y: dataset[experiment]["outputs"][outputProperty]})
      }
      setData(tempData)
      console.log('temp', tempData)
    }
  }, [inputProperty, outputProperty])

  const chartConfig = {
    datasets: [
      {
        label: 'Uncountable dataset',
        data: data,
        backgroundColor: 'rgba(255, 99, 132, 1)',
      },
    ],
  };
  return (
    <div className="scatter-screen">
      <div>Select the input and output below that you would like to compare on a scatterplot.</div>
      <div className='scatter-dropdowns'> 
        <Select options={inputs} onChange={(e) => setInputProperty(e.value)} placeholder="Select Input to Examine"/>
        <Select options={outputs} onChange={(e) => setOutputProperty(e.value)} placeholder="Select Output to Examine"/>
      </div>
      {data.length > 0 ? <Scatter className="scatter-chart" data={chartConfig} /> : null}
    </div>
  );


}

export default ScatterScreen;
