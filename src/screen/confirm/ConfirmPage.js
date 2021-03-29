import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as Action from "../../service/action/ProjectAction";
import ProjectDetailTable from "../../component/project-detail/ProjectDetailTable";
import ConfirmSelectCandidate from '../../component/confirm-select-candidate/ConfirmSelectCandidate';
import { checkSession } from '../../service/action/AuthenticateAction';
import { NavLink } from 'react-router-dom';
import ProgressBar from '../../component/progress-bar/ProgressBar';



class ConfirmPage extends Component {

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
    handleSubmit = (e) => {
        e.preventDefault();
    }

    render() {
        var { project } = this.props
        return (
            <div>
                  <ProgressBar step="step3" />
                <div className='row'>
                    <div className='col-auto' style={{ marginTop: 30 }}>
                        <ul className='ul'>
                            <li className='li'>
                                <a className={this.state.select === 1 ? 'active' : ''} onClick={() => this.onClickMenu(1)}>Project Detail</a>
                            </li>
                            <li className='li' >
                                <a className={this.state.select === 2 ? 'active' : ''} onClick={() => this.onClickMenu(2)} >List Employees</a>
                            </li>
                        </ul>
                    </div>

                    <div className='col'>
                        <div className="card">
                            {this.state.select === 1 ?
                                <ProjectDetailTable project={project} match={this.props.match} />
                                :
                                <ConfirmSelectCandidate   />
                            }

                        </div >
                        <div className="row pull-right">
                            <div className="col">
                                <NavLink to="/project/candidateList/:id">
                                    <button type="button" className="btn btn-primary pull-right" style={{ width: 110, fontWeight: 600 }}>Back</button>
                                </NavLink>
                            </div>
                            <div className="col">
                                <NavLink to="/confirmPage">
                                    <button type="button" className="btn btn-primary pull-right" style={{ width: 110, fontWeight: 600 }}>confirm</button>
                                </NavLink>
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
        }
    }
}

export default connect(mapStateToProp, mapDispatchToProp)(ConfirmPage);