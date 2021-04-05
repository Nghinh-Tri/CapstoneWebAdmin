import React, { Component } from 'react';
import { Pie, defaults } from 'react-chartjs-2'

class PineChart extends Component {


  render() {

    var { dataStatisticList } = this.props
    const arrLabel = [];
    const arryDataset = [];
    dataStatisticList.map((dataItem, index) => {
      arrLabel.push(dataItem.name);
      arryDataset.push(dataItem.nop)
    })


    return (
      <div>

        <Pie
          data={
            {
              labels: arrLabel,
              datasets: [
                {
                  label: 'NOE',
                  data: arryDataset,
                  backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                  ],
                  borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                  ],
                  borderWidth: 1,
                },
              ],
            }
          }
          height={400}
          width={400}
          options={{
            maintainAspectRatio: false,
            scales: {
              yAxes: [
                {
                  ticks: {
                    beginAtZero: true,
                  },
                },
              ],
            },
            legend: {
              labels: {
                fontSize: 25,
              },
            },
            tooltips: {
              mode: 'index',
              callbacks: {
                afterLabel: function (tooltipItem, data) {
                  var sum = data.datasets.reduce((sum, dataset) => {
                    return sum + dataset.data[tooltipItem.index];
                  }, 0);
                  var percent = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index] / sum * 100;
                  percent = percent.toFixed(2); // make a nice string
                  return data.datasets[tooltipItem.datasetIndex].label + ': ' + percent + '%';
                }
              }
            }
          }}
        />


      </div>
    );
  }
}



export default PineChart;
