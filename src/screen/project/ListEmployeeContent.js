import moment from 'moment';
import React, { Component } from 'react';

class ListEmployeeContent extends Component {

    showCandidate = (employees, posName) => {
        var result = null
        result = employees.map((employee, index) => {
            return (<tr key={index}>
                <th className="text-center">{index + 1}</th>
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
            <div>
                <div className="card-body">
                    <div className="row">
                        <div className="card-body confirm-table">
                            <table className="table">
                                <thead className=" text-primary">
                                    <tr>
                                        <th className="font-weight-bold text-center">No</th>
                                        <th className="font-weight-bold">Name</th>
                                        <th className="font-weight-bold">Position</th>
                                        <th className="font-weight-bold text-center">Date In</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.showCandidate(item.employees, item.posName)}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ListEmployeeContent;