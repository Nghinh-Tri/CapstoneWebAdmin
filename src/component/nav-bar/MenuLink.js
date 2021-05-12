import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import { fetchCertificationPaging } from '../../service/action/certificate/CertificationSelectBarAction';
import { fetchPostionListPaging } from '../../service/action/position/PositionSelectBarAction';
import { fetchProject } from '../../service/action/project/ProjectAction';
import { fetchSkill } from '../../service/action/skill/SkillAction';
import { fetchProfile } from '../../service/action/user/ProfileAction';
import { history } from "../../service/helper/History";
class MenuLink extends Component {

    onMovePage = () => {
        history.push(this.props.to)

        switch (this.props.to) {
            case '/project':
                this.props.fetchProjectList()
                break;
            case '/employee':
                this.props.fetchEmployeeList()
                break
            case '/position':
                this.props.fetchPosittionList()
                break;
            case '/skill':
                this.props.fetchSkillsList()
                break;
            case '/certification':
                this.props.fetchCertificationsList()
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
            dispatch(fetchProject(1, '', true))
        },
        fetchEmployeeList: () => {
            dispatch(fetchProfile(1, '', 'Employee', true))
        },
        fetchPosittionList: () => {
            dispatch(fetchPostionListPaging(1, '', true))
        },
        fetchSkillsList: () => {
            dispatch(fetchSkill(1, '', 0, true))
        },
        fetchCertificationsList: () => {
            dispatch(fetchCertificationPaging(1, '', true))
        },
    }
}

export default connect(null, mapDispatchToProp)(MenuLink);