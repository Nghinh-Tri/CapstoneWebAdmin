import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as Action from "../../service/action/project/ProjectAction";
import ConfirmSelectCandidate from '../../component/confirm-select-candidate/ConfirmSelectCandidate';
import { checkSession } from '../../service/action/user/AuthenticateAction';
import { NavLink } from 'react-router-dom';
import ProgressBar from '../../component/progress-bar/ProgressBar';
import { confirmSuggestList, fetchSelectedList } from '../../service/action/confirm/SuggestCandidateAction';
import { convertSuggestList } from '../../service/util/util';
import BriefDetail from '../../component/brief-detail/BrriefDetails';
import { Modal } from 'antd';
import { history } from '../../service/helper/History';

class ConfirmPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            select: 1,
            project: {},
            isSubmit: false
        };
    }

    componentDidMount = () => {
        this.props.checkSession();
        var { match } = this.props;
        this.props.fetchSelectCandidate()
        this.props.fetchProjectDetail(match.params.id);
    };

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.project !== prevState.project) {
            return { someState: nextProps.project };
        }
        return null;
    }

    componentDidUpdate(prevProps, prevState) {
        console.log('st',this.props.status)
        if (prevProps.project !== this.props.project) {
            if (typeof this.props.project.pageIndex === "undefined")
                this.setState({ project: this.props.project });
        } else if (prevProps.status !== this.props.status) {
            if (this.state.isSubmit) {
                if (this.props.status)
                    Modal.success({
                        title: 'Confirm Employee Successfully',
                        onOk() { history.push('/project') }
                    })
            }
        }
    }

    onConfirm = () => {
        var item = convertSuggestList(this.props.candidateList);
        var candidates = { candidates: item };
        var projectName = this.state.project.projectName
        var pmID = this.state.project.pmID
        this.setState({ isSubmit: true })
        this.props.onConfirm(candidates, this.state.project.projectID, projectName, pmID);
    };

    onClickMenu = (value) => {
        this.setState({ select: parseInt(value) });
    };

    render() {
        var { project } = this.state;
        return (
            <div>
                <ProgressBar current="1" />
                <BriefDetail />
                <div className="card mb-4">
                    <ConfirmSelectCandidate candidateList={this.props.candidateList} />
                </div>

                <div className="row pull-right" style={{ marginBottom: 15, marginTop: -10 }}>
                    <div className="col">
                        <NavLink to={`/project/confirm-candidate/${project.projectID}`}>
                            <button type="button" className="btn btn-primary pull-right" style={{ width: 110, fontWeight: 600 }}>
                                Back
                            </button>
                        </NavLink>
                    </div>
                    <div className="col">
                        <button type="button" className="btn btn-primary pull-right" style={{ width: 110, fontWeight: 600 }} onClick={this.onConfirm}>
                            Confirm
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProp = state => {
    return {
        project: state.ProjectDetailFetchReducer,
        candidateList: state.SuggestCandidateSelectedList,
        status: state.StatusReducer
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
        onConfirm: (item, projectID, projectName, pmID) => {
            dispatch(confirmSuggestList(item, projectID, projectName, pmID))
        }
    }
}

export default connect(mapStateToProp, mapDispatchToProp)(ConfirmPage);