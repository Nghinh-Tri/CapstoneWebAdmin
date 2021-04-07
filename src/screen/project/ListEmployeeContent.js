import moment from 'moment';
import React, { Component } from 'react';

class ListEmployeeContent extends Component {

    showCandidate = (employees, posName) => {
        var result = null
        result = employees.map((employee, index) => {
            return (<tr key={index}>
                <th className="">{employee.name}</th>
                <th className="">{posName}</th>
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
            <tbody>
                {this.showCandidate(item.employees, item.posName)}
            </tbody>
        );
    }
}

export default ListEmployeeContent;