import React, { Component } from 'react';
import SuggestCandidates from '../../components/suggest-candidate/SuggestCandidates';

class SuggestCandidate extends Component {
    render() {
        return (
            <div>
                <SuggestCandidates />
                <SuggestCandidates />
                <button type="submit" className="btn btn-primary pull-right pt">Next</button>
                <button type="submit" className="btn btn-primary pull-right pt">Back</button>
            </div>
        );
    }
}

export default SuggestCandidate;