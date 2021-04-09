import { Spin } from 'antd';
import confirm from 'antd/lib/modal/confirm';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Search from '../../component/search/Search';
import { checkSession } from '../../service/action/AuthenticateAction';
import { changeStatus, fetchSkill } from '../../service/action/SkillAction';
import { history } from '../../service/helper/History';
import { showPositionSpan, showPositionStatus } from '../../service/util/util';

class Skill extends Component {

    constructor(props) {
        super(props);
        this.state = {
            pageIndex: 1,
            search: '',
            isLoading: true
        }
    }

    componentDidMount = () => {
        this.props.checkSession()
        this.props.fetchSkills(this.state.pageIndex, this.state.search)
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.skills !== prevState.skills) {
            return { someState: nextProps.skills };
        }
        return null;
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.skills !== this.props.skills) {
            if (this.props.skills !== null) {
                this.setState({ isLoading: false })
            }
        }
    }

    onUpdate = (skillID) => {
        history.push(`/skill/update/${skillID}`)
    }

    onChangeStatus = (skillID, skill) => {
        var { changeStatus, skills } = this.props
        var { search } = this.state
        confirm({
            title: `Are you sure you want to change ${skill} status?`,
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
                changeStatus(skillID, skills.pageIndex, search)
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }

    onShowListSkills = (items) => {
        var result = null
        if (typeof items !== 'undefined' && items.length > 0) {
            result = items.map((item, index) => {
                return (
                    <tr key={index}>
                        <th className="text-center">{index + 1}</th>
                        <th className="" style={{ minWidth: 200, maxWidth: 200 }} >{item.skillName}</th>
                        <th style={{ fontWeight: 600, width: 200 }}>{item.skillType === 0 ? 'Hard skill' : 'Soft skill'}</th>
                        <th className="text-center" style={{ width: 150 }} >
                            <span className={`badge badge-pill ${showPositionSpan(item.status)} span`}>
                                {showPositionStatus(item.status)}
                            </span>
                        </th>
                        <th className="text-primary"><a className="text-primary" style={{ cursor: 'pointer' }} onClick={() => this.onUpdate(item.skillID)}>Update</a></th>
                        <th className="text-primary"><a className="text-primary" style={{ cursor: 'pointer' }} onClick={() => this.onChangeStatus(item.skillID, item.skillName)}>Change Status</a></th>
                    </tr>
                )
            })
        }
        return result
    }

    onNext = () => {
        var { skills } = this.props
        if (skills.pageIndex < skills.pageCount) {
            this.props.fetchSkills(skills.pageIndex + 1, this.state.search)
        }
    }

    onPrevios = () => {
        var { skills } = this.props
        if (skills.pageIndex > 1) {
            this.props.fetchSkills(skills.pageIndex - 1, this.state.search)
        }
    }

    onHandle = () => {
        history.push('/skill/create')
    }

    searchSkill = (value) => {
        this.setState({ search: value })
        this.props.fetchSkills(1, value)
    }

    render() {
        var { skills } = this.props
        var result = null
        if (skills !== null)
            result = skills

        return (
            <React.Fragment>
                <ol class="breadcrumb mb-4 mt-3">
                    <li class="breadcrumb-item active">Projects</li>
                </ol>
                <div className="container-fluid">

                    <button type="button" className="btn btn-primary"
                        style={{ fontWeight: 700, borderRadius: 5, marginLeft: 10, marginBottom: 15 }}
                        onClick={this.onHandle} >
                        <div className='row' style={{ paddingLeft: 7, paddingRight: 7 }}>
                            <i className="material-icons">add_box</i>Create New Skill
                    </div>
                    </button>


                    <div class="card mb-4">
                        <div class="card-header">
                            <i class="fas fa-table mr-1"></i>
            List Skill
        </div>

                        <div className="card-body">

                            {this.state.isLoading ? '' :
                                <div className="row mb-3">
                                    <Search search="Employee"
                                        placeholder="Search employee name ..."
                                        searchEmp={this.searchSkill} />
                                </div>
                            }
                            <div class="table-responsive">
                                <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                                    <thead className=" text-primary">
                                        <tr>
                                            <th className="font-weight-bold text-center">No</th>
                                            <th className="font-weight-bold" style={{ marginLeft: 20 }}>Skill</th>
                                            <th className="font-weight-bold" style={{ marginLeft: 20 }}>Type</th>
                                            <th className="font-weight-bold text-center" style={{ marginLeft: 20 }}>Status</th>
                                            <th className="font-weight-bold "></th>
                                            <th className="font-weight-bold "></th>
                                        </tr>
                                    </thead>
                                    {this.state.isLoading ?
                                        ''
                                        :
                                        <tbody>
                                            {this.onShowListSkills(result.items)}
                                        </tbody>
                                    }
                                </table>
                            </div>
                            {this.state.isLoading ?
                                <div className='row justify-content-center'>
                                    <Spin className='text-center' size="large" />
                                </div>
                                : ''}
                            {this.state.isLoading ? ''
                                :
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
                                            {result.pageIndex} - {result.pageCount}
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
            </React.Fragment >
          
        );
    }
}

const mapStateToProps = (state) => {
    return {
        skills: state.SkillReducer
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchSkills: (pageIndex, search) => {
            dispatch(fetchSkill(pageIndex, search))
        },
        checkSession: () => {
            dispatch(checkSession())
        },
        changeStatus: (skillID, pageIndex, search) => {
            dispatch(changeStatus(skillID, pageIndex, search))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Skill);