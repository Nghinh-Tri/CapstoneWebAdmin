import React, { Component } from 'react';
import SuggestCandidateItems from './add-employee-item/AddEmployeeItem';
import { ArrowUpOutlined } from "@ant-design/icons";
import { connect } from 'react-redux';
import { pagingSuggestList, sortSuggestList } from '../../service/action/confirm/SuggestCandidateAgainAction';
import { Pagination, Spin } from 'antd';

class SuggestCandidates extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoad: true
        }
    }


    componentDidMount() {
        this.props.pagingSuggestList(this.props.item.matchDetail, 1)
    }

    componentDidUpdate = (prevProp) => {
        if (prevProp.paging !== this.props.paging)
            this.setState({ isLoad: false })
    }

    onSort = (e) => {
        this.props.onSortSuggestList(e)
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

    onSelectPage = (e) => {
        this.props.pagingSuggestList(this.props.item.matchDetail, e)
    }

    render() {
        var { item, selectedItem, paging } = this.props
        var candidateNeeds = 0
        if (typeof item.posId !== 'undefined')
            candidateNeeds = this.getCandidateNeeds(item.posId)
        return (
            <React.Fragment>
                {this.state.isLoad ?
                    <div className="row justify-content-center">
                        <Spin className="text-center" size="large" />
                    </div>
                    : <>
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
                                                    <th className="font-weight-bold " width={180}  >
                                                        <div style={{ display: 'flex', flexDirection: 'row', marginLeft: 10 }}>
                                                            <div>Project Type Match</div>
                                                            <ArrowUpOutlined style={{ cursor: 'pointer', }} onClick={() => this.onSort('type')} />
                                                        </div>
                                                    </th>
                                                    <th className="font-weight-bold text-center" width={180} >
                                                        <div style={{ display: 'flex', flexDirection: 'row', marginLeft: 10 }}>
                                                            <div> Project Field Match</div>
                                                            <ArrowUpOutlined style={{ cursor: 'pointer', }} onClick={() => this.onSort('field')} />
                                                        </div>
                                                    </th>
                                                    <th className="font-weight-bold text-center" width={160}>
                                                        <div style={{ display: 'flex', flexDirection: 'row', marginLeft: 10 }}>
                                                            <div>Language Match</div>
                                                            <ArrowUpOutlined style={{ cursor: 'pointer', }} onClick={() => this.onSort('language')} />
                                                        </div>
                                                    </th>
                                                    <th className="font-weight-bold text-center" width={160}>
                                                        <div style={{ display: 'flex', flexDirection: 'row', marginLeft: 10 }}>
                                                            <div>Soft Skill Match</div>
                                                            <ArrowUpOutlined style={{ cursor: 'pointer', }} onClick={() => this.onSort('softSkill')} />
                                                        </div>
                                                    </th>
                                                    <th className="font-weight-bold text-center" width={160}>
                                                        <div style={{ display: 'flex', flexDirection: 'row', marginLeft: 10 }}>
                                                            <div>Hard Skill Match</div>
                                                            <ArrowUpOutlined style={{ cursor: 'pointer', }} onClick={() => this.onSort('hardSkill')} />
                                                        </div>
                                                    </th>
                                                    <th className="font-weight-bold text-center" width={150}>
                                                        <div style={{ display: 'flex', flexDirection: 'row', marginLeft: 10 }}>
                                                            <div>Overall Match</div>
                                                            <ArrowUpOutlined style={{ cursor: 'pointer', }} onClick={() => this.onSort('overall')} />
                                                        </div>
                                                    </th>
                                                    <th className="font-weight-bold text-center">
                                                        {candidateNeeds >= item.matchDetail.length ?
                                                            <input type="checkbox" onClick={this.onSelectAll} checked={selectedItem === null ? false : selectedItem.selectAll} />
                                                            : ''}
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {this.showCandidate(typeof paging.items !== 'undefined' ? paging.items : [], selectedItem, candidateNeeds)}
                                            </tbody>
                                        </table>
                                    </div>
                                    {paging.pageCount <= 1 ? '' :
                                        <div className="row justify-content-center" style={{ marginBottom: 20 }}>
                                            <Pagination current={paging.pageIndex} total={paging.totalRecords} onChange={this.onSelectPage} />
                                        </div>
                                    }
                                </>
                            : ''}
                    </>}
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        paging: state.PagingSuggestListReducer
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        pagingSuggestList: (list, pageIndex) => {
            dispatch(pagingSuggestList(list, pageIndex))
        },
        onSortSuggestList: (value) => {
            dispatch(sortSuggestList(value));
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SuggestCandidates);