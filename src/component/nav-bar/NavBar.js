import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import NavBarContent from "./right-nav-bar/NavBarContent";

class NavBar extends Component {

    showTitle = pathname => {
        var path = pathname.split('/')
        var page = path[path.length - 1]
        switch (page) {
            case "":
                return "Dashboard"
            case "project":
                return "Project"
            case "employee":
                return "Employee"
            case "position":
                return "Position"
            case "skill":
                return "Skill"
            case "certification":
                return "Certification"            
            case "profile":
                return "Profile"
            case "notification":
                return "Notification"
            default:
                break;
        }
    }

    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-transparent navbar-absolute fixed-top ">
                <div className="container-fluid">
                    <div className="navbar-wrapper">
                        <a className="navbar-brand" backgound='white' style={{ fontSize: 30, fontWeight: 600 }} >{this.showTitle(this.props.location.pathname)}</a>
                    </div>
                    <NavBarContent />
                </div>
            </nav>
        );
    }
}

export default withRouter(NavBar);