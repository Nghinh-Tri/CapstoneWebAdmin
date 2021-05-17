import { Badge, Button, Descriptions, Modal, Spin } from 'antd';
import confirm from 'antd/lib/modal/confirm';
import moment from 'moment';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { checkSession } from '../../service/action/user/AuthenticateAction';
import * as Action from '../../service/action/project/ProjectAction'
import { showStatus, showBadge } from '../../service/util/util';
import { withRouter } from 'react-router';
import TextArea from 'antd/lib/input/TextArea';
import { history } from '../../service/helper/History';

class ProjectDetailTable extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoad: true,
            project: {}
        }
    }

    componentDidMount = () => {
        this.props.fetchProjectDetail(this.props.projectID)
    }

    componentDidUpdate = (prevProp) => {
        if (prevProp.project !== this.props.project) {
            this.setState({ isLoad: false, project: this.props.project })
        } else if (prevProp.status !== this.props.status) {
            if (this.props.status)
                Modal.success({
                    title: 'Decline Project Successfully',
                    onOk() { history.push('/project') }
                })
        }
    }

    onDecline = () => {
        var { match, declineProject, project } = this.props
        confirm({
            title: 'Are you sure decline this project?',
            okText: 'Yes',
            cancelText: 'No',
            onOk() {
                declineProject(match.params.id, project.projectName, project.pmID)
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }


    render() {
        var { project } = this.state
        return (
            <React.Fragment>
                {this.state.isLoad ?
                    <div className='row justify-content-center'>
                        <Spin className='text-center' size="large" />
                    </div>
                    :
                    <Descriptions title="Project Info" layout='horizontal' bordered extra={
                        project.status === 1 || project.status === 2 && project.noe === 0 || project.status === 0 ?
                            <Button onClick={this.onDecline} type="danger" >
                                Decline
                        </Button>
                            : ''}>

                        <Descriptions.Item span={3} label="Project Name">{project.projectName} </Descriptions.Item>

                        <Descriptions.Item span={3} label="Project Manager">{project.pmName}</Descriptions.Item>

                        <Descriptions.Item span={3} label="Project Type">{project.typeName}</Descriptions.Item>

                        <Descriptions.Item span={3} label="Project Field">{project.fieldName}</Descriptions.Item>

                        <Descriptions.Item span={3} label="Created Date">{moment(project.dateCreated).format('DD-MM-YYYY')}</Descriptions.Item>

                        <Descriptions.Item label="Start Date">{moment(project.dateBegin).format('DD-MM-YYYY')}</Descriptions.Item>

                        <Descriptions.Item label={project.dateEnd === null ? 'Estimated End Date' : 'End Date'} span={2}>
                            {project.dateEnd === null ? moment(project.dateEstimatedEnd).format('DD-MM-YYYY') : moment(project.dateEnd).format('DD-MM-YYYY')}
                        </Descriptions.Item>

                        <Descriptions.Item label="Status" span={3}>
                            <Badge status={showBadge(project.status)} text={showStatus(project.status)} />
                        </Descriptions.Item>

                        <Descriptions.Item span={3} label="Description">
                            <TextArea value={project.description} readOnly autoSize={true}
                                style={{ backgroundColor: 'white', border: 'none' }} />
                        </Descriptions.Item>
                    </Descriptions>
                }
            </React.Fragment>
        );
    }
}

const mapStateToProp = state => {
    return {
        project: state.ProjectDetailFetchReducer,
        status: state.StatusReducer
    }
}

const mapDispatchToProp = dispatch => {
    return {
        fetchProjectDetail: projectID => {
            dispatch(Action.fetchProjectDetail(projectID))
        },
        changeStatusToFinish: projectID => {
            dispatch(Action.changeStatusToFinish(projectID))
        },
        declineProject: (projectID, projectName, pmID) => {
            dispatch(Action.declineProject(projectID, projectName, pmID))
        },
        checkSession: () => {
            dispatch(checkSession())
        },
    }
}

export default compose(withRouter, connect(mapStateToProp, mapDispatchToProp))(ProjectDetailTable);