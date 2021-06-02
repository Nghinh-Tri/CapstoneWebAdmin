import React, { Component } from 'react';

class CandidateTable extends Component {

    showCandidate = (candidateList) => {
        var result = null
        if (candidateList.length > 0) {
            result = candidateList.map((candidate, index) => {
                return (<tr>
                    <th className="text-center">{index + 1}</th>
                    <th className="text-center">{candidate.name}</th>
                    <th className="text-center">{candidate.phoneNumber}</th>
                    <th className="text-center">{candidate.email}</th>
                    <th className="text-center">{candidate.numberOfProject}</th>
                    <th className="text-center">{typeof candidate.check === 'undefined' ? 'Rejected' : candidate.check ? 'Accepted' : 'Rejected'}</th>
                    <th className="text-center">{typeof candidate.check === 'undefined' ? candidate.note : candidate.check ? '' : candidate.note}</th>
                </tr>)
            })
        }
        return result
    }

    render() {
        var { item } = this.props
        return (
            <div className='card mb-40' style={{ marginBottom: 10 }} >
                <div className='card-header'>
                    {item.posName}
                </div>
                <div className="row">
                    <div className="card-body ">
                        <div class="table-responsive">
                            <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                                <thead className="font-weight-bold text-center text-primary">
                                    <tr>
                                        <th width={50}>No</th>
                                        <th width={200}>Name</th>
                                        <th width={100}>Phone</th>
                                        <th width={200}>Email</th>
                                        <th width={125}>Joined projects</th>
                                        <th width={100}>Status</th>
                                        <th width={300}>Rejecting Reason</th>
                                    </tr>
                                </thead>
                                {item.employees.length > 0 ?
                                    <tbody>
                                        {this.showCandidate(item.employees)}
                                    </tbody> :
                                    <h4 className="text-center" style={{ fontStyle: 'italic', color: 'gray' }}>No data</h4>
                                }
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default CandidateTable;