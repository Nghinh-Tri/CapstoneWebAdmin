import { Modal, Tabs } from 'antd';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCandidatesResult } from '../../service/action/project/ProjectAction';
import CandidateResult from './CandidateResult';
import PositionRequireDetail from './PositionRequireDetail';
const TabPane = Tabs.TabPane
class RequireModalDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            visible: false,
        }
    }

    handleOk = (e) => {
        this.setState({ visible: false, });
    }

    handleCancel = (e) => {
        this.setState({ visible: false, });
    }

    onShowRequireDetail = () => {
        this.setState({ visible: true })
        this.props.fetchPositionRequire(this.props.value.requiredPosID)
    }

    render() {
        var { value } = this.props
        return (
            <React.Fragment>
                <a style={{ color: 'blue' }} onClick={this.onShowRequireDetail} >Detail</a>
                <Modal width={1050} title={value.posName} visible={this.state.visible}
                    onOk={this.handleOk} onCancel={this.handleCancel}
                    footer={null}>
                    <Tabs defaultActiveKey={1} >
                        <TabPane key={1} tab="Details">
                            <PositionRequireDetail hardSkills={value.hardSkills} language={value.language} softSkills={value.softSkillIDs} />
                        </TabPane>
                        <TabPane key={2} tab="Candidates">
                            <CandidateResult candidatesResult={this.props.candidatesResult} />
                        </TabPane>
                    </Tabs>
                </Modal>
            </React.Fragment>
        );
    }
}

const mapStateToProp = state => {
    return {
        candidatesResult: state.CandidateResultReducer
    }
}

const mapDispatchToProp = dispatch => {
    return {
        fetchPositionRequire: requireID => {
            dispatch(fetchCandidatesResult(requireID))
        }
    }
}

export default connect(mapStateToProp, mapDispatchToProp)(RequireModalDetail);