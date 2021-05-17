import React, { Component } from 'react';
import CandidateTable from '../../component/confirm-add-candidate-table/CandidateTable';
import ProgressBar from '../../component/progress-bar/ProgressBar';
import './ConfirmPage.css'
import * as Action from "../../service/action/confirm/SuggestCandidateAgainAction";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { convertAddEmployeeList, convertCheckSuggestList } from '../../service/util/util';
import { checkSession } from '../../service/action/user/AuthenticateAction';
import { history } from '../../service/helper/History';
import { compose } from 'redux';
import { checkRejectCandidatesInSuggestList, confirmSuggestList } from '../../service/action/confirm/SuggestCandidateAction';
import BriefDetail from '../../component/brief-detail/BrriefDetails';
import TextArea from 'antd/lib/input/TextArea';
import confirm from 'antd/lib/modal/confirm';
import { Modal } from 'antd';

class ConfirmSelectCandidate extends Component {

    constructor(props) {
        super(props);
        this.state = {
            // isUpdate: false,
            confirmObj: {},
            click: false
        }
    }

    componentDidUpdate = (prevProp) => {
        if (prevProp.status !== this.props.status) {
            if (this.props.status)
                Modal.success({
                    title: 'Confirm Employee Successfully',
                    onOk() { history.push('/project') }
                })
        }
    }

    onDeleteCandiate = (empID, postion) => {
        this.props.removeCandidate(empID, postion)
    }

    showList = (candidateList) => {
        var result = null
        result = candidateList.map((item, index) => {
            return (<CandidateTable key={index} item={item} position={item.position} onDeleteCandiate={this.onDeleteCandiate} />)
        })
        return result
    }

    componentDidMount = () => {
        this.props.checkSession()
        this.props.fetchSelectCandidate()      
    }

    componentWillReceiveProps = () => {
        var { rejectedCandidate, confirmSuggestList } = this.props
        var { confirmObj, click } = this.state
        if (click) {
            var projectID = JSON.parse(localStorage.getItem('projectId'))
            var pmID = JSON.parse(localStorage.getItem('pmID'))
            var projectName = JSON.parse(localStorage.getItem('projectName'))
            if (rejectedCandidate.message !== "" && rejectedCandidate.list.length > 0) {
                var content = ""
                this.props.rejectedCandidate.list.forEach(element => {
                    content = content + element + '\n'
                });
                confirm({
                    title: rejectedCandidate.message,
                    content: (<>
                        <TextArea defaultValue={content} disabled={true} autoSize={true}
                            style={{ color: 'black', backgroundColor: 'white', borderColor: 'white', cursor: 'default' }} />
                    </>),
                    okType: 'danger',
                    onOk:()=> { 
                        confirmSuggestList(confirmObj, projectID, projectName, pmID) 
                        this.setState({ click: !this.state.click })
                    },
                    onCancel: () => { this.setState({ click: !this.state.click }) }
                });
            } else {
                confirmSuggestList(confirmObj, projectID, projectName, pmID)
            }
        }
    }

    onSuggest = () => {
        var { candidateList, } = this.props
        var list = convertAddEmployeeList(candidateList)
        var projectID = JSON.parse(localStorage.getItem('projectId'))
        var obj = { candidates: list }
        var checkSuggest = convertCheckSuggestList(candidateList)
        this.setState({ confirmObj: obj, click: !this.state.click })
        this.props.checkRejectedCandidate({ candidates: checkSuggest }, projectID)
    }

    onBack = () => {
        history.push(`/project/add-employees/${this.props.match.params.id}`)
    }

    render() {
        var { candidateList } = this.props
        return (
            <div>
                <ProgressBar current={3} />
                <BriefDetail />
                {candidateList.length === 0 ?
                    history.push(`/project/add-employees/${this.props.match.params.id}`)
                    :
                    this.showList(candidateList)
                }
                <div className="row pull-right" style={{ marginBottom: 10, marginTop: -10 }}>
                    <div className="col" >
                        <button onClick={this.onBack} type="button" className="btn btn-primary pull-right" style={{ width: 110, fontWeight: 600 }}>Back</button>
                    </div>
                    <div className="col">
                        <button type="button" className="btn btn-primary pull-right" onClick={this.onSuggest} style={{ width: 110, fontWeight: 600 }}>Add</button>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        candidateList: state.SuggestCandidateAgainSelectedListReducer,
        rejectedCandidate: state.CheckRejectedCandidates,
        status: state.StatusReducer
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchSelectCandidate: () => {
            dispatch(Action.fetchSelectedList())
        },
        removeCandidate: (candidate, position) => {
            dispatch(Action.unselectCandiate(candidate, position))
        },
        confirmSuggestList: (suggestList, projectID, projectName, pmID) => {
            dispatch(confirmSuggestList(suggestList, projectID, projectName, pmID))
        },
        checkSession: () => {
            dispatch(checkSession())
        },
        checkRejectedCandidate: (suggestList, projectID) => {
            dispatch(checkRejectCandidatesInSuggestList(suggestList, projectID))
        }
    }
}

export default compose(withRouter, connect(mapStateToProps, mapDispatchToProps))(ConfirmSelectCandidate);