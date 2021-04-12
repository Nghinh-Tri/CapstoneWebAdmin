import React, { Component } from 'react';

class CandidateTable extends Component {

    showCandidate = (candidateList) => {
        var result = null
        if (candidateList.length > 0) {
            result = candidateList.map((candidate, index) => {
                return (<tr>
                    <th className="text-center">{index + 1}</th>
                    <th className="">{candidate.name}</th>
                    <th className="">{candidate.phoneNumber}</th>
                    <th className="">{candidate.email}</th>
                    <th className="text-center">{candidate.numberOfProject}</th>
                </tr>)
            })
        }
        return result
    }

    render() {
        var { item } = this.props
        return (
            <div className='card mb-40' style={{marginBottom:10}} >
                <div className='card-header'>
                    {item.posName}
                </div>
                <div className="row">
                    <div className="card-body ">
                        <div class="table-responsive">
                            <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                                <thead className=" text-primary">
                                    <tr>
                                        <th className="font-weight-bold text-center">No</th>
                                        <th className="font-weight-bold" width={250}>Name</th>
                                        <th className="font-weight-bold">Phone</th>
                                        <th className="font-weight-bold">Email</th>
                                        <th className="font-weight-bold text-center">Joined projects</th>
                                    </tr>
                                </thead>
                                {item.candidateSelect.length > 0 ?
                                    <tbody>
                                        {this.showCandidate(item.candidateSelect)}
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