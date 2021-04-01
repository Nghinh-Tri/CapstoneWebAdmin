import { Input } from 'antd';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { checkSession } from '../../service/action/AuthenticateAction';
import { fetchProfileDetail } from '../../service/action/ProfileAction';

class ProfileTable extends Component {

    componentDidMount = () => {
        this.props.checkSession()
        this.props.fetchProfileDetails(this.props.empID)
    }

    render() {
        var { profile } = this.props
        console.log(profile)
        return (
            <div className="card">
                <div className="card-header card-header-primary">
                    <h4 className="card-title">Employee Detail</h4>
                </div>
                <div className="card-body">
                    <div className="form-group">

                        {/* Name */}
                        <div className="row">
                            <div className="col-auto">
                                <label className="bmd-label">
                                    <h4 className="font-weight-bold">Name : </h4>
                                </label>
                            </div>
                            <div className="col" style={{ marginLeft: 100, marginTop: -15, width: 250 }}>
                                <Input className="form-group" value={profile.name} disabled="true" 
                                style={{ color: "black", cursor: 'default', fontWeight: 400, fontSize: 18, border: 'none', backgroundColor: 'white' }} />
                            </div>
                        </div>

                        {/* Address */}
                        <div className="row">
                            <div className="col-auto">
                                <label className="bmd-label">
                                    <h4 className="font-weight-bold">Address : </h4>
                                </label>
                            </div>
                            <div className="col" style={{ marginLeft: 80, marginTop: -15, width: 250 }}>
                                <Input className="form-group" value={profile.address} disabled="true" 
                                style={{ color: "black", cursor: 'default', fontWeight: 400, fontSize: 18, border: 'none', backgroundColor: 'white' }} />
                            </div>
                        </div>

                        {/* Phone */}
                        <div className="row">
                            <div className="col-auto">
                                <label className="bmd-label">
                                    <h4 className="font-weight-bold">Phone : </h4>
                                </label>
                            </div>
                            <div className="col" style={{ marginLeft: 95, marginTop: -15, width: 250 }}>
                                <Input className="form-group" value={profile.phoneNumber} disabled="true" 
                                style={{ color: "black", cursor: 'default', fontWeight: 400, fontSize: 18, border: 'none', backgroundColor: 'white' }} />
                            </div>
                        </div>

                        {/* Email */}
                        <div className="row">
                            <div className="col-auto">
                                <label className="bmd-label">
                                    <h4 className="font-weight-bold">Email : </h4>
                                </label>
                            </div>
                            <div className="col" style={{ marginLeft: 100, marginTop: -15, width: 250 }}>
                                <Input className="form-group" value={profile.email} disabled="true" 
                                style={{ color: "black", cursor: 'default', fontWeight: 400, fontSize: 18, border: 'none', backgroundColor: 'white' }} />
                            </div>
                        </div>

                        {/* Username */}
                        <div className="row">
                            <div className="col-auto">
                                <label className="bmd-label">
                                    <h4 className="font-weight-bold">Username : </h4>
                                </label>
                            </div>
                            <div className="col" style={{ marginLeft: 62, marginTop: -15, width: 250 }}>
                                <Input className="form-group" value={profile.userName} disabled="true" 
                                style={{ color: "black", cursor: 'default', fontWeight: 400, fontSize: 18, border: 'none', backgroundColor: 'white' }} />
                            </div>
                        </div>

                        {/* CMND */}
                        <div className="row">
                            <div className="col-auto">
                                <label className="bmd-label">
                                    <h4 className="font-weight-bold">Indentity Number : </h4>
                                </label>
                            </div>
                            <div className="col" style={{ marginLeft: 5, marginTop: -15, width: 250 }}>
                                <Input className="form-group" value={profile.identityNumber} disabled="true" 
                                style={{ color: "black", cursor: 'default', fontWeight: 400, fontSize: 18, border: 'none', backgroundColor: 'white' }} />
                            </div>
                        </div>

                        {/* Role */}
                        <div className="row">
                            <div className="col-auto">
                                <label className="bmd-label">
                                    <h4 className="font-weight-bold">Role : </h4>
                                </label>
                            </div>
                            <div className="col" style={{marginLeft:109, marginTop: -15, width: 250 }}>
                                <Input className="form-group" value={profile.identityNumber} disabled="true" 
                                style={{ color: "black", cursor: 'default', fontWeight: 400, fontSize: 18, border: 'none', backgroundColor: 'white' }} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProp = state => {
    return {
        profile: state.ProfileFetchReducer
    }
}

const mapDispatchToProp = (dispatch) => {
    return {
        fetchProfileDetails: (empID) => {
            dispatch(fetchProfileDetail(empID))
        },
        checkSession: () => {
            dispatch(checkSession())
        }
    }
}

export default connect(mapStateToProp, mapDispatchToProp)(ProfileTable);