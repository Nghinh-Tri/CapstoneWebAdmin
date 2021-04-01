import React, { Component } from 'react';
import { connect } from 'react-redux';
import ListEmployeeContent from "./ListEmployeeContent";
import * as Action from "../../service/action/ListEmployeeAction";
import { history } from '../../service/helper/History';

class ListEmployee extends Component {

    constructor(props) {
        super(props);
        this.state = {
            page: 1
        }
    }

    componentDidMount = () => {
        this.props.fetchListEmployee(this.props.project.projectID, this.state.page)
    }

    showEmployee = (list) => {
        var result = null
        if (list.length > 0) {
            result = list.map((item, index) => {
                return (<ListEmployeeContent key={index} item={item} />)
            })
        } else {
            return (<h4 className="text-center" style={{ fontStyle: 'italic', color: 'gray' }} >No data</h4>)
        }
        return result
    }

    onHandle = () => {
        localStorage.setItem('projectId', this.props.project.projectID)
        history.push("/project/create-position", { isUpdate: true })
        localStorage.setItem('projectType', this.props.project.typeID)
        this.props.pushToCreatePosition()
    }

    render() {
        var { listEmployee } = this.props
        console.log(listEmployee)
        return (
            <div className="card">
                <div className="card-header card-header-primary">
                    <h4 className="card-title">List Employee</h4>
                </div>
                <div className="card-body">
                    {this.showEmployee(listEmployee)}
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