import moment from 'moment';
import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';


class ListEmployeeContent extends Component {

    showCandidate = (employees, posName) => {
        var result = null
        result = employees.map((employee, index) => {
            return (<tr key={index}>
                <th >
                    <NavLink className="text-primary" to={`/employee/profile/${employee.empID}`}>{employee.name}</NavLink>
                </th>
                <th className="">{posName}</th>
                <th className="">{employee.phoneNumber}</th>
                <th className="">{employee.email}</th>
                <th className="text-center">
                    {employee.dateIn === null ? "-" : moment(employee.dateIn).format('DD-MM-YYYY')}
                </th>
            </tr>)
        })
        return result
    }

    render() {
        var { item } = this.props
        return (
            <React.Fragment>
                {this.showCandidate(item.employees, item.posName)}
            </React.Fragment>
        );
    }
}

export default ListEmployeeContent;