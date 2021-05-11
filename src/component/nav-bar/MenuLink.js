import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import { fetchProject } from '../../service/action/project/ProjectAction';
import { history } from "../../service/helper/History";
class MenuLink extends Component {

    onMovePage = () => {
        history.push(this.props.to)

        switch (this.props.to) {
            case '/project':
                this.props.fetchProjectList()
                break;

            default:
                break;
        }
    }

    render() {
        return (
            <Route path={this.props.to} exact={this.props.activeOnlyWhenExace} children={({ match }) => {
                var active = match ? 'active' : '';
                return (
                    <li className="nav-item" onClick={this.onMovePage}>
                        <div class="sb-sidenav-menu-heading"></div>
                        <a class={`nav-link ${active}`} style={{ fontSize: 17 }} >{this.props.label}</a>
                    </li>
                );
            }} />
        );
    }
}

const mapDispatchToProp = (dispatch) => {
    return {
        fetchProjectList: () => {
            dispatch(fetchProject(1, ''))
        }
    }
}

export default connect(null, mapDispatchToProp)(MenuLink);