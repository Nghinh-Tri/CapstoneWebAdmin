import React, { Component } from 'react';
import SuggestCandidateItems from './add-employee-item/AddEmployeeItem';

class SuggestCandidates extends Component {

    onSortType = () => {
        this.props.onSort('type')
    }

    onSortField = () => {
        this.props.onSort('field')
    }

    onSortLanguage = () => {
        this.props.onSort('language')
    }

    onSortSoftSkill = () => {
        this.props.onSort('softSkill')
    }

    onSortHardSkill = () => {
        this.props.onSort('hardSkill')
    }

    onSortOverall = () => {
        this.props.onSort('overall')
    }

    onSelect = (value, candidate) => {
        if (value) {
            this.props.onSelectCandidate(candidate, this.props.item, this.getCandidateNeeds(this.props.item.posId))
        }
        else {
            this.props.onUnselectCandidate(candidate, this.props.item.position)
        }
    }

    onSelectAll = (event) => {
        var value = event.target.checked
        if (value)
            this.props.onSelectAll(this.props.item)
        else
            this.props.onUnSelectAll(this.props.item.position)
    }

    showCandidate = (candidateList, selectedItem, candidateNeeds) => {
        var { item, candidateSelectedList } = this.props
        var result = null
        result = candidateList.map((candidate, index) => {
            return (<SuggestCandidateItems key={index}
                onSelect={this.onSelect}
                candidate={candidate}
                index={index}
                candidateNeeds={candidateNeeds}
                position={item.position}
                selectedItem={selectedItem === null ? null : selectedItem}
                candidateSelectedList={candidateSelectedList}
            />)
        })
        return result
    }

    getCandidateNeeds = (posId) => {
        var candidateNeeds = 0
        var require = JSON.parse(localStorage.getItem('positionRequire'))
        require.forEach(element => {
            if (element.posID === posId)
                candidateNeeds = element.candidateNeeded
        });
        return candidateNeeds
    }

    render() {
        var { item, selectedItem } = this.props
        var candidateNeeds = this.getCandidateNeeds(item.posId)
        return (
            <React.Fragment>
                {typeof item.matchDetail !== 'undefined' ?
                    item.matchDetail.length === 0 ?
                        <div className='row justify-content-center' style={{ width: 'auto' }} >
                            <h4 style={{ fontStyle: 'italic', color: 'gray' }} >
                                There is currently no suitable candidates for this position
                            </h4>
                        </div>
                        :
                        <>
                            <h5 className="pull-right" style={{ marginTop: 0 }}>Select {selectedItem === null ? 0 : selectedItem.candidateSelect.length} / {candidateNeeds} </h5>
                            <div class="table-responsive">
                                <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                                    <thead>
                                        <tr>
                                            <th className="font-weight-bold text-center">No</th>
                                            <th className="font-weight-bold">Name</th>
                                            <th className="font-weight-bold text-center" width={180}>
                                                Project Type Match
                                    <i className="material-icons" name='langugage' style={{ marginTop: -10, cursor: 'pointer' }} onClick={this.onSortType}>swap_vert</i>
                                            </th>
                                            <th className="font-weight-bold text-center" width={180}>
                                                Project Field Match
                                    <i className="material-icons" name='langugage' style={{ marginTop: -10, cursor: 'pointer' }} onClick={this.onSortField}>swap_vert</i>
                                            </th>
                                            <th className="font-weight-bold text-center">
                                                Language Match
                                    <i className="material-icons" name='langugage' style={{ marginTop: -10, cursor: 'pointer' }} onClick={this.onSortLanguage}>swap_vert</i>
                                            </th>
                                            <th className="font-weight-bold text-center">
                                                Soft Skill Match
                                    <i className="material-icons" style={{ marginTop: -10, cursor: 'pointer' }} onClick={this.onSortSoftSkill}>swap_vert</i>
                                            </th>
                                            <th className="font-weight-bold text-center">
                                                Hard Skill Match
                                    <i className="material-icons" style={{ marginTop: -10, cursor: 'pointer' }} onClick={this.onSortHardSkill}>swap_vert</i>
                                            </th>
                                            <th className="font-weight-bold text-center">
                                                Overall Match
                                    <i className="material-icons" style={{ marginTop: -10, cursor: 'pointer' }} onClick={this.onSortOverall}>swap_vert</i>
                                            </th>
                                            <th className="font-weight-bold text-center">
                                                {candidateNeeds >= item.matchDetail.length ?
                                                    <input type="checkbox" onClick={this.onSelectAll} checked={selectedItem === null ? false : selectedItem.selectAll} />
                                                    : ''}
                                            </th>
                                        </tr>
                                    </thead>
                                    {typeof item.matchDetail !== 'undefined' ? (
                                        <tbody>
                                            {this.showCandidate(typeof item.matchDetail !== 'undefined' ? item.matchDetail : [], selectedItem, candidateNeeds)}
                                        </tbody>
                                    ) : ('')}
                                </table>
                            </div>
                        </>
                    : ''}
            </React.Fragment>
        );
    }
}

export default SuggestCandidates;