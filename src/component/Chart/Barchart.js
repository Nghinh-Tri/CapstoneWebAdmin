import React, { Component } from 'react';
import { Bar } from 'react-chartjs-2'

class Barchart extends Component {
    render() {
        var { dataStatisticList } = this.props
        const arrLabel = [];
        const arryDataset = [];
        if (dataStatisticList.length > 0) {
            dataStatisticList.map((dataItem, index) => {
                arrLabel.push(dataItem.name);
                arryDataset.push(dataItem.missingEmp)
            })
        }

        return (
            <div>
                <Bar
                    data={{
                        labels: arrLabel,
                        datasets: [{
                            label: 'Number of employee',
                            data: arryDataset,
                            backgroundColor: [                            
                                'rgb(255, 205, 86,0.2)',
                                'rgb(255, 205, 86,0.2)',
                                'rgb(255, 205, 86,0.2)',
                                'rgb(255, 205, 86,0.2)',
                                'rgb(255, 205, 86,0.2)',
                            ],
                            borderColor: [
                                'rgb(255, 205, 86)',
                                'rgb(255, 205, 86)',
                                'rgb(255, 205, 86)',
                                'rgb(255, 205, 86)',
                                'rgb(255, 205, 86)',
                            ],
                            borderWidth: 1
                        }]
                    }
                    }
                    options={{
                        scales: {
                            yAxes: [{
                                ticks: {
                                    beginAtZero: true,
                                    precision:0
                                }
                            }]
                        }
                    }}
                    height={400}
                    width={600} />
            </div>
        );
    }
}

export default Barchart;