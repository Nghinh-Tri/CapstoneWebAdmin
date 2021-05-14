import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as Action from "../../service/action/project/ProjectAction";
import ProjectTableItem from "../../component/project-table-item/ProjectTableItem";
import { checkSession } from '../../service/action/user/AuthenticateAction';
import Search from '../../component/search/Search';
import { Pagination, Spin } from 'antd';
import { PROJECT } from '../../service/constant/nodata';

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
        console.log('a')
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

    onShowListProject = (projectList, pageIndex) => {
        var result = null
        if (typeof projectList !== 'undefined') {
            result = projectList.map((project, index) => {
                return (<ProjectTableItem key={index} project={project} index={index} pageIndex={pageIndex} />);
            })
        }
        return result
    }

    searchProject = (value) => {
        this.setState({ search: value })
        this.props.fetchProject(1, value)
    }

    onSelectPage = (e) => {
        this.props.fetchProject(e, this.state.search)
    }

    render() {
        var { projects } = this.props
        return (
            <React.Fragment>
                <ol class="breadcrumb mb-4 mt-3">
                    <li class="breadcrumb-item active">Projects</li>
                </ol>
                <div className="container-fluid">
                    <div class="card mb-4">
                        <div class="card-header">
                            <i class="fas fa-table mr-1"></i>
                    Projects
                </div>
                        {this.state.isLoading ?
                            <div className='row justify-content-center'>
                                <Spin className='text-center' size="large" />
                            </div>
                            :
                            <>
                                <div class="card-body">
                                    <div className="row mb-3">
                                        <Search search="project"
                                            refresh={projects.isRefresh}
                                            placeholder="Search project name ..."
                                            searchProject={this.searchProject}
                                        />
                                    </div>
                                    {projects.items.length > 0 ?
                                        <div class="table-responsive">
                                            <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                                                <thead className="font-weight-bold text-center text-primary">
                                                    <tr>
                                                        <th width={40}>No</th>
                                                        <th width={200}>Project Name</th>
                                                        <th width={150}>Project Manager</th>
                                                        <th width={120}>Created Date</th>
                                                        <th width={120}>Start Date</th>
                                                        <th width={160}>Estimated End Date</th>
                                                        <th width={80}>Status</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {this.onShowListProject(projects.items, projects.pageIndex)}
                                                </tbody>
                                            </table>
                                        </div>
                                        :
                                        <div className='row justify-content-center'>
                                            <h4 style={{ fontStyle: 'italic', color: 'gray' }} >{PROJECT.NO_PROJECT}</h4>
                                        </div>
                                    }
                                </div>
                                {projects.pageCount <= 1 ? '' :
                                    <div className='row justify-content-center' style={{ marginBottom: 20 }} >
                                        <Pagination defaultCurrent={projects.pageIndex} total={projects.totalRecords} onChange={this.onSelectPage} />
                                    </div>
                                }
                            </>
                        }
                    </div>
                </div>
                <style jsx global>
                    {`.ant-pagination-options {visibility: hidden;}`}
                </style>
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