import React, { Component } from 'react';

class SuggestCandidateItems extends Component {

    onSelect = (event) => {
        this.props.onSelect(event.target.checked, this.props.candidate)
    }

    checkSelectCandidate = (empID) => {
        var { candidateSelectedList } = this.props
        if (candidateSelectedList !== null) {
            for (let index = 0; index < candidateSelectedList.length; index++) {
                if (candidateSelectedList[index].empID === empID)
                    return true
            }
        }
        return false
    }

    render() {
        var { index, candidate } = this.props
        return (
            <tr>
                <th className="text-center">{index + 1}</th>
                <th className="">{candidate.name}</th>
                <th className="">{candidate.phoneNumber}</th>
                <th className="">{candidate.email}</th>
                <th className="text-center">{candidate.numberOfProject}</th>
                <th className="text-center">
                    <input type="checkbox" onClick={this.onSelect} checked={this.checkSelectCandidate(candidate.empID)} />
                </th>
            </tr>
        );
    }
}

export default SuggestCandidateItems;