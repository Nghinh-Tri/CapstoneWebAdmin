import React, { Component } from 'react';
import SuggestCandidateItems from './suggest-candidate-items/SuggestCandidateItems';

class SuggestCandidates extends Component {

    onSelect = (value, candidate) => {
        if (value) {
            this.props.onSelectCandidate(candidate, this.props.item)
        }
        else {
            this.props.onUnselectCandidate(candidate, this.props.item.posName)
        }
    }

    showCandidate = (candidateList, selectedItem) => {
        console.log(candidateList)
        var result = null
        result = candidateList.map((candidate, index) => {
            return (<SuggestCandidateItems key={index}
                onSelect={this.onSelect}
                candidate={candidate}
                index={index}
                candidateSelectedList={selectedItem === null ? null : selectedItem.candidateSelect}
            />)
        })

        return result
    }

    onSelectAll = (event) => {
        var value = event.target.checked
        if (value) {
            console.log('item', this.props.item)
            this.props.onSelectAll(this.props.item)
        }
        else
            this.props.onUnSelectAll(this.props.item.posName)
    }

    render() {
        var { item, selectedItem } = this.props
        return (
            <div className="card">
                <div className="card-header card-header-primary">
                    <div className="row">
                        <div className="col-9">
                            <h4 className="font-weight-bold" style={{ color: 'whitesmoke' }}>{item.posName}</h4>
                        </div>
                        <div className="col">
                            <h4 className="font-weight-bold pull-right" style={{ color: 'whitesmoke' }}>Select - {selectedItem === null ? 0 : selectedItem.candidateSelect.length}</h4>
                        </div>
                    </div>
                </div>
                <div className="card-body">
                    <div className="form-group">
                        <div className="row">
                            <div className="card-body">
                                <div className="table-responsive">
                                    <table className="table">
                                        <thead className=" text-primary">
                                            <tr>
                                                <th className="font-weight-bold text-center">No</th>
                                                <th className="font-weight-bold">Name</th>
                                                <th className="font-weight-bold">Phone</th>
                                                <th className="font-weight-bold">Email</th>
                                                <th className="font-weight-bold text-center">Joined Projects</th>
                                                <th className="font-weight-bold text-center">
                                                    <input type="checkbox" onClick={this.onSelectAll} checked={selectedItem === null ? false : selectedItem.selectAll} />
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.showCandidate(item.employees, selectedItem)}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >

        );
    }
}

export default SuggestCandidates;