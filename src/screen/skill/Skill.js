import { Modal, Pagination, Spin } from 'antd';
import confirm from 'antd/lib/modal/confirm';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import SelectBar from '../../component/create-position-form/select-search/SelectBar';
import Search from '../../component/search/Search';
import { checkSession } from '../../service/action/user/AuthenticateAction';
import { changeStatus, fetchSkill, refreshPage } from '../../service/action/skill/SkillAction';
import { history } from '../../service/helper/History';
import { showPositionSpan, showPositionStatus } from '../../service/util/util';
import { SKILL } from '../../service/constant/nodata';

class Skill extends Component {

    constructor(props) {
        super(props);
        this.state = {
            pageIndex: 1,
            search: '',
            isLoading: true,
            type: [
                { label: 'Hard Skill', value: 0 },
                { label: 'Soft Skill', value: 1 },
            ],
            selectType: 0
        }
    }

    componentDidMount = () => {
        this.props.checkSession()
        this.props.fetchSkills(this.state.pageIndex, this.state.search, this.state.selectType)
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
        } else if (prevProps.error !== this.props.error) {
            var { refreshError, error } = this.props
            if (this.props.error !== '') {
                Modal.error({
                    title: error,
                    onOk: () => { refreshError() }
                });
            }
        } else if (prevProps.status !== this.props.status) {
            let { fetchSkills } = this.props
            let { pageIndex, search, selectType } = this.state
            if (this.props.status)
                Modal.success({
                    title: 'Change Skill Status Successfully',
                    onOk() { fetchSkills(pageIndex, search, selectType) }
                })
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

    onShowListSkills = (items, pageIndex) => {
        var result = null
        if (typeof items !== 'undefined' && items.length > 0) {
            result = items.map((item, index) => {
                return (
                    <tr key={index}>
                        <th className="text-center">{(pageIndex - 1) * 10 + index + 1}</th>
                        <th style={{ minWidth: 200, maxWidth: 200 }} >{item.skillName}</th>
                        <th className="text-center" style={{ fontWeight: 600, width: 200 }}>{item.skillType === 0 ? 'Hard skill' : 'Soft skill'}</th>
                        <th className="text-center" style={{ width: 150 }} >
                            <span className={`badge badge-pill ${showPositionSpan(item.status)} span`}>
                                {showPositionStatus(item.status)}
                            </span>
                        </th>
                        <th className="text-primary text-center"><a className="text-primary" style={{ cursor: 'pointer' }} onClick={() => this.onUpdate(item.skillID)}>Update</a></th>
                        <th className="text-primary text-center"><a className="text-primary" style={{ cursor: 'pointer' }} onClick={() => this.onChangeStatus(item.skillID, item.skillName)}>Change Status</a></th>
                    </tr>
                )
            })
        }
        return result
    }

    onHandle = () => {
        history.push('/skill/create')
    }

    searchSkill = (value) => {
        this.setState({ search: value })
        this.props.fetchSkills(1, value, this.state.selectType)
    }

    onSelectPage = (e) => {
        this.props.fetchSkills(e, this.state.search, this.state.selectType)
    }

    onSelectType = type => {
        this.setState({ selectType: type })
        this.props.fetchSkills(1, '', type)
    }

    render() {
        var { skills } = this.props
        var result = null
        if (skills !== null)
            result = skills

        return (
            <React.Fragment>
                <ol class="breadcrumb mb-4 mt-3">
                    <li class="breadcrumb-item active">Skills</li>
                </ol>
                <div className="container-fluid">
                    <div class="card mb-4">
                        <div class="card-header">
                            <i class="fas fa-table mr-1"></i>Skills
                        </div>
                        <div className="card-body">
                            {this.state.isLoading ?
                                <div className="row justify-content-center">
                                    <Spin className="text-center" size="large" />
                                </div>
                                :
                                <>
                                    <div className="row mb-3">
                                        <button type="button" className="btn btn-primary"
                                            style={{ fontWeight: 700, borderRadius: 5, marginLeft: 20, marginTop: 10 }}
                                            onClick={this.onHandle}>
                                            <div className="row" style={{ paddingLeft: 7, paddingRight: 7 }}>
                                                <i className="material-icons">add_box</i>New Skill
                                            </div>
                                        </button>
                                        <Search search="Skill"
                                            refresh={skills.isRefresh}
                                            placeholder="Search skill name ..."
                                            searchSkill={this.searchSkill} />
                                    </div>
                                    {result.items.length > 0 ?
                                        <div class="table-responsive">
                                            <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                                                <thead className="font-weight-bold text-center text-primary">
                                                    <tr>
                                                        <th width={40}>No</th>
                                                        <th >Skill</th>
                                                        <th width={250} >
                                                            <div className='row'>
                                                                <div className='col-auto' style={{ marginTop: 10 }} > Type</div>
                                                                <div className='col-auto mt-1'>
                                                                    <SelectBar name='skillType'
                                                                        type="role"
                                                                        value={this.state.selectType}
                                                                        placeholder='Select skill type'
                                                                        list={this.state.type}
                                                                        onSelectType={this.onSelectType} />
                                                                </div>
                                                            </div>
                                                        </th>
                                                        <th width={80}>Status</th>
                                                        <th width={100}></th>
                                                        <th width={150}></th>
                                                    </tr>
                                                </thead>
                                                <tbody>{this.onShowListSkills(result.items, result.pageIndex)}</tbody>
                                            </table>
                                        </div>
                                        :
                                        <div className='row justify-content-center'>
                                            <h4 style={{ fontStyle: 'italic', color: 'gray' }} >{SKILL.NO_SKILL}</h4>
                                        </div>
                                    }
                                    {result.pageCount <= 1 ? '' :
                                        <div className="row justify-content-center" style={{ marginBottom: 20 }}>
                                            <Pagination defaultCurrent={result.pageIndex} total={result.totalRecords} onChange={this.onSelectPage} />
                                        </div>
                                    }
                                </>
                            }
                        </div>
                    </div>
                </div>
                <style jsx global>
                    {`.ant-pagination-options {visibility: hidden;}`}
                </style>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        skills: state.SkillReducer,
        error: state.ChangeStatusErrorReducer,
        status: state.StatusReducer
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchSkills: (pageIndex, search, skillType) => {
            dispatch(fetchSkill(pageIndex, search, skillType))
        },
        checkSession: () => {
            dispatch(checkSession())
        },
        changeStatus: (skillID,) => {
            dispatch(changeStatus(skillID))
        },
        refreshError: () => {
            dispatch(refreshPage())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Skill);