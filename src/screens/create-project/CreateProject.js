import React, { Component } from 'react';

class CreateProject extends Component {
    render() {
        return (
            <div className="card">
                <div className="card-header card-header-primary">
                    <h3 className="card-title">Create Project</h3>
                </div>
                <div className="card-body">
                    <form>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="form-group">
                                    <label className="bmd-label-floating">Project Name</label>
                                    <input type="text" className="form-control" />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <label className="bmd-label">Date begin</label>

                                <div className="form-group">
                                    <input type="date" className="form-control" value="" />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <label class="bmd-label">Date End</label>

                                <div className="form-group">
                                    <input type="date" className="form-control" value="" />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="form-group">
                                    <label className="bmd-label-floating">Description</label>
                                    <textarea className="form-control" rows={5} defaultValue={""} />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="form-group">
                                    <label className="bmd-label-floating">Stakeholder</label>
                                    <textarea className="form-control" rows={5} defaultValue={""} />
                                </div>
                            </div>
                        </div>
                        <button type="submit" className="btn btn-primary pull-right">Create Project</button>
                        <div className="clearfix" />
                    </form>
                </div>
            </div>

        );
    }
}

export default CreateProject;