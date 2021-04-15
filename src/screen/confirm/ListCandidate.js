import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';
import ProgressBar from '../../component/progress-bar/ProgressBar';
import SuggestCandidates from '../../component/suggest-candidate/SuggestCandidatesTable'
import * as Action from "../../service/action/SuggestCandidateAction";
import '../../css/SuggestNav.css'
import { checkSession } from '../../service/action/AuthenticateAction';
import { compose } from 'redux';
import { convertSuggestList } from '../../service/util/util';
import { history } from '../../service/helper/History';
import confirm from 'antd/lib/modal/confirm';
import SelectBar from "../../component/select-search/SelectBar";
import { Tabs } from "antd";

const TabPane = Tabs.TabPane;

class ListCandidate extends Component {
    componentDidMount = () => {
        this.props.checkSession();
        var { match } = this.props;
        this.props.fetchSuggestCandidateList(match.params.id);
    };

    componentDidUpdate = (prevProp) => {
        if (prevProp.candidateSelectedList !== this.props.candidateSelectedList) {
            console.log('candidateSelectedList', this.props.candidateSelectedList)
        }
    }

    onSelected = (index) => {
        this.props.onPositionSelect(index);
    };

    selectCandidate = (check, candidate, posID) => {
        console.log(check, candidate, posID)
        this.props.selectCandidate(check, candidate, posID);
    };

    onNoteRejectingReason = (value, candidate, posID) => {
        this.props.noteRejectingReason(value, candidate, posID)
    }

    getSelectedCandidateList = (suggestCandidateItem, selecedCandidateList) => {
        for (let k = 0; k < selecedCandidateList.length; k++) {
            if (suggestCandidateItem.posName === selecedCandidateList[k].posName)
                return selecedCandidateList[k];
        }
        return null;
    };

    getTabName = () => {
        var { candidateSelectedList } = this.props;
        var result = candidateSelectedList.map((item, index) =>
            <>
                <TabPane tab={(item || {}).posName} key={index}></TabPane>
            </>
        );
        return result;
    };

    onSelectAll = (item) => {
        this.props.selectAll(item);
    };

    onUnSelectAll = (position) => {
        this.props.unSelectAll(position);
    };

    onDecline = () => {
        if (this.props.candidateSelectedList.length > 0) {
            var item = convertSuggestList(this.props.candidateSelectedList);
            var candidates = { candidates: item, isAccept: false };
            var { onDecline, match, location } = this.props;
            confirm({
                title: "Are you sure you want to decline those candidate?",
                okText: "Yes",
                okType: "danger",
                cancelText: "No",
                onOk() {
                    onDecline(
                        candidates,
                        match.params.id,
                        location.state.projectName,
                        location.state.pmID
                    );
                },
                onCancel() {
                    console.log("Cancel");
                },
            });
        }
    };

    render() {
        var { suggestCandidateList, selectedIndex, candidateSelectedList, } = this.props;
        return (
            <div>
                <ProgressBar current="0" />
                <div class="card mb-4">
                    <div class="card-header">
                        <Tabs defaultActiveKey="0" onChange={this.onSelected}>
                            {this.getTabName()}
                        </Tabs>
                    </div>
                    <div className="card-body">
                        {suggestCandidateList.length > 0 ? (
                            <SuggestCandidates
                                item={candidateSelectedList[selectedIndex]}
                                onSelectCandidate={this.selectCandidate}
                                onNoteRejectingReason={this.onNoteRejectingReason}
                                // selectedItem={this.getSelectedCandidateList(
                                //     suggestCandidateList[selectedIndex],
                                //     candidateSelectedList
                                // )}
                                onUnselectCandidate={this.unselectCandidate}
                                onSelectAll={this.onSelectAll}
                                onUnSelectAll={this.onUnSelectAll}
                            />
                        ) : (
                            ""
                        )}
                    </div>
                </div>
                <div className="row pull-right">
                    {/* <div className="col">
                        <button type="button" className="btn btn-danger pull-right" style={{ width: 110, fontWeight: 600 }} onClick={this.onDecline}>
                            Decline
                        </button>
                    </div> */}
                    <div className="col">
                        <NavLink to={`/project/confirm-accept-candidate/${this.props.match.params.id}`}>
                            <button type="button" className="btn btn-primary pull-right" style={{ width: 110, fontWeight: 600 }}>
                                Next
                            </button>
                        </NavLink>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        suggestCandidateList: state.SuggestCandidateList,
        selectedIndex: state.SuggestCandidateSelect,
        candidateSelectedList: state.SuggestCandidateSelectedList
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onPositionSelect: index => {
            dispatch(Action.setPositionSelect(index))
        },
        selectCandidate: (check, candidate, posID) => {
            dispatch(Action.selectCandidate(check, candidate, posID))
        },
        noteRejectingReason: (value, candidate, posID) => {
            dispatch(Action.noteRejectingReason(value, candidate, posID))
        },
        fetchSuggestCandidateList: (projectID) => {
            dispatch(Action.fetchSuggestList(projectID))
        },
        checkSession: () => {
            dispatch(checkSession())
        },
        selectAll: (candidateList) => {
            dispatch(Action.selectAllCandidates(candidateList))
        },
        unSelectAll: (position) => {
            dispatch(Action.unselectAllCandiates(position))
        },
        onDecline: (candidates, projectId, projectName, pmID) => {
            dispatch(Action.confirmSuggestList(candidates, projectId, projectName, pmID))
        }
    }
}

export default compose(withRouter, connect(mapStateToProps, mapDispatchToProps))(ListCandidate);