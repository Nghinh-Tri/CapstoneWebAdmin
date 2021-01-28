import React, { Component } from 'react';
import PageTitle from './left-nav-bar/PageTitle';
import NavBarContent from './right-nav-bar/NavBarContent';

class NavBar extends Component {
    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-transparent navbar-absolute fixed-top ">
                <div className="container-fluid">
                    <PageTitle />
                    <NavBarContent />
                </div>
            </nav>
        );
    }
}

export default NavBar;