import React, { Component } from 'react';
import CandidateTable from '../../component/confirm-candidate/CandidateTable';
import './ConfirmPage.css'
import * as Action from "../../service/action/SuggestCandidateAction";
import { connect } from 'react-redux';
import { checkSession } from '../../service/action/AuthenticateAction';

class ConfirmSelectCandidate extends Component {

    componentDidMount = () => {
        this.props.checkSession()
        this.props.fetchSelectCandidate()
    }


    showList = (candidateList) => {
        var result = null
        console.log(candidateList);
        result = candidateList.map((item, index) => {
            return (<CandidateTable key={index} item={item} />)
        })
        return result
    }

    render() {
        var { candidateList } = this.props
        return (

            <div className='card mb-80'>
                {this.showList(candidateList)}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        candidateList: state.SuggestCandidateSelectedList
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchSelectCandidate: () => {
            dispatch(Action.fetchSelectedList())
        },
        confirmSuggestList: suggestList => {
            dispatch(Action.confirmSuggestList(suggestList))
        },
        checkSession: () => {
            dispatch(checkSession())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmSelectCandidate);