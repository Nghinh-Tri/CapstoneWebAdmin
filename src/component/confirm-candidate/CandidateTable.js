import React, { Component } from 'react';

class CandidateTable extends Component {

    showCandidate = (candidateList) => {
        var result = null
        result = candidateList.map((candidate, index) => {
            return (<tr>
                <th className="text-center">{index + 1}</th>
                <th className="text-center">{candidate.name}</th>
            </tr>)
        })
        return result
    }

    render() {
        var { item } = this.props
        console.log(item)
        return (
            <div>
                <div className="card-body">
                    <div className='row header'>
                        <h3 className="font-weight-bold">{item.posName}</h3>
                    </div>
                    <div className="row">
                        <div className="card-body confirm-table">
                            <table className="table">
                                <thead className=" text-primary">
                                    <tr>
                                        <th className="font-weight-bold text-center">No</th>
                                        <th className="font-weight-bold text-center">Name</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {this.showCandidate(item.candidateSelect)}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default CandidateTable;