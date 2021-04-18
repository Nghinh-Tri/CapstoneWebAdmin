import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as Action from '../../service/action/ListEmployeeAction'
import SelectBar from "../../component/select-search/SelectBar";
import ListEmployeeContent from './ListEmployeeContent';
import { addMoreCandidate } from '../../service/action/PositionAction';
import { history } from '../../service/helper/History';
import { Tabs } from "antd";

const TabPane = Tabs.TabPane;

class ListEmployee extends Component {

    constructor(props) {
        super(props);
        this.state = {
            page: 1,
            positionList: [],
            positionSelect: 0,
            count: 0
        }
    }

    componentDidMount = () => {
        this.props.fetchListEmployee(this.props.project.projectID, 1)
    }

    componentWillReceiveProps = () => {
        var { listEmployee } = this.props
        var temp = []
        listEmployee.forEach(element => {
            var position = { label: element.posName, value: element.posID }
            temp.push(position)
        });
        this.setState({ positionList: temp })
    }

    showEmployee = (list) => {
        if (list.length > 0) {
            return (<ListEmployeeContent item={list[this.state.positionSelect]} project={this.props.project} />)
        } else {
            return (<div className='row justify-content-center'>
                <h4 style={{ fontStyle: 'italic', color: 'gray' }} >No data</h4>
            </div>)
        }
    }
    getTabName = () => {
        var postList = []
        if (this.state.positionList.length >= 1)
            postList = this.state.positionList
        var result = postList.map((item, index) =>
            <>
                <TabPane tab={(item || {}).label} key={index}></TabPane>
            </>
        );
        return result;
    };

    onSelectPos = (value) => {
        this.setState({ positionSelect: parseInt(value) })
    }

    onHandle = () => {
        history.push(`/project/confirm-candidate/${this.props.project.projectID}`)
    }

    render() {
        var { listEmployee } = this.props
        var postList = []
        if (this.state.positionList.length >= 1)
            postList = this.state.positionList
        return (
            <div class="card mb-4">
                <div class="card-header">
                    <Tabs defaultActiveKey={this.state.positionSelect} onChange={this.onSelectPos}>
                        {this.getTabName()}
                    </Tabs>
                </div>
                <div class="card-body">

                    {this.showEmployee(listEmployee)}

                    {listEmployee.length > 0 ? '' : <div className='row justify-content-center' style={{ width: 'auto' }} >
                        <h4 style={{ fontStyle: 'italic', color: 'gray' }} >No data</h4>
                    </div>}

                    {listEmployee.length > 0 ?
                        typeof listEmployee.find(i => i.employees.find(k => k.dateIn === null)) !== 'undefined' ?
                            <button type="submit" className="btn btn-primary pull-right" onClick={this.onHandle} style={{ fontWeight: 700 }} >
                                Confirm Candidates
                        </button>
                            : ''
                        : ''
                    }
                </div>
            </div>

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