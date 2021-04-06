import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from "../../../../service/action/AuthenticateAction";
import { pushToProfilePage } from '../../../../service/action/ProfileAction';
import { getUserName } from '../../../../service/util/util';

class Profile extends Component {

    logout = () => {
        this.props.logout()
    }

    profile = () => {
        this.props.profile()
    }

    render() {
        return (
            <li className="nav-item dropdown">
                <a className="nav-link" id="navbarDropdownProfile" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <i className="material-icons" style={{ fontSize: 35 }}>person</i>
                    <p style={{ display: 'block', float: 'right', fontSize: 20, marginLeft: 15, marginTop: 5, fontWeight: 600 }}>{getUserName()}</p>
                </a>
                <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdownProfile">
                    <a className="dropdown-item" onClick={this.profile}>Profile</a>
                    <div className="dropdown-divider" />
                    <a className="dropdown-item" onClick={this.logout}>Log out</a>
                </div>
            </li>
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

export default connect(null, mapDispatchToProp)(Profile);