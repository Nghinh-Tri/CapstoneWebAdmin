import confirm from 'antd/lib/modal/confirm';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Search from '../../component/search/Search';
import { checkSession } from '../../service/action/AuthenticateAction';
import { changeStatusPosition, fetchPostionListPaging } from '../../service/action/PositionSelectBarAction';
import { history } from '../../service/helper/History';
import { showPositionSpan, showPositionStatus } from '../../service/util/util';

class Position extends Component {

    constructor(props) {
        super(props);
        this.state = {
            search: ''
        }
    }

    componentDidMount = () => {
        this.props.checkSession()
        this.props.fetchPosittion(1, this.state.search)
    }

    onUpdate = (posID) => {
        history.push(`/position/update/${posID}`)
    }

    onChangeStatus = (posID, position) => {
        var { changeStatus, item } = this.props
        var { search } = this.state
        confirm({
            title: `Are you sure you want to change ${position} status?`,
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
                changeStatus(posID, item.pageIndex, search)
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }

    onShowListPosition = (list) => {
        var result = null
        result = list.map((value, index) => {
            return (
                <tr key={index}>
                    <th className="text-center">{index + 1}</th>
                    <th className="" style={{ width: 450 }}>{value.name}</th>
                    <th className="text-center" style={{ width: 150 }}>
                        <span className={`badge badge-pill ${showPositionSpan(value.status)} span`}>
                            {showPositionStatus(value.status)}
                        </span>
                    </th>
                    <th className="text-primary">
                        <a className="text-rigth" style={{ cursor: 'pointer' }} onClick={() => this.onUpdate(value.posID)} >Update</a>
                    </th>
                    <th className="text-primary">
                        <a className="text-primary" style={{ cursor: 'pointer' }} onClick={() => this.onChangeStatus(value.posID, value.name)}>Change Status</a>
                    </th>
                </tr>
            )
        })
        return result
    }

    onNext = () => {
        var { item } = this.props
        if (item.pageIndex < item.pageCount) {
            this.props.fetchPosittion(item.pageIndex + 1, this.state.search)
        }
    }

    onPrevios = () => {
        var { item } = this.props
        if (item.pageIndex > 1) {
            this.props.fetchPosittion(item.pageIndex - 1, this.state.search)
        }
    }

    onHandle = () => {
        history.push('/position/create')
    }

    searchPos = (value) => {
        this.setState({ search: value })
        this.props.fetchPosittion(1, value)
    }

    render() {
        var { item } = this.props
        var list = []
        if (typeof item.items !== 'undefined')
            list = item.items
        return (
            <div className="container-fluid">
                <button type="button" className="btn btn-primary"
                    style={{ fontWeight: 700, borderRadius: 5, marginLeft: 10, }}
                    onClick={this.onHandle}
                >
                    <i className="material-icons mr-5">add_box</i>
                        Create New Position
                </button>
                <div className="row">
                    <div className="card mb-80">
                        <div className="card-body">
                            <div className="form-group">
                                <div className="row">
                                    <Search search="Position"
                                        placeholder="Search position name ..."
                                        searchPos={this.searchPos} />
                                </div>
                                <div className="row">
                                    <div className="card-body">
                                        <table className="table">
                                            <thead className="text-primary">
                                                <tr>
                                                    <th className="font-weight-bold text-center">No</th>
                                                    <th className="font-weight-bold" style={{ marginLeft: 20 }}>Position</th>
                                                    <th className="font-weight-bold text-center" style={{ marginLeft: 20 }}>Status</th>
                                                    <th className="font-weight-bold text-center" style={{ marginLeft: 20 }}></th>
                                                    <th className="font-weight-bold text-center" style={{ marginLeft: 20 }}></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {this.onShowListPosition(list)}
                                            </tbody>
                                        </table>
                                        <div className="row align-items-center">
                                            <div className="col">
                                                <button type="button"
                                                    style={{ fontWeight: 700, width: 120 }}
                                                    className="btn btn-primary pull-right" onClick={this.onPrevios}>
                                                    Previous
                                            </button>
                                            </div>
                                            <div className="col-auto">
                                                <div className="text-center" style={{ fontSize: 20, fontWeight: 700, color: '#9c27b0' }}>
                                                    {item.pageIndex} - {item.pageCount}
                                                </div>
                                            </div>
                                            <div className="col">
                                                <button type="button"
                                                    style={{ fontWeight: 700, width: 120 }}
                                                    className="btn btn-primary" onClick={this.onNext}>
                                                    Next
                                            </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        item: state.PositionReducer
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        checkSession: () => {
            dispatch(checkSession())
        },
        fetchPosittion: (pageIndex, search) => {
            dispatch(fetchPostionListPaging(pageIndex, search))
        },
        changeStatus: (posID, pageIndex, search) => {
            dispatch(changeStatusPosition(posID, pageIndex, search))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Position);