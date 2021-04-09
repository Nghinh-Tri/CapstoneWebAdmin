import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUserName } from '../../service/util/util';
import { logout } from "../../service/action/AuthenticateAction"
import { pushToProfilePage } from '../../service/action/ProfileAction';

class Header extends Component {

    logout = () => {
        this.props.logout()
    }

    profile = () => {
        this.props.profile()
    }

    render() {
        return (
            <nav class="sb-topnav navbar navbar-expand navbar-dark bg-dark">
                <a class="navbar-brand" href="index.html">Web Service</a>
                <ul class="navbar-nav ml-auto " >
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <p style={{ float: 'right', fontSize: 16, marginLeft: 15, }}>{getUserName()} </p>
                            <i class="fas fa-user fa-fw"></i>
                        </a>
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