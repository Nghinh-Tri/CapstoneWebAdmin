import React, { Component } from 'react';

class NotificationItems extends Component {
    render() {
        return (
            <a className="dropdown-item" href="#">{this.props.content}</a>
        );
    }
}

export default NotificationItems;