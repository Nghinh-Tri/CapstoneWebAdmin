import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as Action from "../../service/action/ProjectAction";
import ProjectTableItem from "../../component/project-table-item/ProjectTableItem";
import { checkSession } from '../../service/action/AuthenticateAction';
import Search from '../../component/search/Search';
import { Spin } from 'antd';

class Project extends Component {

    constructor(props) {
        super(props);
        this.state = {
            page: 1,
            search: '',
            isLoading: true
        }
    }

    componentDidMount = () => {
        this.props.checkSession()
        this.props.fetchProject(this.state.page, this.state.search)
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.projects !== prevState.projects) {
            return { someState: nextProps.projects };
        }
        return null;
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.projects !== this.props.projects) {
            if (typeof this.props.projects.items !== 'undefined') {
                this.setState({ isLoading: false })
            }
        }
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
            this.props.fetchProject(projects.pageIndex + 1, this.state.search)
    }

    onPrevios = () => {
        var { projects } = this.props
        if (projects.pageIndex > 1)
            this.props.fetchProject(projects.pageIndex - 1, this.state.search)
    }

    searchProject = (value) => {
        this.setState({ search: value })
        this.props.fetchProject(1, value)
    }

    render() {
        var { projects } = this.props
        return (
            <React.Fragment>
                <ol class="breadcrumb mb-4 mt-3">
                    <li class="breadcrumb-item active">Projects</li>
                </ol>

                <div className="container-fluid">
                    <div className="row">
                        <div className="card mb-80">
                            <div className="card-body">
                                <div className="form-group">
                                    {this.state.isLoading ? '' :
                                        <div className="row">
                                            <Search search="project"
                                                placeholder="Search project name ..."
                                                searchProject={this.searchProject} />
                                        </div>
                                    }
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
                                                    {this.state.isLoading ? '' :
                                                        <tbody>
                                                            {this.onShowListProject(projects.items)}
                                                        </tbody>}

                                                </table>
                                            </div>
                                            {this.state.isLoading ?
                                                <div className='row justify-content-center'>
                                                    <Spin className='text-center' size="large" />
                                                </div>
                                                : ''}
                                            {this.state.isLoading ? '' :
                                                <div className="row align-items-center">
                                                    <div className="col">
                                                        <button type="button"
                                                            style={{ fontWeight: 700, width: 120 }}
                                                            className="btn btn-primary pull-right" onClick={this.onPrevios}>
                                                            Previous
                                                </button>
                                                    </div>
                                                    <div className="col-auto">
                                                        <div className="text-center" style={{ fontSize: 20, fontWeight: 700, color: '#9c27b0' }}>
                                                            {projects.pageIndex} - {projects.pageCount}
                                                        </div>
                                                    </div>
                                                    <div className="col">
                                                        <button type="button"
                                                            style={{ fontWeight: 700, width: 120 }}
                                                            className="btn btn-primary" onClick={this.onNext}>
                                                            Next
                                                </button>
                                                    </div>
                                                </div>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div >
                    </div>
                </div>
            </React.Fragment >
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
        fetchProject: (pageIndex, search) => {
            dispatch(Action.fetchProject(pageIndex, search))
        },
        checkSession: () => {
            dispatch(checkSession())
        }
    }
}

export default connect(mapStateToProp, mapDispatchToProp)(Project);