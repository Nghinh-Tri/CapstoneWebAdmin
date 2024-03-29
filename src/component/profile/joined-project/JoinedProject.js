import { Pagination, Spin } from 'antd';
import moment from 'moment';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { fetchEmployeeJoinedProjects } from '../../../service/action/project/ProjectAction';
import { showSpan, showStatus } from '../../../service/util/util';

class JoinedProject extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoad: true
        }
    }

    componentDidMount() {
        this.props.fetchJoinedList(this.props.empID, 1)
    }

    componentDidUpdate = (prevProp) => {
        if (prevProp.joinedProject !== this.props.joinedProject) {
            this.setState({ isLoad: false })
        }
    }

    onShowListProject = (projectList, pageIndex) => {
        var result = null
        if (typeof projectList !== 'undefined') {
            result = projectList.map((project, index) => {
                return (
                    <tr key={index}>
                        <th className="text-center">{(pageIndex - 1) * 10 + index + 1}</th>
                        <th className="">
                            <NavLink to={`/project/detail/${project.projectID}`}>
                                {project.projectName}
                            </NavLink>
                        </th>
                        <th className="">{project.posName}</th>
                        <th className="text-center">{moment(project.dateIn).format('DD-MM-YYYY')}</th>
                        <th className="text-center">{moment(project.dateBegin).format('DD-MM-YYYY')}</th>
                        <th className="text-center">
                            {project.dateEnd === null ? moment(project.dateEstimatedEnd).format('DD-MM-YYYY') : moment(project.dateEnd).format('DD-MM-YYYY')}
                        </th>
                        <th className="text-center">
                            <span className={`badge badge-pill ${showSpan(project.status)} span`}>
                                {showStatus(project.status)}
                            </span>
                        </th>
                    </tr>
                );
            })
        }
        return result
    }

    onSelectPage = (value) => {
        this.props.fetchJoinedList(this.props.empID, value)
    }

    render() {
        var { joinedProject } = this.props
        return (
            <React.Fragment>
                {this.state.isLoad ?
                    <div className="row justify-content-center">
                        <Spin className="text-center" size="large" />
                    </div>
                    :
                    joinedProject.items.length > 0 ?
                        <>
                            <div class="table-responsive">
                                <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                                    <thead className="font-weight-bold text-center text-primary">
                                        <tr>
                                            <th width={40}>No</th>
                                            <th width={350}>Project Name</th>
                                            <th width={150}>Position</th>
                                            <th width={150}>Confirmed Date</th>
                                            <th width={150}>Project Start Date</th>
                                            <th width={150}>Project End Date</th>
                                            <th width={50}>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.onShowListProject(joinedProject.items, joinedProject.pageIndex)}
                                    </tbody>
                                </table>
                            </div>
                            {joinedProject.pageCount <= 1 ? "" :
                                <div className='row justify-content-center' style={{ marginBottom: 20 }} >
                                    <Pagination defaultCurrent={joinedProject.pageIndex} total={joinedProject.totalRecords} onChange={this.onSelectPage} />
                                </div>
                            }
                        </>
                        :
                        <div className='row justify-content-center' style={{ width: 'auto' }} >
                            <h4 style={{ fontStyle: 'italic', color: 'gray' }} >This employee has not joined any project</h4>
                        </div>
                }
            </React.Fragment>
        );
    }
}

const mapStateToProp = (state) => {
    return {
        joinedProject: state.JoinedProjectReducer
    }
}

const mapDispatchToProp = (dispatch) => {
    return {
        fetchJoinedList: (empID, pageIndex) => {
            dispatch(fetchEmployeeJoinedProjects(empID, pageIndex))
        }
    }
}

export default connect(mapStateToProp, mapDispatchToProp)(JoinedProject);