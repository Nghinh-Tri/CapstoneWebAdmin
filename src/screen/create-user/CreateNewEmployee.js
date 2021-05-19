import { Tabs } from 'antd';
import React, { Component } from 'react';
import ImportCV from './ImportCV';
import Register from './Register';
const TabPane = Tabs.TabPane

class CreateNewEmployee extends Component {

    state = { select: '1' }

    onClickMenu = (value) => {
        this.setState({ select: value })
    }

    showDetail = (select) => {
        if (select === '1') {
            return (<Register />)
        } else if (select === '2') {
            return (<ImportCV />)
        }
    }

    render() {
        var { select } = this.state
        return (
            <React.Fragment>
                <div className="card mb-4">
                    <div className="card-header">
                        <Tabs defaultActiveKey={this.state.select.toString()} onChange={this.onClickMenu}>
                            <TabPane tab="Personal Infomation" key='1'></TabPane>
                            <TabPane tab="Import CV File" key='2'></TabPane>
                        </Tabs>
                    </div>
                    <div className="card-body">
                        {this.showDetail(select)}
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default CreateNewEmployee;