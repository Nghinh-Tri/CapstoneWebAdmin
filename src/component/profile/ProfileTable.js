import { Input, Spin } from 'antd';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { checkSession } from '../../service/action/user/AuthenticateAction';
import { fetchProfileDetail } from '../../service/action/user/ProfileAction';
import { history } from '../../service/helper/History';
import { showRole } from '../../service/util/util';
import { Button, Descriptions } from 'antd';
import { compose } from 'redux';
import { withRouter } from 'react-router';
import { DownloadOutlined } from "@ant-design/icons";
import { downloadCVFile } from "../../service/action/import-file/ImportAction";

class ProfileTable extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoad: true
        }
    }

    componentDidMount = () => {
        this.props.checkSession()
        this.props.fetchProfileDetails(this.props.empID)
    }

    componentDidUpdate = (prevProp) => {
        if (prevProp.profile !== this.props.profile) {
            this.setState({ isLoad: false })
        }
    }

    onUpdate = () => {
        history.push(`/employee/update-profile/${this.props.empID}`)
    }

    onMoveToChangePassword = () => {
        history.push('/profile/change-password')
    }

    onDownload = () => {
        this.props.downloadCV(this.props.profile.id)
    }

    render() {
        var { profile } = this.props
        return (
            <React.Fragment>
                {this.state.isLoad ?
                    <div className='row justify-content-center'>
                        <Spin className='text-center' size="large" />
                    </div>
                    :
                    <div className="card">
                        <div className="card-body">
                            <div className="form-group">
                                <Descriptions title="Profile Info" layout='horizontal' bordered
                                    extra={
                                        this.props.match.path.includes('profile/') ?
                                            <>
                                                <Button onClick={this.onDownload} type="link" icon={<DownloadOutlined />} >Donwload CV File</Button>
                                                <Button onClick={this.onUpdate} type="primary" >Edit</Button>
                                            </>
                                            :
                                            <Button onClick={this.onMoveToChangePassword} type="primary">Change Password</Button>
                                    }>

                                    <Descriptions.Item span={3} label="Name">
                                        <Input className="form-group" value={profile.name} disabled="true"
                                            style={{ color: "black", cursor: 'default', fontWeight: 400, fontSize: 18, border: 'none', backgroundColor: 'white' }} /></Descriptions.Item>

                                    <Descriptions.Item span={3} label="Address">
                                        <Input className="form-group" value={profile.address} disabled="true"
                                            style={{ color: "black", cursor: 'default', fontWeight: 400, fontSize: 18, border: 'none', backgroundColor: 'white' }} />
                                    </Descriptions.Item>
                                    <Descriptions.Item span={3} label="Identity Number">
                                        <Input className="form-group" value={profile.identityNumber} disabled="true"
                                            style={{ color: "black", cursor: 'default', fontWeight: 400, fontSize: 18, border: 'none', backgroundColor: 'white' }} />
                                    </Descriptions.Item>

                                    <Descriptions.Item span={3} label="Email">
                                        <Input className="form-group" value={profile.email} disabled="true"
                                            style={{ color: "black", cursor: 'default', fontWeight: 400, fontSize: 18, border: 'none', backgroundColor: 'white' }} />
                                    </Descriptions.Item>

                                    <Descriptions.Item span={3} label="Phone">
                                        <Input className="form-group" value={profile.phoneNumber} disabled="true"
                                            style={{ color: "black", cursor: 'default', fontWeight: 400, fontSize: 18, border: 'none', backgroundColor: 'white' }} />
                                    </Descriptions.Item>

                                    <Descriptions.Item span={3} label="Role">  <Input className="form-group" value={showRole(profile.roleName)} disabled="true"
                                        style={{ color: "black", cursor: 'default', fontWeight: 400, fontSize: 18, border: 'none', backgroundColor: 'white' }} /></Descriptions.Item>
                                </Descriptions>
                            </div>
                        </div>
                    </div>
                }
            </React.Fragment>
        );
    }
}

const mapStateToProp = state => {
    return {
        profile: state.ProfileReducer
    }
}

const mapDispatchToProp = (dispatch) => {
    return {
        fetchProfileDetails: (empID) => {
            dispatch(fetchProfileDetail(empID))
        },
        checkSession: () => {
            dispatch(checkSession())
        },
        downloadCV: (empID) => {
            dispatch(downloadCVFile(empID))
        }
    }
}

export default compose(withRouter, connect(mapStateToProp, mapDispatchToProp))(ProfileTable);