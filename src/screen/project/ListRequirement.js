import {  Tabs, Tooltip } from 'antd';
import React, { Component } from 'react';
import { InfoCircleTwoTone } from "@ant-design/icons";
import ListEmployeeContent from './ListEmployeeContent';
const TabPane = Tabs.TabPane

class ListRequirement extends Component {

    state = { select: "0" }    

    componentWillReceiveProps = () => {
        this.setState({ select: "0" })
    }

    getTabName = () => {
        var { item } = this.props;        
        var result = item.requirements.map((require, index) => {
            return (
                <TabPane
                    tab={
                        <>
                            <Tooltip title={require.missingEmployee !== 0 ? 'This requirement is missing employees' : ''} >
                                <span>Require {index + 1} </span>
                                {require.missingEmployee? (
                                    <InfoCircleTwoTone twoToneColor="#FF0000"
                                        style={{ fontSize: "16px" }} />
                                ) : ("")}
                            </Tooltip>
                        </>
                    }
                    key={index.toString()}                  
                ></TabPane>
            )
        });
        return result;
    };

    onSelectPos = (value) => {
        this.setState({ select: (value) })
    }

    render() {
        var { item } = this.props
        return (
            <div className="card mb-4">
                <div className="card-header">
                    <Tabs defaultActiveKey="0" onChange={this.onSelectPos}>
                        {this.getTabName()}
                    </Tabs>
                </div>
                <div className="card-body">
                    <ListEmployeeContent item={item.requirements[parseInt(this.state.select)]} project={this.props.project} />
                </div>

            </div>
        );
    }
}

export default ListRequirement