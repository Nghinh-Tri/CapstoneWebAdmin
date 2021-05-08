import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getRole, getUserName, showRole } from '../../service/util/util';
import { logout } from "../../service/action/AuthenticateAction"
import { pushToProfilePage } from '../../service/action/ProfileAction';
import { Badge, notification } from 'antd';
import { CaretDownOutlined } from "@ant-design/icons";
import { history } from '../../service/helper/History';
import firebase from "../../service/firebase/firebase";

class Header extends Component {

    componentDidUpdate = (prevProp) => {
        if (prevProp.newest !== this.props.newest) {
            notification.destroy()
            var { newest } = this.props
            if (typeof newest.title !== 'undefined' && typeof newest.body !== 'undefined')
                if (newest.title !== '' && newest.body !== '') {
                    notification.info({
                        message: newest.title,
                        description: newest.body,
                        duration: 0,
                        placement: 'bottomRight',
                        onClick: () => {
                            this.props.onSeenNoti(newest.id, newest.status, 'single')
                        }
                    })
                }
        }
    }

    onSeen = (id, status) => {
        this.props.onSeenNoti(id, status, 'all')
    }

    showNotificate = () => {
        var { notiList } = this.props
        var result = null
        result = notiList.map((noti, index) => {
            return (
                <a class="dropdown-item" key={index} onClick={() => this.onSeen(noti.id, noti.status)} >
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                        {noti.status ?
                            <div className='col-1'>
                                <Badge dot />
                            </div>
                            : <div className='col-1'></div>}
                        <div >
                            <div style={{ fontWeight: 600,  }} >{noti.title}</div>
                            <div style={{ }}>{noti.body}</div>
                        </div>
                    </div>
                </a>
            )
        })
        return result
    }

    logout = () => {
        this.props.logout()
    }

    profile = () => {
        this.props.profile()
    }

    render() {
        return (
            <nav class="sb-topnav navbar navbar-expand navbar-dark bg-dark">
                <a class="navbar-brand" href="">Human Resources</a>
                <ul class="navbar-nav ml-auto">
                    {/* Notification */}
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" data-toggle="dropdown">
                            <Badge count={this.props.number} size='small' offset={[20, -20]}></Badge>
                            <i class="fas fa-bell"></i>
                        </a>
                        <div class="dropdown-menu dropdown-menu-right" aria-labelledby="userDropdown" 
                        style={{overflow:'auto', maxHeight:600}} >
                            {this.showNotificate()}
                        </div>
                    </li>

                    {/* Profile */}
                    <li class="nav-item dropdown ">
                        <div style={{ display: 'flex', flexDirection: 'row' }} data-toggle="dropdown">
                            <a class="nav-link "  >
                                <i class="fas fa-user fa-fw"></i>
                            </a>
                            <div style={{ color: 'white' }} >
                                {getUserName()}<br />
                                {showRole(getRole())}
                            </div>
                            <div>
                                <CaretDownOutlined style={{ color: 'white', marginTop: 13 }} />
                            </div>
                        </div>
                        <div class="dropdown-menu dropdown-menu-right" aria-labelledby="userDropdown">
                            <a class="dropdown-item" onClick={this.profile}>Profile</a>
                            <div class="dropdown-divider"></div>
                            <a class="dropdown-item" onClick={this.logout}>Logout</a>
                        </div>
                    </li>
                </ul>
            </nav>
        );
    }
}

const mapDispatchToProp = dispatch => {
    return {
        logout: () => {
            dispatch(logout())
        },
        profile: () => {
            dispatch(pushToProfilePage())
        }
    }
}

export default connect(null, mapDispatchToProp)(Header);