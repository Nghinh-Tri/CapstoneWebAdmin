import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import ListEmployeeContent from "./ListEmployeeContent";
import * as Action from "../../service/action/ListEmployeeAction";

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
        }
        return result
    }

    render() {
        var { listEmployee } = this.props
        console.log(listEmployee)
        return (
            <div>
                {this.showEmployee(listEmployee)}
                <div className="row">
                    <div className="col pull-right" style={{ marginRight: 20, marginBottom: 10 }}>
                        <NavLink to="/project/create-position">
                            <button className="btn btn-primary pull-right "> Add more position</button>
                        </NavLink>
                    </div>
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