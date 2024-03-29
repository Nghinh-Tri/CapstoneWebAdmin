import React, { Component } from 'react';
import { Pie } from 'react-chartjs-2'
import { connect } from 'react-redux';
import { checkSession } from '../../service/action/user/AuthenticateAction';
import { fetchSkillInPosition } from '../../service/action/statistic/StatisticAction';

class PineChart extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrLabel: [],
            arryDataset: []
        }
    }

    render() {
        var arrLabel = [], arryDataset = []
        if (this.props.item.length > 0) {
            this.props.item.forEach(element => {
                arrLabel.push(element.hardSkill);
                arryDataset.push(element.numberInRequire)
            });
        }
        return (
            <div>
                <Pie data={{
                    labels: arrLabel, datasets: [
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
                                'rgba(126, 168, 141,0.2)'
                            ],
                            borderColor: [
                                'rgba(255, 99, 132, 1)',
                                'rgba(54, 162, 235, 1)',
                                'rgba(255, 206, 86, 1)',
                                'rgba(75, 192, 192, 1)',
                                'rgba(153, 102, 255, 1)',
                                'rgba(255, 159, 64, 1)',
                                'rgba(126, 168, 141,0.2)'
                            ],
                            borderWidth: 1,
                        },
                    ],
                }
                }
                />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        skillInPosition: state.SkillInPosition
    }
}

const mapDispatchToProp = (dispatch, props) => {
    return {
        checkSession: () => {
            dispatch(checkSession())
        },
        fetchSkillInPosition: posID => {
            dispatch(fetchSkillInPosition(posID))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProp)(PineChart);
