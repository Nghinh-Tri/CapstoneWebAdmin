import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import PositionTable from '../../component/profile/PositionTable';
import ProfileTable from '../../component/profile/ProfileTable';
import { checkSession } from '../../service/action/AuthenticateAction';
import { fetchProfileDetail } from '../../service/action/ProfileAction';
import { Tabs } from 'antd';
const TabPane = Tabs.TabPane;

class Profile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            select: 1
        }
    }

    componentDidMount = () => {
        this.props.checkSession()
        if (typeof this.props.match !== 'undefined')
            this.props.fetchProfileDetails(this.props.match.params.id)
    }

    onClickMenu = (value) => {
        this.setState({ select: parseInt(value) })
    }

    showDetail = (select) => {
        var { profile } = this.props
        var empID = ''
        if (typeof this.props.empID !== 'undefined')
            empID = this.props.empID
        else
            empID = this.props.match.params.id

            console.log(profile)
        if (select === 1)
            return <ProfileTable empID={empID} />
        if (select === 2)
            return <PositionTable empID={empID} role={profile.roleName} />
    }


    render() {
        // var empID = ''
        var { select } = this.state
        // var { profile } = this.props
        // if (typeof this.props.empID !== 'undefined')
        //     empID = this.props.empID
        // else
        //     empID = this.props.match.params.id


        return (
            <React.Fragment>

                <ol class="breadcrumb mb-4 mt-3">
                    <li class="breadcrumb-item active">ProFile Detail</li>
                </ol>
                <div class="card mb-4">
                    <div class="card-header">
                        <Tabs defaultActiveKey="1" onChange={this.onClickMenu}>
                            <TabPane tab="Personal Infomation" key={1}></TabPane>
                            <TabPane tab="Position Detail" key={2}></TabPane>
                        </Tabs>
                    </div>
                    <div class="card-body">
                        {this.showDetail(select)}
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProp = state => {
    return {
        profile: state.ProfileFetchReducer
    }
}

const mapDispatchToProp = (dispatch) => {
    return {
        fetchProfileDetails: (empID) => {
            dispatch(fetchProfileDetail(empID))
        },
        checkSession: () => {
            dispatch(checkSession())
        }
    }
}

export default connect(mapStateToProp, mapDispatchToProp)(Profile);