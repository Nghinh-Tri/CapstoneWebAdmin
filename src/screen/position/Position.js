import React, { Component } from 'react';
import { connect } from 'react-redux';
import { checkSession } from '../../service/action/AuthenticateAction';
import { changeStatusPosition, fetchPostionListPaging } from '../../service/action/PositionSelectBarAction';
import { history } from '../../service/helper/History';
import { showPositionSpan, showPositionStatus } from '../../service/util/util';

class Position extends Component {

    componentDidMount = () => {
        this.props.checkSession()
        this.props.fetchPosittion(1)
    }

    onUpdate = (posID) => {
        history.push(`/position/update/${posID}`)
    }

    onChangeStatus = (posID) => {
        this.props.changeStatus(posID, this.props.item.pageIndex)
    }

    onShowListPosition = (list) => {
        var result = null
        result = list.map((value, index) => {
            return (
                <tr key={index}>
                    <th className="text-center">{index + 1}</th>
                    <th className="font-weight-bold" style={{ width: 450 }}>{value.name}</th>
                    <th className="text-center" style={{ width: 150 }}>
                        <span className={`badge badge-pill ${showPositionSpan(value.status)} span`}>
                            {showPositionStatus(value.status)}
                        </span>
                    </th>
                    <th className="text-primary">
                        <a className="text-rigth" style={{ cursor: 'pointer' }} onClick={() => this.onUpdate(value.posID)} >Update</a>
                    </th>
                    <th className="text-primary">
                        <a className="text-primary" style={{ cursor: 'pointer' }} onClick={() => this.onChangeStatus(value.posID)}>Change Status</a>
                    </th>

                </tr>
            )
        })
        return result
    }

    onNext = () => {
        var { item } = this.props
        if (item.pageIndex < item.pageCount) {
            this.props.fetchPosittion(item.pageIndex + 1)
        }
    }

    onPrevios = () => {
        var { item } = this.props
        if (item.pageIndex > 1) {
            this.props.fetchPosittion(item.pageIndex - 1)
        }
    }

    onHandle = () => {
        history.push('/position/create')
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
                        <div className="row">
                            <div className="card-body">
                                <table className="table">
                                    <thead className="text-primary">
                                        <tr>
                                            <th className="font-weight-bold text-center">No</th>
                                            <th className="font-weight-bold" style={{ marginLeft: 20 }}>Position</th>
                                            <th className="font-weight-bold text-center" style={{ marginLeft: 20 }}>Status</th>
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
        fetchPosittion: (pageIndex) => {
            dispatch(fetchPostionListPaging(pageIndex))
        },
        changeStatus: (posID, pageIndex) => {
            dispatch(changeStatusPosition(posID, pageIndex))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Position);