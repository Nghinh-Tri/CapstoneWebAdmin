import { Modal, Pagination, Spin } from 'antd';
import confirm from 'antd/lib/modal/confirm';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Search from '../../component/search/Search';
import { checkSession } from '../../service/action/user/AuthenticateAction';
import { changeStatusPosition, fetchPostionListPaging, refreshPage } from '../../service/action/position/PositionSelectBarAction';
import { history } from '../../service/helper/History';
import { showPositionSpan, showPositionStatus } from '../../service/util/util';
import { POSITION } from '../../service/constant/nodata';

class Position extends Component {

    constructor(props) {
        super(props);
        this.state = {
            search: '',
            isLoading: true,
            page: 1
        }
    }

    componentDidMount = () => {
        this.props.checkSession()
        this.props.fetchPosittion(this.state.page, this.state.search)
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.item !== prevState.item) {
            return { someState: nextProps.item };
        }
        return null;
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.item !== this.props.item) {
            if (typeof this.props.item.items !== 'undefined') {
                this.setState({ isLoading: false })
            }
        } else if (prevProps.error !== this.props.error) {
            var { refreshError, error } = this.props
            if (this.props.error !== '') {
                Modal.error({
                    title: error,
                    onOk: () => { refreshError() }
                });
            }
        } else if (prevProps.status !== this.props.status) {
            let { fetchPosittion } = this.props
            let { page, search } = this.state
            if (this.props.status)
                Modal.success({
                    title: 'Change Position Status Successfully',
                    onOk() { fetchPosittion(page, search) }
                })
        }
    }

    onUpdate = (posID) => {
        history.push(`/position/update/${posID}`)
    }

    onChangeStatus = (posID, position) => {
        var { changeStatus } = this.props
        confirm({
            title: `Are you sure you want to change ${position} status?`,
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
                changeStatus(posID)
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }

    onShowListPosition = (list, pageIndex) => {
        var result = null
        result = list.map((value, index) => {
            return (
                <tr key={index}>
                    <th className="text-center">{(pageIndex - 1) * 10 + index + 1}</th>
                    <th className="" style={{ width: 450 }}>{value.name}</th>
                    <th className="text-center" style={{ width: 150 }}>
                        <span className={`badge badge-pill ${showPositionSpan(value.status)} span`}>
                            {showPositionStatus(value.status)}
                        </span>
                    </th>
                    <th className="text-primary text-center">
                        <a style={{ cursor: 'pointer' }} onClick={() => this.onUpdate(value.posID)} >Update</a>
                    </th>
                    <th className="text-primary text-center">
                        <a style={{ cursor: 'pointer' }} onClick={() => this.onChangeStatus(value.posID, value.name)}>Change Status</a>
                    </th>
                </tr>
            )
        })
        return result
    }

    onHandle = () => {
        history.push('/position/create')
    }

    searchPos = (value) => {
        this.setState({ search: value })
        this.props.fetchPosittion(this.state.page, value)
    }

    onSelectPage = (e) => {
        this.setState({ page: e })
        this.props.fetchPosittion(e, this.state.search)
    }

    render() {
        var { item } = this.props
        return (
            <React.Fragment>
                <ol class="breadcrumb mb-4 mt-3">
                    <li class="breadcrumb-item active">Positions</li>
                </ol>
                <div className="container-fluid">
                    <div class="card mb-4">
                        <div class="card-header">
                            <i class="fas fa-table mr-1"></i>Positions
                        </div>
                        <div className="card-body">
                            {this.state.isLoading ?
                                <div className="row justify-content-center">
                                    <Spin className="text-center" size="large" />
                                </div>
                                : <>
                                    <div className="row mb-3">
                                        <button type="button" className="btn btn-primary"
                                            style={{ fontWeight: 700, borderRadius: 5, marginLeft: 20, marginTop: 10, }} onClick={this.onHandle}>
                                            <div className="row" style={{ paddingLeft: 7, paddingRight: 7 }}>
                                                <i className="material-icons">add_box</i>New Position
                                        </div>
                                        </button>
                                        <Search search="Position"
                                            refresh={item.isRefresh}
                                            placeholder="Search position name ..."
                                            searchPos={this.searchPos} />
                                    </div>
                                    {item.items.length > 0 ?
                                        <div className="table-responsive">
                                            <table className="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                                                <thead className="font-weight-bold text-center text-primary">
                                                    <tr>
                                                        <th width={40}>No</th>
                                                        <th>Position</th>
                                                        <th width={50}>Status</th>
                                                        <th width={100}></th>
                                                        <th width={150}></th>
                                                    </tr>
                                                </thead>
                                                <tbody>{this.onShowListPosition(item.items, item.pageIndex)}</tbody>
                                            </table>
                                        </div>
                                        :
                                        <div className='row justify-content-center'>
                                            <h4 style={{ fontStyle: 'italic', color: 'gray' }} >{POSITION.NO_POSITION}</h4>
                                        </div>
                                    }
                                    {item.pageCount <= 1 ? ""
                                        :
                                        <div className="row justify-content-center" style={{ marginBottom: 20 }}>
                                            <Pagination defaultCurrent={item.pageIndex} total={item.totalRecords} onChange={this.onSelectPage} />
                                        </div>
                                    }
                                </>}
                        </div>
                    </div>
                </div>
                <style jsx global>
                    {`.ant-select-selector {visibility: hidden;}`}
                </style>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        item: state.PositionReducer,
        error: state.ChangeStatusErrorReducer,
        status: state.StatusReducer
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
        changeStatus: (posID) => {
            dispatch(changeStatusPosition(posID))
        },
        refreshError: () => {
            dispatch(refreshPage())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Position);