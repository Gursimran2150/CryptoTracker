import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);







 const Chart= (arr)=> {
    const mainArr = arr.arr;
    let labels = [];
    let dataaa=[];

    for(let i=0;i<mainArr.length;i++)
    {
       if(arr.days==='24h') labels.push(new Date(mainArr[i][0]).toLocaleTimeString());
       else labels.push(new Date(mainArr[i][0]).toLocaleDateString());
        dataaa.push(mainArr[i][1]);
    }
    //console.log(labels);
    
   

  return <Line options={
    {responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: false,
            
          },
        },}
  } 
  data={{
    labels,
  datasets: [
    {
      label: `Value in ${arr.currency}`,
      data: dataaa,
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
   
  ],
  }} />;
}

export default Chart
