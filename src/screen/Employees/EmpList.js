import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as Action from "../../service/action/ProfileAction";
import EmpTableItem from "./EmpTableItem";
import { checkSession } from '../../service/action/AuthenticateAction';
import Search from '../../component/search/Search';
import { Spin } from 'antd';


class EmpList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            profile: {
                name: '',
                phoneNumber: '',
                userName: '',
                email: '',
                identityNumber: '',
                address: '',
                roles: ''
            },
            page: 1,
            search: '',
            isLoading: true
        }
    }

    componentDidMount = () => {
        this.props.checkSession()
        this.props.fetchProfile(this.state.page, this.state.search)
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.profiles !== prevState.profiles) {
            return { someState: nextProps.profiles };
        }
        return null;
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.profiles !== this.props.profiles) {
            if (typeof this.props.profiles.items !== 'undefined') {
                this.setState({ isLoading: false })
            }
        }
    }

    onGenerateProfile = (isCreateNew) => {
        this.props.generateProfile(this.state.profile, isCreateNew)
        localStorage.setItem("empID", 0)
    }


    onShowListProfile = (profileList) => {
        var result = null
        if (typeof profileList !== 'undefined') {
            result = profileList.map((profile, index) => {
                return (<EmpTableItem key={index} profile={profile} index={index} />);
            })
        }
        return result
    }

    onNext = () => {
        var { profiles } = this.props
        if (profiles.pageIndex < profiles.pageCount)
            this.props.fetchProfile(profiles.pageIndex + 1, this.state.search)
    }

    onPrevios = () => {
        var { profiles } = this.props
        if (profiles.pageIndex > 1)
            this.props.fetchProfile(profiles.pageIndex - 1, this.state.search)
    }

    searchEmp = (value) => {
        this.setState({ search: value })
        this.props.fetchProfile(1, value)
    }

    render() {
        var { profiles } = this.props
        return (
            <React.Fragment>
                <ol class="breadcrumb mb-4 mt-3">
                    <li class="breadcrumb-item active">Projects</li>
                </ol>
                <div className="container-fluid">

                    <button type="button" className="btn btn-primary"
                        style={{ fontWeight: 700, borderRadius: 5, marginLeft: 10, marginBottom: 15 }}
                        onClick={() => this.onGenerateProfile(profiles.isCreateNew)} >
                        <div className='row' style={{ paddingLeft: 7, paddingRight: 7 }}>
                            <i className="material-icons">add_box</i>Create New EMP
                            </div>
                    </button>


                    <div class="card mb-4">
                        <div class="card-header">
                            <i class="fas fa-table mr-1"></i>
                    List Emp
                </div>

                        <div className="card-body">

                            {this.state.isLoading ? '' :
                                <div className="row mb-3">
                                    <Search search="Employee"
                                        placeholder="Search employee name ..."
                                        searchEmp={this.searchEmp} />
                                </div>
                            }
                            <div class="table-responsive">
                                <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                                    <thead className=" text-primary">
                                        <tr>
                                            <th className="font-weight-bold text-center">No</th>
                                            <th className="font-weight-bold ">Name</th>
                                            <th className="font-weight-bold ">Phone</th>
                                            <th className="font-weight-bold ">Email</th>
                                            <th className="font-weight-bold ">User Name</th>
                                            <th className="font-weight-bold ">Role</th>
                                            <th className="font-weight-bold "></th>
                                        </tr>
                                    </thead>
                                    {this.state.isLoading ?
                                        ''
                                        :
                                        <tbody>
                                            {this.onShowListProfile(profiles.items)}
                                        </tbody>
                                    }
                                </table>
                            </div>
                            {this.state.isLoading ?
                                <div className='row justify-content-center'>
                                    <Spin className='text-center' size="large" />
                                </div>
                                : ''}
                            {this.state.isLoading ? ''
                                :
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
                                            {profiles.pageIndex} - {profiles.pageCount}
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
                            }

                        </div>
                    </div>
                </div>
            </React.Fragment >

        );
    }
}

const mapStateToProp = state => {
    return {
        profiles: state.ProfileFetchReducer
    }
}

const mapDispatchToProp = (dispatch) => {
    return {
        generateProfile: (profile, isCreateNew) => {
            dispatch(Action.generateProfile(profile, isCreateNew))
        },
        fetchProfile: (pageIndex, search) => {
            dispatch(Action.fetchProfile(pageIndex, search))
        },
        checkSession: () => {
            dispatch(checkSession())
        }
    }
}
export default connect(mapStateToProp, mapDispatchToProp)(EmpList);