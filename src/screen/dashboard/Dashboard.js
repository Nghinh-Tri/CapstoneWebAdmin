import React, { Component } from 'react';
import PineChart from '../../component/Chart/PineChart'
import RadarChart from '../../component/Chart/radarChart'
import BarChart from '../../component/Chart/Barchart'
import Donut from '../../component/Chart/donut'

import { checkSession } from '../../service/action/AuthenticateAction';
import { connect } from 'react-redux';
import { fetchDataStatistics } from "../../service/action/StatisticAction";
import ChartStatus from '../../component/Chart/ChartStatus';


class Dashboard extends Component {



    componentDidMount = () => {
        this.props.checkSession()
        this.props.fetchDataStatistics()
    }


    onShowPieList = (dataStatisticList) => {
        var result = null
        if (typeof dataStatisticList !== 'undefined') {
            return (
                <PineChart dataStatisticList={dataStatisticList} />
            )
        }
        return result
    }

    onShowRadarList = (dataStatisticList) => {
        var result = null
        if (typeof dataStatisticList !== 'undefined') {
            return (
                <RadarChart dataStatisticList={dataStatisticList} />
            )
        }
        return result
    }

    // onShowDonutList = (dataStatisticList) => {
    //     var result = null
    //     if (typeof dataStatisticList !== 'undefined') {
    //         return (
    //             <Donut dataStatisticList={dataStatisticList} />
    //         )
    //     }
    //     return result
    // }


    onShowStatusList = (dataStatisticList) => {
        var result = null
        if (typeof dataStatisticList !== 'undefined') {
            return (
                <ChartStatus dataStatisticList={dataStatisticList} />
            )
        }
        return result
    }

    onShowBarList = (dataStatisticList) => {
        var result = null
        if (typeof dataStatisticList !== 'undefined') {
            return (
                <BarChart dataStatisticList={dataStatisticList} />
            )
        }
        return result
    }



    render() {
        var { dataStatistics } = this.props
        // console.log(dataStatistics)
        return (
            <React.Fragment>
                <ol class="breadcrumb mb-4 mt-3">
                    <li class="breadcrumb-item active">Dashboard</li>
                </ol>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="card card-chart">
                                <div>
                                    <div className="ct-chart">
                                        {this.onShowPieList(dataStatistics.projectByTypes)}
                                    </div>
                                </div>
                                <div className="card-body">
                                    <h4 className="card-title">Type of project</h4>
                                </div>
                            </div>
                        </div>


                        <div className="col-md-6">
                            <div className="card card-chart">
                                <div >
                                    <div className="ct-chart" />
                                    {this.onShowRadarList(dataStatistics.employeeByProjects)}
                                </div>
                                <div className="card-body">
                                    <h4 className="card-title">Employee in project</h4>
                                </div>
                            </div>
                        </div>



                        <div className="col-md-6">
                            <div className="card card-chart">
                                <div>
                                    <div className="ct-chart" />
                                    {this.onShowBarList(dataStatistics.employeeByHardSkills)}
                                </div>
                                <div className="card-body">
                                    <h4 className="card-title">Hard skill of employee in application</h4>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="card card-chart">
                                <div>
                                    <div className="ct-chart" />
                                    {this.onShowStatusList(dataStatistics.projectByStatuses)}
                                </div>
                                <div className="card-body">
                                    <h4 className="card-title">Status of project</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment >

        );
    }
}
const mapStateToProps = (state) => {
    return {
        dataStatistics: state.DataStatisticsReducer
    }
}

const mapDispatchToProp = (dispatch, props) => {
    return {
        checkSession: () => {
            dispatch(checkSession())
        },
        fetchDataStatistics: () => {
            dispatch(fetchDataStatistics())
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProp)(Dashboard);
