import React, { Component } from 'react';
import Notification from './notification/Notification';
import Profile from './profile/Profile';
import Search from './search/Search';

class NavBarContent extends Component {
    render() {
        return (
            <div className="collapse navbar-collapse justify-content-end">
                <Search />
                <ul className="navbar-nav">
                    <Notification />
                    <Profile />
                </ul>
            </div>

        );
    }
}

export default NavBarContent;