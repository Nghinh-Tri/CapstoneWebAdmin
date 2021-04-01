import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as Action from "../../service/action/ProjectAction";
import ProjectDetailTable from "../../component/project-detail/ProjectDetailTable";
import { history } from '../../service/helper/History';
import { NavLink } from 'react-router-dom';
import { checkSession } from '../../service/action/AuthenticateAction';
import ProgressBar from '../../component/progress-bar/ProgressBar';

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
        this.props.onDecline(this.props.project.projectID)
    }

    render() {
        var { project } = this.props
        return (
            <div>
                <div className='col'>
                    <ProgressBar step="step1" />
                        <ProjectDetailTable project={project} match={this.props.match} />


                    <div className="row pull-right">
                        <div className="col">
                            <button type="button" className="btn btn-primary pull-right" style={{ width: 110, fontWeight: 600 }} onClick={this.onDecline}>Decline</button>
                        </div>
                        <div className="col">
                            <div className='col' >
                                <NavLink to={`/project/candidateList/${project.projectID}`} className='btn btn-primary pull-right' style={{ width: 110, fontWeight: 600 }}>Accept</NavLink>
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