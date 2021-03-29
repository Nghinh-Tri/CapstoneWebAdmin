import React, { Component } from 'react';
import { connect } from 'react-redux';
import { checkSession } from '../../service/action/AuthenticateAction';
import { fetchPostionList } from '../../service/action/PositionSelectBarAction';
import { history } from '../../service/helper/History';

class Position extends Component {

    componentDidMount = () => {
        this.props.checkSession()
        this.props.fetchPosittion()
    }

    onShowListPosition = (list) => {
        var result = null
        result = list.map((value, index) => {
            return (
                <tr key={index}>
                    <th className="text-center">{index + 1}</th>
                    <th className="">{value.name}</th>
                    <th className=""><a className="text-primary" style={{ cursor: 'pointer' }}>Delete</a></th>
                </tr>
            )
        })
        return result
    }

    onHandle = () => [
        history.push('/position/create')
    ]

    render() {
        var { positionList } = this.props
        var list = null
        if (positionList.length !== null)
            list = positionList
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
                                            {/* {projects.pageIndex} - {projects.pageCount} */}
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
        positionList: state.PositionSelectBarReducer
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        checkSession: () => {
            dispatch(checkSession())
        },
        fetchPosittion: () => {
            dispatch(fetchPostionList())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Position);