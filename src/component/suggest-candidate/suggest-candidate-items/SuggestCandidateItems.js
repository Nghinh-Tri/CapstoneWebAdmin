import React, { Component } from 'react';

class SuggestCandidateItems extends Component {

    onSelect = (event) => {
        this.props.onSelect(event.target.checked, this.props.candidate)
    }

    checkSelectCandidate = (empID) => {
        console.log(empID)
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
                <th className="text-center">{candidate.name}</th>
                <th className="text-center">
                    <input type="checkbox" onClick={this.onSelect} checked={this.checkSelectCandidate(candidate.empID)} />
                </th>
            </tr>
        );
    }
}

export default SuggestCandidateItems;