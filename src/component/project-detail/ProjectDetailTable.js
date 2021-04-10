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

class ProjectDetailTable extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoad: true
        }
    }

    componentDidMount = () => {
        this.props.fetchProjectDetail(this.props.projectID)
    }

    componentWillReceiveProps = () => {
        var { project } = this.props
        if (typeof project.projectID !== 'undefined')
            this.setState({ isLoad: false })
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

    render() {
        var { project } = this.props
        console.log(project)
        return (
            <React.Fragment>
                 {this.state.isLoad ?
                    <div className='row justify-content-center'>
                        <Spin className='text-center' size="large" />
                    </div>
                    : 
                    <Descriptions title="Project Info" layout='horizontal' bordered
                        extra={<React.Fragment>
                            {project.status !== 4 ?
                                <NavLink to={`/project/detail/${project.projectID}/edit`} style={{ marginRight: 10 }} type="default" >Edit</NavLink>
                                : ''}
                            {project.status === 3 ? <Button type="primary" onClick={this.onChangeStatusToFinish}>Finish</Button> : ''}
                        </React.Fragment>}
                        >

                            
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
        checkSession: () => {
            dispatch(checkSession())
        }
    }
}

export default compose(withRouter, connect(mapStateToProp, mapDispatchToProp))(ProjectDetailTable);