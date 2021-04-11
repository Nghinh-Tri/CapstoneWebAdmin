import { Badge, Button, Descriptions, Spin } from 'antd';
import confirm from 'antd/lib/modal/confirm';
import moment from 'moment';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { checkSession } from '../../service/action/AuthenticateAction';
import * as Action from '../../service/action/ProjectAction'
import { showStatus, showBadge } from '../../service/util/util';
import {history} from '../../service/helper/History'

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

    componentWillReceiveProps = () => {
        var { project } = this.props
        if (typeof project.projectID !== 'undefined')
            this.setState({ isLoad: false, project: project })
    }

    onChangeStatusToFinish = () => {
        var { match, changeStatusToFinish } = this.props
        confirm({
            title: 'Are you sure finish this project?',
            okText: 'Yes',
            cancelText: 'No',
            onOk() {
                changeStatusToFinish(match.params.id)
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }

    onDecline = () => {
        var { match, declineProject } = this.props
        confirm({
            title: 'Are you sure decline this project?',
            okText: 'Yes',
            cancelText: 'No',
            onOk() {
                declineProject(match.params.id)
                history.push('/project')
            },
            onCancel() {
                console.log('Cancel');
            },

        });
    }


    render() {
        var { project } = this.state
        let stat = project.status
    
        return (
            <React.Fragment>
                {this.state.isLoad ?
                    <div className='row justify-content-center'>
                        <Spin className='text-center' size="large" />
                    </div>
                    :
                    <Descriptions title="Project Info" layout='horizontal' bordered extra={
                        
                       
                        <Button onClick={this.onDecline} type="danger" >
                              {showStatus(stat) === 'On Going' ? '' : 'Decline'} 
                        </Button>} >
                   
                        <Descriptions.Item span={3} label="Project Name">{project.projectName} </Descriptions.Item>

                        <Descriptions.Item span={3} label="Project Type">{project.typeName}</Descriptions.Item>

                        <Descriptions.Item span={3} label="Project Field">{project.fieldName}</Descriptions.Item>

                        <Descriptions.Item label="Start Date">{moment(project.dateBegin).format('DD-MM-YYYY')}</Descriptions.Item>

                        <Descriptions.Item label={project.dateEnd === null ? 'Estimated End Date' : 'Ended Date'} span={2}>

                            {project.dateEnd === null ? moment(project.dateEstimatedEnd).format('DD-MM-YYYY') : moment(project.dateEnd).format('DD-MM-YYYY')}
                        </Descriptions.Item>

                        <Descriptions.Item label="Status" span={3}>
                            <Badge status={showBadge(project.status)} text={showStatus(project.status)} />
                        </Descriptions.Item>


                        <Descriptions.Item label="Description">{project.description}</Descriptions.Item>
                    </Descriptions>
                }
            </React.Fragment>
        );
    }
}

const mapStateToProp = state => {
    return {
        project: state.ProjectFetchReducer
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
        declineProject: projectID => {
            dispatch(Action.declineProject(projectID))
        },
        checkSession: () => {
            dispatch(checkSession())
        }
    }
}

export default compose(withRouter, connect(mapStateToProp, mapDispatchToProp))(ProjectDetailTable);