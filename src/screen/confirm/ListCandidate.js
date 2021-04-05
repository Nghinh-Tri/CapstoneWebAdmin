import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import ProgressBar from '../../component/progress-bar/ProgressBar';
import SuggestCandidates from '../../component/suggest-candidate/SuggestCandidatesTable'
import * as Action from "../../service/action/SuggestCandidateAction";
import '../../css/SuggestNav.css'
import { checkSession } from '../../service/action/AuthenticateAction';

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

    selectCandidate = (candidate, posName, posID) => {
        this.props.selectCandidate(candidate, posName.trim(), posID)
    }

    unselectCandidate = (candidate, posName) => {
        this.props.unSelectCandidate(candidate, posName.trim())
    }

    getSelectedCandidateList = (suggestCandidateItem, selecedCandidateList) => {
        for (let k = 0; k < selecedCandidateList.length; k++) {
            if (suggestCandidateItem.position === selecedCandidateList[k].position)
                return selecedCandidateList[k]
        }
        return null
    }

    render() {
        var { suggestCandidateList, selectedIndex, candidateSelectedList } = this.props
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
                            />
                            :
                            ''
                        }
                    </div>
                </div>

                <div className="row pull-right">
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
        selectCandidate: (candidate, posName, posID) => {
            dispatch(Action.selectCandidate(candidate, posName, posID))
        },
        unSelectCandidate: (candidate, posName) => {
            dispatch(Action.unselectCandiate(candidate, posName))
        },
        fetchSuggestCandidateList: (projectID) => {
            dispatch(Action.fetchSuggestList(projectID))
        },
        checkSession: () => {
            dispatch(checkSession())
        }

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListCandidate);