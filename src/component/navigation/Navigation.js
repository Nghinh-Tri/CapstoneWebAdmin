import React, { Component } from 'react';
import NavigationList from "./NavigationList";
import MenuLink from './MenuLink';

class Navigation extends Component {

    showMenu = () => {
        var result = null;
        if (NavigationList.length > 0) {
            result = NavigationList.map((menu, index) => {
                return (
                    <MenuLink key={index} label={menu.name} icon={menu.icon} to={menu.path} activeOnlyWhenExace={menu.exact} />
                );
            });
        }
        return result;
    }

    render() {
        return (
            <div className="sidebar" data-color="purple" data-background-color="white" >
                <div className="logo">
                    <div className="simple-text logo-normal">
                        ESMS
                </div>
                </div>
                <div className="sidebar-wrapper">
                    <ul className="nav">
                        {this.showMenu()}
                    </ul>
                </div>
            </div>
        );
    }
}

export default Navigation;