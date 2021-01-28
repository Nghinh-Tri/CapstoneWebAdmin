import React, { Component } from 'react';

class SuggestCandidateItems extends Component {
    render() {
        return (
            <tr>
                <th className="text-center">1</th>
                <th className="text-center">ID</th>
                <th className="text-center">Name</th>
                <th className="text-center">Skill</th>
                <th className="text-center">90 %</th>
                <th className="text-center">
                    <input type="checkbox" name="" id="" />
                </th>
            </tr>
        );
    }
}

export default SuggestCandidateItems;