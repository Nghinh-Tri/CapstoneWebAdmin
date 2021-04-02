import React, { Component } from 'react';
import NotificationItems from './notification-items/NotificationItems';

class Notification extends Component {
    render() {
        return (
            <li className="nav-item dropdown">
                <a className="nav-link" href="http://example.com" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <i className="material-icons" style={{fontSize:30}}>notifications</i>
                    <span className="notification">5</span>                   
                </a>
                <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdownMenuLink">
                    <NotificationItems content="content" />
                </div>
            </li>
        );
    }
}

export default Notification;