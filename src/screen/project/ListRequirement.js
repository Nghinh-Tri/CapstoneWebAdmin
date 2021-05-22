import { Tabs, Tooltip } from 'antd';
import React, { Component } from 'react';
import { InfoCircleTwoTone } from "@ant-design/icons";
import ListEmployeeContent from './ListEmployeeContent';
import { selectRequirement } from '../../service/action/tab-select/EmployeeListRequirementAction';
import { connect } from 'react-redux';
const TabPane = Tabs.TabPane

class ListRequirement extends Component {

    state = { select: "0" }  

    componentDidUpdate = (nextProps) => {
        if (nextProps.item !== this.props.item) {
            this.props.selectRequire("0")
        }
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
                                {require.missingEmployee ? (
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
        this.props.selectRequire(value)
    }

    render() {
        var { item, selection } = this.props
        return (
            <div className="card mb-4">
                <div className="card-header">
                    <Tabs defaultActiveKey={selection} onChange={this.onSelectPos}>
                        {this.getTabName()}
                    </Tabs>
                </div>
                <div className="card-body">                    
                    <ListEmployeeContent item={item.requirements[parseInt(selection)]} project={this.props.project} />
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        selection: state.EmployeeListRequirementReducer
    }
}

const mapDispatchToProp = (dispatch) => {
    return {
        selectRequire: value => {
            dispatch(selectRequirement(value))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProp)(ListRequirement)