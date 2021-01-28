import React, { Component } from 'react';
import SuggestCandidateItems from './suggest-candidate-items/SuggestCandidateItems';

class SuggestCandidates extends Component {
    render() {
        return (
            <div className="card mb-80">
                <div className="card-header card-header-primary">
                    <div className="row">
                        <div className="col-9">
                            <h4 className="font-weight-bold">Position</h4>
                        </div>
                        <div className="col">
                            <h4 className="font-weight-bold pull-right">Select - 16</h4>
                        </div>
                    </div>
                </div>
                <div className="card-body">
                    <div className="form-group">
                        <div className="row">
                            <div className="card-body">
                                <div className="table-responsive">
                                    <table className="table">
                                        <thead className=" text-primary">
                                            <tr>
                                                <th className="font-weight-bold text-center">No</th>
                                                <th className="font-weight-bold text-center">ID</th>
                                                <th className="font-weight-bold text-center">Name</th>
                                                <th className="font-weight-bold text-center">Skill</th>
                                                <th className="font-weight-bold text-center">Match Percent</th>
                                                <th className="font-weight-bold text-center">Select</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <SuggestCandidateItems/>
                                            <SuggestCandidateItems/>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >

        );
    }
}

export default SuggestCandidates;