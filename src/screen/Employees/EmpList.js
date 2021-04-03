import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as Action from "../../service/action/ProfileAction";
import EmpTableItem from "./EmpTableItem";
import { checkSession } from '../../service/action/AuthenticateAction';


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
            page: 1
        }
    }

    componentDidMount = () => {
        this.props.checkSession()
        this.props.fetchProfile(this.state.page)
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
            this.props.fetchProfile(profiles.pageIndex + 1)
    }

    onPrevios = () => {
        var { profiles } = this.props
        if (profiles.pageIndex > 1)
            this.props.fetchProfile(profiles.pageIndex - 1)
    }

    render() {
        var { profiles } = this.props
        return (
            <div className="container-fluid">

                <button type="button" className="btn btn-primary"
                    style={{ fontWeight: 700, borderRadius: 5, marginLeft: 10, }}
                    onClick={() => this.onGenerateProfile(profiles.isCreateNew)} >
                    <i className="material-icons mr-5">add_box</i>
                        Create New User
                </button>

                <div className="row">
                    <div className="card mb-80">
                        <div className="card-body">
                            <div className="form-group">
                                <div className="row">
                                    <div className="card-body">
                                        <div className="table-responsive">
                                            <table className="table">
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
                                                <tbody>
                                                    {this.onShowListProfile(profiles.items)}
                                                </tbody>
                                            </table>
                                        </div>
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
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div >
                </div>
            </div>
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
        fetchProfile: (pageIndex) => {
            dispatch(Action.fetchProfile(pageIndex))
        },
        checkSession: () => {
            dispatch(checkSession())
        }
    }
}
export default connect(mapStateToProp, mapDispatchToProp)(EmpList);