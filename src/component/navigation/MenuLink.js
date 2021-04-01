import React, { Component } from 'react';
import { NavLink, Route } from 'react-router-dom';
import NavigationItems from './navigation-items/NavigationItems';

class MenuLink extends Component {
    render() {
        return (
            <Route path={this.props.to} exact={this.props.activeOnlyWhenExace} children={({ match }) => {
                var active = match ? 'active' : '';               
                return (
                    <li className="nav-item">
                        <NavLink to={this.props.to} >
                            <NavigationItems icon={this.props.icon}
                                name={this.props.label}
                                active={active} />
                        </NavLink>
                    </li>
                );
            }} />
        );
    }
}

export default MenuLink;