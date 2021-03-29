import moment from 'moment';
import React, { Component } from 'react';

class ListEmployeeContent extends Component {

    showCandidate = (employees) => {
        var result = null
        result = employees.map((employee, index) => {
            return (<tr key={index}>
                <th className="text-center">{index + 1}</th>
                <th className="text-center">{employee.name}</th>
                <th className="text-center">{employee.dateIn === null ? "-" : moment(employee.dateIn).format('DD-MM-YYYY')}</th>
                <th className="text-center">{employee.status === 0 ?
                    <span className={`badge badge-pill badge-secondary span`}>Pending</span>
                    :
                    <span className={`badge badge-pill badge-success span`}>On Going</span>
                }</th>
            </tr>)
        })
        return result
    }

    render() {
        var { item } = this.props
        return (
            <div>
                <div className="card-body">
                    <div className='row header'>
                        <h4 className="font-weight-bold">{item.posName}</h4>
                    </div>
                    <div className="row">
                        <div className="card-body confirm-table">
                            <table className="table">
                                <thead className=" text-primary">
                                    <tr>
                                        <th className="font-weight-bold text-center">No</th>
                                        <th className="font-weight-bold text-center">Name</th>
                                        <th className="font-weight-bold text-center">Date In</th>
                                        <th className="font-weight-bold text-center">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.showCandidate(item.employees)}
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