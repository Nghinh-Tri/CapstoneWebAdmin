import React, { Component } from 'react';
import { connect } from 'react-redux';
import { checkSession } from '../../service/action/AuthenticateAction';
import { fetchSkill, generateSkill } from '../../service/action/SkillAction';
import { history } from '../../service/helper/History';

class Skill extends Component {

    constructor(props) {
        super(props);
        this.state = {
            pageIndex: 1
        }
    }

    componentDidMount = () => {
        this.props.checkSession()
        this.props.fetchSkills(this.state.pageIndex)
    }

    onShowListSkills = (items) => {
        var result = null
        if (typeof items !== 'undefined' && items.length > 0) {
            result = items.map((item, index) => {
                return (
                    <tr key={index}>
                        <th className="text-center">{index + 1}</th>
                        <th className="">{item.skillName}</th>
                        <th className="">{item.skillType === 0 ? 'Hard skill' : 'Soft skill'}</th>
                        <th className="text-primary"><a className="text-primary" style={{ cursor: 'pointer' }}>Delete</a></th>
                    </tr>
                )
            })
        }
        return result
    }

    onNext = () => {
        var { skills } = this.props
        if (skills.pageIndex < skills.pageCount) {
            this.props.fetchSkills(skills.pageIndex + 1)
        }
    }

    onPrevios = () => {
        var { skills } = this.props
        if (skills.pageIndex > 1) {
            this.props.fetchSkills(skills.pageIndex - 1)
        }
    }

    onHandle = () => {
        history.push('/skill/create')
    }

    render() {
        var { skills } = this.props
        var result = null
        if (skills !== null)
            result = skills

        return (
            <div className="container-fluid">
                <button type="button" className="btn btn-primary"
                    style={{ fontWeight: 700, borderRadius: 5, marginLeft: 10, }}
                    onClick={this.onHandle}
                >
                    <i className="material-icons mr-5">add_box</i>
                        Create New Skills
                </button>
                <div className="row">
                    <div className="card mb-80">
                        <div className="row">
                            <div className="card-body">
                                <table className="table">
                                    <thead className="text-primary">
                                        <tr>
                                            <th className="font-weight-bold text-center">No</th>
                                            <th className="font-weight-bold" style={{ marginLeft: 20 }}>Skill</th>
                                            <th className="font-weight-bold" style={{ marginLeft: 20 }}>Type</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.onShowListSkills(result.items)}
                                    </tbody>
                                </table>
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
                            </div>
                        </div>
                    </div>
                </div>
            </div>
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
        fetchSkills: (pageIndex) => {
            dispatch(fetchSkill(pageIndex))
        },
        checkSession: () => {
            dispatch(checkSession())
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Skill);