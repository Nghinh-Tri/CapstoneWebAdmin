import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as Action from '../../service/action/project/ListEmployeeAction'
import { history } from '../../service/helper/History';
import { Spin, Tabs, Tooltip } from "antd";
import { InfoCircleTwoTone } from "@ant-design/icons";
import { PROJECT_EMPLOYEE_LIST } from "../../service/constant/nodata";
import ListRequirement from './ListRequirement';
const TabPane = Tabs.TabPane;

class ListEmployee extends Component {

    constructor(props) {
        super(props);
        this.state = {
            page: 1,
            positionList: [],
            positionSelect: 0,
            count: 0,
            isLoading: true
        }
    }

    componentDidMount = () => {
        this.props.fetchListEmployee(this.props.project.projectID, 1)
    }

    componentDidUpdate = (prevState) => {
        if (prevState.listEmployee !== this.props.listEmployee) {
            var { listEmployee } = this.props
            var temp = []
            listEmployee.forEach(element => {
                var position = { label: element.posName, value: element.posID }
                temp.push(position)
            });
            this.setState({ isLoading: false, positionList: temp })
        }
    }

    getTabName = () => {
        var { listEmployee } = this.props;
        var result = (listEmployee || []).map((item, index) => (
            <>
                <TabPane
                    tab={
                        <>
                            <Tooltip title={item.isMissEmp ? 'This position is missing employees' : ''} >
                                <span>{(item || {}).posName} </span>
                                {item.isMissEmp > 0 ? (
                                    <InfoCircleTwoTone twoToneColor="#FF0000"
                                        style={{ fontSize: "16px" }} />
                                ) : ("")}
                            </Tooltip>
                        </>
                    }
                    key={index}
                ></TabPane>
            </>
        ));
        return result;
    };

    onSelectPos = (value) => {
        this.setState({ positionSelect: parseInt(value) })
    }

    onHandle = () => {
        localStorage.setItem('projectName', JSON.stringify(this.props.project.projectName))
        localStorage.setItem('dateCreate', this.props.project.dateBegin)
        localStorage.setItem('dateEnd', this.props.project.dateEstimatedEnd)
        history.push(`/project/confirm-candidate/${this.props.project.projectID}`)
    }

    render() {
        var { listEmployee } = this.props;
        // console.log(listEmployee)
        return (
            <React.Fragment>
                {this.state.isLoading ?
                    <div className="row justify-content-center">
                        <Spin className="text-center" size="large" />
                    </div>
                    :
                    listEmployee.length === 0 ?
                        <div className='row justify-content-center' style={{ width: 'auto' }} >
                            <h4 style={{ fontStyle: 'italic', color: 'gray' }} >{PROJECT_EMPLOYEE_LIST.NO_POSITION}</h4>
                        </div>
                        :
                        <>
                            <div class="card mb-4">
                                <div class="card-header">
                                    <Tabs defaultActiveKey={this.state.positionSelect} onChange={this.onSelectPos}>
                                        {this.getTabName()}
                                    </Tabs>
                                </div>
                                <div class="card-body">
                                    <ListRequirement item={listEmployee[this.state.positionSelect]} project={this.props.project} />
                                </div>
                            </div>
                            {typeof listEmployee.find(i => i.isNeedConfirm) !== 'undefined' ?
                                <button type="submit" className="btn btn-primary pull-right" onClick={this.onHandle} style={{ fontWeight: 700 }} >
                                    Confirm Candidates
                                        </button>
                                : ''
                            }
                        </>
                }
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        listEmployee: state.ListEmployeeReducer
    }
}

const mapDispatchToProp = dispatch => {
    return {
        fetchListEmployee: (projectID, page) => {
            dispatch(Action.fetchListEmployee(projectID, page))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProp)(ListEmployee);