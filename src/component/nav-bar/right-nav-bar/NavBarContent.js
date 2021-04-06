import React, { Component } from 'react';
import Profile from './profile/Profile';

class NavBarContent extends Component {
    render() {
        return (
            <div className="collapse navbar-collapse justify-content-end">
                <ul className="navbar-nav">
                    <Profile />
                </ul>
            </div>

        );
    }
}

export default NavBarContent;