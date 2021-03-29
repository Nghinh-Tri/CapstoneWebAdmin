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
            case "create-project":
                return "Create Project"
            case "create-position":
                return "Create Position"
            case "suggest-candidate":
                return "Suggest Candidate"
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
                        <a className="navbar-brand" backgound='white' >{this.showTitle(this.props.location.pathname)}</a>
                        <NavBarContent />
                    </div>
                </div>
            </nav>
        );
    }
}

export default withRouter(NavBar);