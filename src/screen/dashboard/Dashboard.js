import React, { Component } from 'react';
import PineChart from '../../component/Chart/PineChart'
import BarChart from '../../component/Chart/Barchart'
import { checkSession } from '../../service/action/user/AuthenticateAction';
import { connect } from 'react-redux';
import { fetchDataStatistics, fetchMissingEmpPosition, fetchSkillInPosition } from "../../service/action/statistic/StatisticAction";
import { fetchPostionList } from '../../service/action/position/PositionAction';
import SelectBar from "../../component/create-position-form/select-search/SelectBar";
import { Spin } from 'antd';
import { convertPositionList } from '../../service/util/util';

class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            posID: 0,
            isLoading: true,
            positionList: []
        }
    }


    componentDidMount = () => {
        this.props.checkSession()
        this.props.fetchMissingEmpPos()
        this.props.fetchPositionList()
        this.props.fetchSkillInPosition()
    }

    componentDidUpdate = (prevProp) => {
        if (prevProp.skillInPosition !== this.props.skillInPosition) {
            var posID = this.state.posID
            if (this.props.skillInPosition.length > 0) {
                posID = this.props.skillInPosition[0].posID
            }
            this.setState({ isLoading: false, posID: posID })
        }
    }

    //get
    onShowBarList = (dataStatisticList) => {
        var result = null
        if (typeof dataStatisticList !== 'undefined') {
            return (
                <BarChart dataStatisticList={dataStatisticList} />
            )
        }
        return result
    }

    getIndexByPosID = () => {
        var { skillInPosition } = this.props
        var result = -1
        for (let index = 0; index < skillInPosition.length; index++) {
            if (skillInPosition[index].posID === this.state.posID)
                result = index
        }
        return result
    }

    onShowPieList = () => {
        var index = this.getIndexByPosID()
        var { skillInPosition } = this.props
        if (index !== -1) {
            if (typeof skillInPosition[index].skillInPos !== 'undefined') {
                return (<PineChart item={skillInPosition[index].skillInPos} />)
            }
        }
    }

    onSelectPos = (posID) => {
        this.setState({ posID: posID })
    }

    render() {
        var { dataStatistics, positionList, skillInPosition } = this.props
        var pos = []
        positionList.forEach(e => {
            skillInPosition.forEach(e1 => {
                if (e.posID === e1.posID) {
                    pos.push(e)
                }
            });
        });
        var positionListConverted = convertPositionList(pos)
        return (
            <React.Fragment>
                <ol class="breadcrumb mb-4 mt-3">
                    <li class="breadcrumb-item active">Dashboard</li>
                </ol>
                {this.state.isLoading ?
                    <div className="row justify-content-center">
                        <Spin className="text-center" size="large" />
                    </div>
                    :
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-6">
                                <div className="card card-chart">
                                    <div>
                                        <div className="ct-chart" />
                                        {this.onShowBarList(dataStatistics)}
                                    </div>
                                    <div className="card-body">
                                        <h4 className="card-title">Positions in need of staffs</h4>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-6">
                                {positionListConverted.length === 0 ?
                                    <div className="row justify-content-center">
                                        <Spin className="text-center" size="large" />
                                    </div>
                                    :
                                    <>
                                        <div className="card card-chart">
                                            <div className='row mb-4 mt-4 ml-5' >
                                                <div className='col-auto mt-1'>Position</div>
                                                <div className='col-auto'>
                                                    <SelectBar type='common'
                                                        placeholder="Select Position"
                                                        name='posID'
                                                        list={positionListConverted}
                                                        value={this.state.posID}
                                                        onSelectPos={this.onSelectPos}
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="ct-chart">
                                                    {this.onShowPieList()}
                                                </div>
                                            </div>
                                            <div className="card-body">
                                                <h4 className="card-title">Skills needed in each position</h4>
                                            </div>
                                        </div>
                                    </>
                                }
                            </div>

                        </div>
                    </div>
                }
            </React.Fragment >
        );
    }
}
const mapStateToProps = (state) => {
    return {
        dataStatistics: state.DataStatisticsReducer,
        positionList: state.PositionSelectBarReducer,
        skillInPosition: state.SkillInPosition
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
        fetchPositionList: () => {
            dispatch(fetchPostionList())
        },
        fetchMissingEmpPos: () => {
            dispatch(fetchMissingEmpPosition())
        },
        fetchSkillInPosition: () => {
            dispatch(fetchSkillInPosition())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProp)(Dashboard);
