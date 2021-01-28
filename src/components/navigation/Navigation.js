import React, { Component } from 'react';
import NavigationItems from './navigation-items/NavigationItems';

class Navigation extends Component {
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
                        <NavigationItems icon='dashboard' name='Dashboard' active='active' />
                        <NavigationItems icon='content_paste' name='Project' active='' />
                        <NavigationItems icon='person' name='Profile' active='' />
                    </ul>
                </div>
            </div>
        );
    }
}

export default Navigation;