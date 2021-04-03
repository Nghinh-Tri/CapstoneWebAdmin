import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as Action from "../../service/action/ProjectAction";
import ProjectTableItem from "../../component/project-table-item/ProjectTableItem";
import { checkSession } from '../../service/action/AuthenticateAction';

class Project extends Component {

    constructor(props) {
        super(props);
        this.state = {
            project: {
                name: '',
                dateBegin: '',
                dateEndEst: '',
                description: '',
                stakeholder: ''
            },
            page: 1
        }
    }

    componentDidMount = () => {
        this.props.checkSession()
        this.props.fetchProject(this.state.page)
    }

    onShowListProject = (projectList) => {
        var result = null
        if (typeof projectList !== 'undefined') {
            result = projectList.map((project, index) => {
                return (<ProjectTableItem key={index} project={project} index={index} />);
            })
        }
        return result
    }

    onNext = () => {
        var { projects } = this.props
        if (projects.pageIndex < projects.pageCount)
            this.props.fetchProject(projects.pageIndex + 1)
    }

    onPrevios = () => {
        var { projects } = this.props
        if (projects.pageIndex > 1)
            this.props.fetchProject(projects.pageIndex - 1)
    }

    render() {
        var { projects } = this.props
        console.log(projects)
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="card mb-80">
                        <div className="card-body">
                            <div className="form-group">
                                <div className="row">
                                    <div className="card-body">

                                        <div className="table-responsive">
                                            <table className="table">
                                                <thead className="text-primary">
                                                    <tr>
                                                        <th className="font-weight-bold text-center">No</th>
                                                        <th className="font-weight-bold">Project Name</th>
                                                        <th className="font-weight-bold">Project Manager Name</th>
                                                        <th className="font-weight-bold text-center">Created Date</th>
                                                        <th className="font-weight-bold text-center">Status</th>
                                                        <th className="font-weight-bold text-center"></th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {this.onShowListProject(projects.items)}
                                                </tbody>
                                            </table>
                                        </div>
                                        <div className="row align-items-center">
                                            <div className="col">
                                                <button type="button"
                                                    style={{ fontWeight: 700, width:120 }}
                                                    className="btn btn-primary pull-right" onClick={this.onPrevios}>
                                                    Previous
                                                </button>
                                            </div>
                                            <div className="col-auto">
                                                <div className="text-center" style={{fontSize:20, fontWeight:700, color: '#9c27b0'}}>
                                                    {projects.pageIndex} - {projects.pageCount}
                                                </div>
                                            </div>
                                            <div className="col">
                                                <button type="button"
                                                    style={{ fontWeight: 700, width:120 }}
                                                    className="btn btn-primary" onClick={this.onNext}>
                                                    Next
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div >
                </div>
            </div>
        );
    }
}

const mapStateToProp = state => {
    return {
        projects: state.ProjectFetchReducer
    }
}

const mapDispatchToProp = (dispatch) => {
    return {
        generateProject: (project) => {
            dispatch(Action.generateProject(project))
        },
        fetchProject: (pageIndex) => {
            dispatch(Action.fetchProject(pageIndex))
        },
        checkSession: () => {
            dispatch(checkSession())
        }
    }
}

export default connect(mapStateToProp, mapDispatchToProp)(Project);