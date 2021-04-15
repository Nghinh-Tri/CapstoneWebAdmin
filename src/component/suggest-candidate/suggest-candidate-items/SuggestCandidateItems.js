import React, { Component } from 'react';

class SuggestCandidateItems extends Component {

    constructor(props) {
        super(props);
        this.state = {
            readOnly: false
        }
    }

    onSelect = (event) => {
        var check = event.target.checked
        if (check)
            this.setState({ readOnly: true })
        else
            this.setState({ readOnly: false })
        this.props.onSelect(check, this.props.candidate, this.props.posID)
    }

    onHandle = (e) => {
        this.props.onNoteRejectingReason(e.target.value, this.props.candidate, this.props.posID)
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
                    <input type="checkbox" onClick={this.onSelect} checked={typeof candidate.check === 'undefined' ? false : candidate.check} />
                </th>
                <th className="text-center">
                    <div className="form-group" style={{ marginBottom: '0 !important' }}>
                        <input type="input" className="form-control" value={typeof candidate.check === 'undefined' || !candidate.check ? candidate.note : ''}
                            readOnly={this.state.readOnly} style={{ height: 30 }} placeholder="Rejecting Reason"
                            onChange={this.onHandle} />
                    </div>
                </th>
            </tr>
        );
    }
}

export default SuggestCandidateItems;