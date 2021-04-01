import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as Action from "../../service/action/ProjectAction";
import ProjectDetailTable from "../../component/project-detail/ProjectDetailTable";
import ConfirmSelectCandidate from '../../component/confirm-select-candidate/ConfirmSelectCandidate';
import { checkSession } from '../../service/action/AuthenticateAction';
import { NavLink } from 'react-router-dom';
import ProgressBar from '../../component/progress-bar/ProgressBar';
import { confirmSuggestList, fetchSelectedList } from '../../service/action/SuggestCandidateAction';
import { convertSuggestList } from '../../service/util/util';

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

    onConfirm = () => {
        var item = convertSuggestList(this.props.candidateList)
        this.props.onConfirm(item, this.props.project.projectID)
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
                        {this.state.select === 1 ?
                            <ProjectDetailTable project={project} match={this.props.match} />
                            :
                            <ConfirmSelectCandidate candidateList={this.props.candidateList} />
                        }

                        <div className="row pull-right">
                            <div className="col">
                                <NavLink to={`/project/candidateList/${project.projectID}`}>
                                    <button type="button" className="btn btn-primary pull-right" style={{ width: 110, fontWeight: 600 }}>Back</button>
                                </NavLink>
                            </div>
                            <div className="col">
                                <button type="button" className="btn btn-primary pull-right" style={{ width: 110, fontWeight: 600 }} onClick={this.onConfirm} >Confirm</button>
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
        project: state.ProjectFetchReducer,
        candidateList: state.SuggestCandidateSelectedList
    }
}

const mapDispatchToProp = dispatch => {
    return {
        fetchProjectDetail: projectID => {
            dispatch(Action.fetchProjectDetail(projectID))
        },
        fetchSelectCandidate: () => {
            dispatch(fetchSelectedList())
        },
        checkSession: () => {
            dispatch(checkSession())
        },
        onConfirm: (item, projectID) => {
            dispatch(confirmSuggestList(item, projectID))
        }
    }
}

export default connect(mapStateToProp, mapDispatchToProp)(ConfirmPage);