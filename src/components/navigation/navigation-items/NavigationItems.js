import React, { Component } from 'react';

class NavigationItems extends Component {
    render() {
        return (
            <li className={`nav-item ${this.props.active}`}>
                <a className="nav-link">
                    <i className="material-icons">{this.props.icon}</i>
                    <p>{this.props.name}</p>
                </a>
            </li>
        );
    }
}

export default NavigationItems;