import React, { Component } from 'react';

class ProjectDetailTable extends Component {

    render() {
        var { project } = this.props
        return (
            <div className="card-body">
                <div className="form-group">
                    {/* Project detail */}
                    <div className="row">
                        <div className="col-7">
                            {/* Project Name */}
                            <div className="row">
                                <div className="mr-20-ml-20">
                                    <label className="bmd-label-floating">
                                        <h4 className="font-weight-bold">Project Name : </h4>
                                    </label>
                                </div>
                                <div className="mr-20">
                                    <label className="bmd-label-floating">
                                        <h4 className="font-weight-bold">{project.projectName}</h4>
                                    </label>
                                </div>
                            </div>
                            {/* Date Begin - Date End Est */}
                            <div className="row">
                                {/* Date Begin */}
                                <div className="col-auto" style={{ marginLeft: 5 }}>
                                    <label className="bmd-label-floating">
                                        <h4 className="font-weight-bold">Date Begin : </h4>
                                    </label>
                                </div>
                                <div className="col-auto">
                                    <label className="bmd-label-floating">
                                        <h4 className="font-weight-bold">{project.dateBegin}</h4>
                                    </label>
                                </div>
                                {/* Date End Est */}
                                <div className="mr-20-ml-20 mr-50">
                                    <label className="bmd-label-floating">
                                        <h4 className="font-weight-bold">Date End Estimate :</h4>
                                    </label>
                                </div>
                                <div className="">
                                    <label className="bmd-label-floating">
                                        <h4 className="font-weight-bold">{project.dateEstimatedEnd}</h4>
                                    </label>
                                </div>
                            </div>
                            {/* Description */}
                            <div className="row">
                                <div className="mr-20-ml-20">
                                    <label className="bmd-label-floating">
                                        <h4 className="font-weight-bold">Desciption : </h4>
                                    </label>
                                </div>
                                <div className="mr-40">
                                    <label className="bmd-label-floating">
                                        <h4 className="font-weight-bold">{project.description}</h4>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >

        );
    }
}

export default ProjectDetailTable;