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

class ListCandidate extends Component {

    componentDidMount = () => {
        this.props.checkSession()
        var { match } = this.props
        this.props.fetchSuggestCandidateList(match.params.id)
    }

    onSelected = (index) => {
        this.props.onPositionSelect(index)
    }

    showPosition = () => {
        var { suggestCandidateList, selectedIndex } = this.props
        var result = null;
        result = suggestCandidateList.map((item, index) => {
            return (
                <li className='li' key={index}>
                    <a className={selectedIndex === index ? 'active' : ''} onClick={() => this.onSelected(index)}>{item.posName}</a>
                </li>
            )
        })
        return result
    }

    selectCandidate = (candidate, item) => {
        this.props.selectCandidate(candidate, item)
    }

    unselectCandidate = (candidate, posName) => {
        this.props.unSelectCandidate(candidate, posName.trim())
    }

    getSelectedCandidateList = (suggestCandidateItem, selecedCandidateList) => {
        for (let k = 0; k < selecedCandidateList.length; k++) {
            if (suggestCandidateItem.posName === selecedCandidateList[k].posName)
                return selecedCandidateList[k]
        }
        return null
    }

    onSelectAll = (item) => {
        this.props.selectAll(item)
    }

    onUnSelectAll = (position) => {
        this.props.unSelectAll(position)
    }

    onDecline = () => {
        if (this.props.candidateSelectedList.length > 0) {
            var item = convertSuggestList(this.props.candidateSelectedList)
            var candidates = { candidates: item, isAccept: false }
            var { onDecline, match, location } = this.props
            confirm({
                title: 'Are you sure you want to decline those candidate?',
                okText: 'Yes',
                okType: 'danger',
                cancelText: 'No',
                onOk() {
                    onDecline(candidates, match.params.id, location.state.projectName, location.state.pmID)
                },
                onCancel() {
                    console.log('Cancel');
                },
            });
        }
    }

    render() {
        var { suggestCandidateList, selectedIndex, candidateSelectedList } = this.props
        console.log('suggestCandidateList', suggestCandidateList)
        return (
            <div>
                <ProgressBar step="step2" />
                <div className="row">
                    <div className='col-2'>
                        <ul className='ul'>
                            {this.showPosition()}
                        </ul>
                    </div>
                    <div className='col'>
                        {suggestCandidateList.length > 0
                            ?
                            <SuggestCandidates
                                item={suggestCandidateList[selectedIndex]}
                                onSelectCandidate={this.selectCandidate}
                                selectedItem={this.getSelectedCandidateList(suggestCandidateList[selectedIndex], candidateSelectedList)}
                                onUnselectCandidate={this.unselectCandidate}
                                onSelectAll={this.onSelectAll}
                                onUnSelectAll={this.onUnSelectAll}
                            />
                            :
                            history.push(`/project/detail/${this.props.match.params.id}`)
                        }
                    </div>
                </div>

                <div className="row pull-right">
                    <div className="col">
                        <button type="button" className="btn btn-danger pull-right" style={{ width: 110, fontWeight: 600 }} onClick={this.onDecline} >Decline</button>
                    </div>
                    <div className="col">
                        <NavLink to={`/project/confirm-accept/${this.props.match.params.id}`}>
                            <button type="button" className="btn btn-primary pull-right" style={{ width: 110, fontWeight: 600 }}>Next</button>
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
        selectCandidate: (candidate, item) => {
            dispatch(Action.selectCandidate(candidate, item))
        },
        unSelectCandidate: (candidate, posName) => {
            dispatch(Action.unselectCandiate(candidate, posName))
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