import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from "../../../../service/action/AuthenticateAction";

class Profile extends Component {

    logout = () => {
        this.props.logout()
    }

    render() {
        return (
            <li className="nav-item dropdown">
                <a className="nav-link" id="navbarDropdownProfile" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <i className="material-icons">person</i>
                    <p className="d-lg-none d-md-block">Account</p>
                </a>
                <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdownProfile">
                    <a className="dropdown-item" >Profile</a>
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
        }
    }
}

export default connect(null, mapDispatchToProp)(Profile);