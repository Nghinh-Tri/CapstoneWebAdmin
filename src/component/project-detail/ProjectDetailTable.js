import { Input } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import moment from 'moment';
import React, { Component } from 'react';
import { showSpan, showStatus } from '../../service/util/util';

class ProjectDetailTable extends Component {

    render() {
        var { project } = this.props
        var result = {}
        if (typeof project !== 'undefined')
            result = project
        console.log(project)
        return (
            <div className="card">
                <div className="card-header card-header-primary">
                    <h4 className="card-title">Project Detail</h4>
                </div>
                <div className="card-body">
                    <div className="form-group">
                        {/* Project detail */}
                        <div className="row">
                            {/* Project Name */}
                            <div className="col-auto">
                                <label className="bmd-label">
                                    <h4 className="font-weight-bold">Project Name : </h4>
                                </label>
                            </div>
                            <div className="col" style={{ marginTop: -15, width: 250 }}>
                                <Input className="form-group" value={result.projectName} disabled="true" style={{ color: "black", cursor: 'default', fontWeight: 700, fontSize: 18, border: 'none', backgroundColor: 'white' }} />
                            </div>

                            {/* Project Status */}
                            <div className="col-auto">
                                <label className="bmd-label">
                                    <h4 className="font-weight-bold">Project Status : </h4>
                                </label>
                            </div>
                            <div className="col" style={{ marginTop: -5, width: 250, fontWeight: 600, fontSize: 20 }}>
                                <span className={`badge badge-pill ${showSpan(project.status)} span`}>
                                    {showStatus(project.status)}
                                </span>
                            </div>
                        </div>
                        <div className='row'>
                            {/* Project Type */}
                            <div className="col-auto">
                                <label className="bmd-label">
                                    <h4 className="font-weight-bold">Project Type : </h4>
                                </label>
                            </div>
                            <div className="col" style={{ marginLeft: 10, marginTop: -15, width: 250 }}>
                                <Input className="form-group" value={result.projectName} disabled="true" style={{ color: "black", cursor: 'default', fontWeight: 700, fontSize: 18, border: 'none', backgroundColor: 'white' }} />
                            </div>
                        </div>

                        {/* Date */}
                        <div className="row">
                            {/* Date begin */}
                            <div className="col-auto">
                                <label className="bmd-label">
                                    <h4 className="font-weight-bold">Start Date : </h4>
                                </label>
                            </div>
                            <div className="col-auto" style={{ marginLeft: 20, marginTop: -15, width: 250, fontWeight: 600, fontSize: 20 }}>
                                <Input className="form-group" value={moment(result.dateBegin).format('DD-MM-YYYY')} disabled="true" style={{ color: "black", cursor: 'default', fontWeight: 700, fontSize: 18, border: 'none', backgroundColor: 'white' }} />
                            </div>
                            <div className="col-auto" style={{ marginLeft: 68 }} >
                                <label className="bmd-label">
                                    <h4 className="font-weight-bold">End Date (Estimated) : </h4>
                                </label>
                            </div>
                            <div className="col-auto" style={{ marginTop: -15, width: 250, fontWeight: 600, fontSize: 20 }}>
                                <Input className="form-group" value={moment(result.dateEstimatedEnd).format('DD-MM-YYYY')} disabled="true" style={{ color: "black", cursor: 'default', fontWeight: 700, fontSize: 18, border: 'none', backgroundColor: 'white' }} />
                            </div>

                        </div>

                        {/* Description*/}
                        <div className="row">
                            <div className="col-auto">
                                <label className="bmd-label">
                                    <h4 className="font-weight-bold">Description : </h4>
                                </label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col form-group" style={{ marginTop: -8, width: 250, fontWeight: 600, fontSize: 20 }}>
                                <TextArea className="form-group" disabled="true" value={result.description} style={{ color: "black", cursor: 'default', fontSize: 18, fontWeight: 600 }} />
                            </div>
                        </div>

                        {/* Stakeholder*/}
                        <div className="row">
                            <div className="col-auto">
                                <label className="bmd-label">
                                    <h4 className="font-weight-bold">Stakeholder : </h4>
                                </label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col form-group" style={{ marginTop: -8, width: 250, fontWeight: 600, fontSize: 20 }}>
                                <TextArea className="form-group" disabled="true" value={result.skateholder} style={{ color: "black", cursor: 'default', fontSize: 18, fontWeight: 600 }} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}



export default ProjectDetailTable;