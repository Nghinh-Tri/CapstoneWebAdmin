import React, { Component } from 'react';
import { connect } from 'react-redux';
import ProjectDetailTable from '../../component/project-detail/ProjectDetailTable';
import { checkSession } from '../../service/action/AuthenticateAction';
import { history } from '../../service/helper/History';
import ListEmployee from './ListEmployee';
import { Tabs } from 'antd';
import PositionRequire from "../../component/project-detail/PositionRequire";

const TabPane = Tabs.TabPane;

class ProjectDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            select: 1,
        }
    }

    componentDidMount = () => {
        this.props.checkSession()
    }

    onClickMenu = (value) => {
        this.setState({ select: parseInt(value) })
    }

    showDetail = (select) => {
        if (select === 1)
            return <ProjectDetailTable projectID={this.props.match.params.id} />
        if (select === 2)
            return <ListEmployee projectID={this.props.match.params.id} />
        if (select === 3)
            return <PositionRequire projectID={this.props.match.params.id} />
    }

    onBack = () => {
        history.push('/project')
    }

    render() {
        var { select } = this.state
        return (
            <React.Fragment>
                <ol class="breadcrumb mb-4 mt-3">
                    <li class="breadcrumb-item active">Projects Detail</li>
                </ol>
                <div className='card mb-4'>
                    <div class="card-header">
                        <Tabs defaultActiveKey="1" onChange={this.onClickMenu}>
                            <TabPane tab="Project Detail" key={1}></TabPane>
                            <TabPane tab="List Employee" key={2}></TabPane>
                            <TabPane tab="Position Suggestion" key={3}></TabPane>
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


const mapDispatchToProp = (dispatch) => {
    return {
        checkSession: () => {
            dispatch(checkSession())
        }
    }
}
export default connect(null, mapDispatchToProp)(ProjectDetail);