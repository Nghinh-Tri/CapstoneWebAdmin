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
                        {/* Project Name */}
                        <div className="row">
                            <div className="col-2">
                                <label className="badge">
                                    <h4 className="font-weight-bold">Project Name : </h4>
                                </label>
                            </div>
                            <div className="col" style={{ fontSize: 20, marginTop: 3, marginLeft: 10, fontWeight: 400 }}>
                                {result.projectName}
                            </div>
                        </div>

                        {/* Project Status */}
                        <div className="row">
                            <div className="col-2">
                                <label className="badge">
                                    <h4 className="font-weight-bold">Project Status : </h4>
                                </label>
                            </div>
                            <div className="col" style={{ marginTop: 3, width: 250, fontWeight: 600, fontSize: 20, marginLeft: 5 }}>
                                <span className={`badge badge-pill ${showSpan(project.status)} span`}>
                                    {showStatus(project.status)}
                                </span>
                            </div>
                        </div>

                        {/* Project Type */}
                        <div className='row'>
                            <div className="col-2">
                                <label className="badge">
                                    <h4 className="font-weight-bold">Project Type : </h4>
                                </label>
                            </div>
                            <div className="col" style={{ fontSize: 20, marginTop: 3, marginLeft: 10, fontWeight: 400 }}>
                                {result.typeName}
                            </div>
                        </div>

                        {/* Date */}
                        <div className="row">
                            {/* Date begin */}
                            <div className="col-2">
                                <label className="badge">
                                    <h4 className="font-weight-bold">Started Date : </h4>
                                </label>
                            </div>
                            <div className="col-auto" style={{ fontSize: 20, marginTop: 3, marginLeft: 10, fontWeight: 400 }}>
                                {moment(result.dateBegin).format('DD-MM-YYYY')}
                            </div>
                            <div className="col-auto"  >
                                <label className="badge">
                                    <h4 className="font-weight-bold">End Date {result.dateEnd === null ? '(Estimate)' : ''} : </h4>
                                </label>
                            </div>
                            <div className="col-auto" style={{ fontSize: 20, marginTop: 3, marginLeft: 10, fontWeight: 400 }}>
                                {result.dateEnd === null ? moment(result.dateEstimatedEnd).format('DD-MM-YYYY') : moment(result.dateEnd).format('DD-MM-YYYY')}
                            </div>
                        </div>

                        {/* Description*/}
                        <div className="row">
                            <div className="col-2">
                                <label className="badge">
                                    <h4 className="font-weight-bold">Description : </h4>
                                </label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col form-group" style={{ marginTop: -8, width: 250 }}>
                                <TextArea className="form-group" disabled="true" rows="auto" value={result.description} style={{ color: "black", cursor: 'default', fontSize: 18 }} />
                            </div>
                        </div>

                        {/* Stakeholder*/}
                        <div className="row">
                            <div className="col-2">
                                <label className="badge">
                                    <h4 className="font-weight-bold">Stakeholder : </h4>
                                </label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col form-group" style={{ marginTop: -8, width: 250 }}>
                                <TextArea className="form-group" disabled="true" rows="auto" value={result.skateholder} style={{ color: "black", cursor: 'default', fontSize: 18 }} />
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        );
    }
}



export default ProjectDetailTable;