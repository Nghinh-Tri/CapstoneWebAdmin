import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as Action from "../../service/action/ProjectAction";
import ProjectDetailTable from "../../component/project-detail/ProjectDetailTable";
import { NavLink } from 'react-router-dom';
import { checkSession } from '../../service/action/AuthenticateAction';
import ProgressBar from '../../component/progress-bar/ProgressBar';
import confirm from 'antd/lib/modal/confirm';

class ProjectDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            select: 1
        }
    }

    componentDidMount = () => {
        this.props.checkSession()
        var { match } = this.props
        this.props.fetchProjectDetail(match.params.id)
    }

    onClickMenu = (value) => {
        this.setState({ select: value })
    }

    onDecline = () => {
        var { onDecline, project } = this.props
        confirm({
            title: 'Are you sure decline this project?',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
                onDecline(project.projectID)
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }

    render() {
        var { project } = this.props
        return (
            <div>
                <div className='col'>
                    <ProgressBar step="step1" />
                    <ProjectDetailTable project={project} match={this.props.match} />


                    <div className="row pull-right" style={{ marginTop: -20 }}>
                        {project.status === 0 || project.status === 1 ?
                            <div className="col">
                                <button type="button" className="btn btn-danger pull-right" style={{ width: 110, fontWeight: 600, marginBottom: 15 }} onClick={this.onDecline}>Decline</button>
                            </div>
                            : ''
                        }
                        <div className="col">
                            <div className='col' >
                                <NavLink to={`/project/candidateList/${project.projectID}`} className='btn btn-success pull-right' style={{ width: 110, fontWeight: 600 }}>Accept</NavLink>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        );
    }
}

const mapStateToProp = state => {
    return {
        project: state.ProjectFetchReducer
    }
}

const mapDispatchToProp = dispatch => {
    return {
        fetchProjectDetail: projectID => {
            dispatch(Action.fetchProjectDetail(projectID))
        },
        checkSession: () => {
            dispatch(checkSession())
        },
        onDecline: projectID => {
            dispatch(Action.declineProject(projectID))
        }
    }
}

export default connect(mapStateToProp, mapDispatchToProp)(ProjectDetail);