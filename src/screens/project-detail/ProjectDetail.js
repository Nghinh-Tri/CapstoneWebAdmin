import React, { Component } from 'react';
import CandidateTable from "../../components/candidate-table/CandidateTable";

class ProjectDetail extends Component {
    render() {
        return (
            <div className="card mb-80">                
                <div className="card-body">
                    <div className="form-group">
                        <div className="row">
                            <div className="mr-20-ml-20">
                                <label className="bmd-label-floating">
                                    <h4 className="font-weight-bold">Project Name : </h4>
                                </label>
                            </div>
                            <div className="mr-20">
                                <label className="bmd-label-floating">
                                    <h4 className="font-weight-bold">Project Name</h4>
                                </label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="mr-20-ml-20">
                                <label className="bmd-label-floating">
                                    <h4 className="font-weight-bold">Date Begin : </h4>
                                </label>
                            </div>
                            <div className="mr-40">
                                <label className="bmd-label-floating">
                                    <h4 className="font-weight-bold">12-12-2020 </h4>
                                </label>
                            </div>
                            <div className="mr-20-ml-20 mr-50">
                                <label className="bmd-label-floating">
                                    <h4 className="font-weight-bold">Date End :</h4>
                                </label>
                            </div>
                            <div className="mr-40">
                                <label className="bmd-label-floating">
                                    <h4 className="font-weight-bold">12-12-2020</h4>
                                </label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="mr-20-ml-20">
                                <label className="bmd-label-floating">
                                    <h4 className="font-weight-bold">Desciption : </h4>
                                </label>
                            </div>
                            <div className="mr-40">
                                <label className="bmd-label-floating">
                                    <h4 className="font-weight-bold">description</h4>
                                </label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="mr-20-ml-20">
                                <label className="bmd-label-floating">
                                    <h4 className="font-weight-bold">Status : </h4>
                                </label>
                            </div>
                            <div className="mr-70">
                                <h4 className="card-title">
                                    <span className="badge badge-pill badge-success">Finish</span>

                                </h4>
                            </div>
                        </div>
                        <div className="row">
                            <div className="card-body">
                                <CandidateTable />
                            </div>
                        </div>
                    </div>
                </div>
            </div >

        );
    }
}

export default ProjectDetail;