import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as Action from "../../service/action/user/ProfileAction";
import EmpTableItem from "./EmpTableItem";
import { checkSession } from '../../service/action/user/AuthenticateAction';
import Search from '../../component/search/Search';
import { Pagination, Spin } from 'antd';
import SelectBar from '../../component/create-position-form/select-search/SelectBar';
import { EMPLOYEE } from '../../service/constant/nodata';

class EmpList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            page: 1,
            search: '',
            isLoading: true,
            roleList: [
                { label: 'Project Manager', value: 'PM' },
                { label: 'Employee', value: 'Employee' },
            ],
            role: 'Employee'
        }
    }

    componentDidMount = () => {
        this.props.checkSession()
        this.props.fetchProfile(this.state.page, this.state.search, this.state.role)
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

    onShowListProfile = (profileList, pageIndex) => {
        var result = null
        if (typeof profileList !== 'undefined') {
            result = profileList.map((profile, index) => {
                return (<EmpTableItem key={index} profile={profile} index={index} pageIndex={pageIndex} />);
            })
        }
        return result
    }

    searchEmp = (value) => {
        this.setState({ search: value })
        this.props.fetchProfile(1, value, this.state.role)
    }

    onSelectPage = (e) => {
        this.props.fetchProfile(e, this.state.search, this.state.role)
    }

    onSelectRole = (role) => {
        this.setState({ role: role })
        this.props.fetchProfile(1, this.state.search, role)
    }

    render() {
        var { profiles } = this.props
        return (
            <React.Fragment>
                <ol class="breadcrumb mb-4 mt-3">
                    <li class="breadcrumb-item active">Employees</li>
                </ol>
                <div className="container-fluid">
                    <div class="card mb-4">
                        <div class="card-header">
                            <i class="fas fa-table mr-1"></i>Employees
                        </div>
                        {this.state.isLoading ?
                            <div className="row justify-content-center">
                                <Spin className="text-center" size="large" />
                            </div>
                            : (
                                <div className="card-body">
                                    <div className="row mb-3">
                                        <button type="button"
                                            className="btn btn-primary"
                                            style={{ fontWeight: 700, borderRadius: 5, marginLeft: 20, marginTop: 10, }}
                                            onClick={() => this.onGenerateProfile(profiles.isCreateNew)}
                                        >
                                            <div className="row" style={{ paddingLeft: 7, paddingRight: 7 }}>
                                                <i className="material-icons">add_box</i>New Employee
                                        </div>
                                        </button>
                                        <Search search="Employee"
                                            refresh={profiles.isRefresh}
                                            placeholder="Search employee name ..."
                                            searchEmp={this.searchEmp} />
                                    </div>

                                    {profiles.items.length > 0 ?
                                        <div class="table-responsive">
                                            <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                                                <thead className=" text-primary">
                                                    <tr>
                                                        <th width={40} className="font-weight-bold text-center"  >No</th>
                                                        <th width={300} className="font-weight-bold text-center">Name</th>
                                                        <th width={150} className="font-weight-bold text-center">Phone</th>
                                                        <th width={250} className="font-weight-bold text-center">Email</th>
                                                        <th width={180} className="font-weight-bold text-center" >User Name</th>
                                                        <th width={200} className="font-weight-bold text-center"  >
                                                            <div style={{ display: 'flex', flexDirection: 'row' }}>
                                                                <div style={{ marginTop: 10, marginRight: 10 }} > Role</div>
                                                                <div style={{}}>
                                                                    <SelectBar name='empListRole'
                                                                        type="role"
                                                                        value={this.state.role}
                                                                        placeholder='Select role'
                                                                        list={this.state.roleList}
                                                                        onSelectRole={this.onSelectRole} />
                                                                </div>
                                                            </div>
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>{this.onShowListProfile(profiles.items, profiles.pageIndex)}</tbody>
                                            </table>
                                        </div>
                                        :
                                        <div className='row justify-content-center'>
                                            <h4 style={{ fontStyle: 'italic', color: 'gray' }} >{EMPLOYEE.NO_EMPLOYEE}</h4>
                                        </div>
                                    }
                                    {profiles.pageCount <= 1 ? ("") :
                                        <div className="row justify-content-center" style={{ marginBottom: 20 }}>
                                            <Pagination current={profiles.pageIndex} total={profiles.totalRecords} onChange={this.onSelectPage} />
                                        </div>
                                    }
                                </div>
                            )}
                    </div>
                </div>
                <style jsx global>
                    {`.ant-pagination-options {visibility: hidden;}`}
                </style>
            </React.Fragment>
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
        fetchProfile: (pageIndex, search, role) => {
            dispatch(Action.fetchProfile(pageIndex, search, role))
        },
        checkSession: () => {
            dispatch(checkSession())
        }
    }
}
export default connect(mapStateToProp, mapDispatchToProp)(EmpList);