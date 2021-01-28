import React, { Component } from 'react';

class ProjectBrief extends Component {
    render() {
        return (
            <div className="card">
                <div className="card-body">
                    <div className="row">
                        <div className="col">
                            <label className="bmd-label-floating mt-ml">
                                <h4 className="font-weight-bold">Project Name</h4>
                            </label>
                        </div>
                        <div className="col">
                            <button type="button" className="btn btn-primary pull-right">
                                Detail
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ProjectBrief;