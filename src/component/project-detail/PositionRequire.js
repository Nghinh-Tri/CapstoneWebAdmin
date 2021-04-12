import Modal from 'antd/lib/modal/Modal';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { checkSession } from '../../service/action/AuthenticateAction';
import { fetchPositionRequire } from '../../service/action/ProjectAction';
import PositionRequireDetail from './PositionRequireDetail';

class PositionRequire extends Component {

    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            positionRequire: []
        }
    }

    componentDidMount = () => {
        this.props.fetchPositionRequire(this.props.projectID)
    }

    onShowRequireDetail = () => {
        this.setState({ visible: true })
    }

    showPosition = (list) => {
        var result = null
        result = list.map((value, index) => {
            return (
                <tr key={index}>
                    <td className='text-center'>{index + 1} </td>
                    <td>{value.posName}</td>
                    <td className='text-center'>{value.candidateNeeded}</td>
                    <td className='text-center'>{value.hardSkills.length}</td>
                    <td className='text-center'>{value.language.length}</td>
                    <td className='text-center'>{value.softSkillIDs.length}</td>
                    <td className='text-center'>
                        <a style={{ color: 'blue' }} onClick={this.onShowRequireDetail} >Detail</a>
                        <Modal width={1050} title={value.posName} visible={this.state.visible} onOk={this.handleOk} onCancel={this.handleCancel}>
                            <PositionRequireDetail hardSkills={value.hardSkills} language={value.language} softSkills={value.softSkillIDs} />
                        </Modal>
                    </td>
                </tr>
            )
        })
        return result
    }

    handleOk = (e) => {
        this.setState({
            visible: false,
        });
    }
    handleCancel = (e) => {
        this.setState({
            visible: false,
        });
    }

    render() {
        var { positionRequire } = this.props
        return (
            <React.Fragment>
                <div class="card mb-4">
                    <div class="card-header">
                        <i class="fas fa-table mr-1"></i>
                    Position
                </div>
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                                <thead>
                                    <tr>
                                        <th width={50} className='text-center'>No</th>
                                        <th>Position</th>
                                        <th width={145}>Candidates Needs</th>
                                        <th width={190} className='text-center'>Hard Skill Requirements</th>
                                        <th width={190} className='text-center'>Language Requirements</th>
                                        <th width={190} className='text-center'>Soft Skill Requirements</th>
                                        <th width={100}></th>
                                    </tr>
                                </thead>
                                {positionRequire.length > 0 ?
                                    <tbody>
                                        {this.showPosition(positionRequire)}
                                    </tbody>
                                    : ''}
                            </table>
                        </div>
                        {positionRequire.length > 0 ? '' :
                            <div className='row justify-content-center' style={{ width: 'auto' }} >
                                <h4 style={{ fontStyle: 'italic', color: 'gray' }} >No data</h4>
                            </div>
                        }
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProp = state => {
    return {
        positionRequire: state.PositionRequireReducer
    }
}

const mapDispatchToProp = dispatch => {
    return {
        fetchPositionRequire: projectID => {
            dispatch(fetchPositionRequire(projectID))
        },
        checkSession: () => {
            dispatch(checkSession())
        }
    }
}

export default connect(mapStateToProp, mapDispatchToProp)(PositionRequire);