import React, { Component } from 'react';
import { connect } from 'react-redux';
import PositionTable from '../../component/profile/PositionTable';
import ProfileTable from '../../component/profile/ProfileTable';
import { checkSession } from '../../service/action/user/AuthenticateAction';
import { fetchProfileDetail } from '../../service/action/user/ProfileAction';
import { Tabs } from 'antd';
import SuitableProject from '../../component/profile/SuitableProject';
import JoinedProject from '../../component/profile/joined-project/JoinedProject';
import { refeshTab, selectTab } from '../../service/action/user/SelectProfileBarAction';
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
        if (typeof this.props.match !== 'undefined') {
            this.props.fetchProfileDetails(this.props.match.params.id)
        } else {
            this.props.refreshSelectTab()
        }
    }

    componentDidUpdate = (prevProp) => {
        if (prevProp.profile !== this.props.profile) {
            if (this.props.profile.roleName !== 'Employee') {
                this.props.selectTab(parseInt('1'))
            }
        }
    }

    onClickMenu = (value) => {
        this.props.selectTab(parseInt(value))
    }

    showDetail = (select) => {
        var { profile } = this.props
        var empID = ''
        if (typeof this.props.empID !== 'undefined')
            empID = this.props.empID
        else
            empID = this.props.match.params.id
        if (select === 1)
            return <ProfileTable empID={empID} />
        if (select === 2)
            return <PositionTable empID={empID} role={profile.roleName}
                name={profile.name} email={profile.email} phone={profile.phoneNumber} />
        if (select === 3)
            return <SuitableProject empID={empID} />
        if (select === 4)
            return <JoinedProject empID={empID} />
    }


    render() {
        var { profile, selectIndex } = this.props
        return (
            <React.Fragment>
                <div className="row breadcrumb mb-4 mt-3">
                    <div className='col'>
                        <li className="breadcrumb-item active" style={{ fontWeight: 600 }}>{profile.name}</li>
                    </div>
                    <div className='col'>
                        <li className="breadcrumb-item active" style={{ fontWeight: 600 }}>Phone: {profile.phoneNumber}</li>
                    </div>
                    <div className='col'>
                        <li className="breadcrumb-item active" style={{ fontWeight: 600 }}>Email: {profile.email}</li>
                    </div>
                </div>
                <div className="card mb-4">
                    <div className="card-header">
                        <Tabs defaultActiveKey={selectIndex.toString()} activeKey={selectIndex.toString()} onChange={this.onClickMenu}>
                            <TabPane tab="Personal Infomation" key='1'></TabPane>
                            {
                                typeof this.props.match !== 'undefined' ?
                                    profile.roleName === 'Employee' ?
                                        <>
                                            <TabPane tab="Skill Details" key='2'></TabPane>
                                            <TabPane tab="Suitable Projects" key='3'></TabPane>
                                            <TabPane tab="Projects" key='4'></TabPane>
                                        </>
                                        : ''
                                    : ''
                            }
                        </Tabs>
                    </div>
                    <div className="card-body">
                        {this.showDetail(selectIndex)}
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProp = state => {
    return {
        profile: state.ProfileReducer,
        selectIndex: state.SelectProfileBarReducer
    }
}

const mapDispatchToProp = (dispatch) => {
    return {
        fetchProfileDetails: (empID) => {
            dispatch(fetchProfileDetail(empID))
        },
        checkSession: () => {
            dispatch(checkSession())
        },
        selectTab: (tab) => {
            dispatch(selectTab(tab))
        },
        refreshSelectTab: () => {
            dispatch(refeshTab())
        }
    }
}

export default connect(mapStateToProp, mapDispatchToProp)(Profile);