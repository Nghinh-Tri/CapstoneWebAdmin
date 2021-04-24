import { Tabs } from 'antd';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSuitableList } from '../../service/action/SuitableListAction';
import SuitableProjectDetail from './suitable-project-detail/SuitableProjectDetail';
const TabPane = Tabs.TabPane;

class SuitableProject extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectIndex: 0
        }
    }


    componentDidMount = () => {
        this.props.fetchSuitableList(this.props.empID)
    }

    componentDidUpdate = (prevProp) => {
        if (prevProp.suitableList !== this.props.suitableList) {
        }
    }

    showProjectTab = (lst) => {
        var { suitableList } = this.props
        var result = null
        result = suitableList.map((item, index) => {
            console.log(item)
            // if (item.matchInEachPos.length > 0)
            return (<TabPane key={index} tab={item.projectInfo.projectName} ></TabPane>)
        })
        return result
    }

    onClickMenu = (value) => {
        this.setState({ selectIndex: value })
    }

    showSuitableProjectDetail = () => {
        var { selectIndex } = this.state
        var { suitableList } = this.props
        if (suitableList.length > 0) {
            return (<SuitableProjectDetail item={suitableList[selectIndex]} empID={this.props.empID} />)
        }
    }

    render() {
        var { suitableList } = this.props
        return (
            <React.Fragment>
                <div class="card mb-4">
                    <div class="card-header">
                        <Tabs defaultActiveKey="0" onChange={this.onClickMenu}>
                            {this.showProjectTab()}
                        </Tabs>
                    </div>
                    <div class="card-body">
                    { this.showSuitableProjectDetail()}

                        
                    </div>
                </div>
            </React.Fragment >
        );
    }
}

const mapStateToProp = (state) => {
    return {
        suitableList: state.SuitableProjectReducer
    }
}

const mapDispatchToProp = (dispatch) => {
    return {
        fetchSuitableList: (empID) => {
            dispatch(fetchSuitableList(empID))
        }
    }
}

export default connect(mapStateToProp, mapDispatchToProp)(SuitableProject);