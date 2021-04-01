import React, { Component } from 'react';
import { connect } from 'react-redux';
import SelectBar from '../../component/create-position-form/select-search/SelectBar';
import { checkSession } from '../../service/action/AuthenticateAction';
import { createPosition } from '../../service/action/PositionSelectBarAction';
import { createSkill, generateSkill, updateSkill, updateSkillType } from '../../service/action/SkillAction';

class CreateSkills extends Component {

    componentDidMount = () => {
        this.props.checkSession()
        this.props.onGenerateSkill()
    }

    constructor(props) {
        super(props);
        this.state = {
            type: [
                { label: 'Hard Skill', value: 0 },
                { label: 'Soft Skill', value: 1 }
            ]
        }
    }

    handleChange = (e) => {
        this.props.updateSkillName(e.target.value)
    }

    onSelect = (value) => {
        this.props.updateSkillType(value)
    }

    onSubmit = (e) => {
        e.preventDefault()
        this.props.createSkill(this.props.skill)
    }

    render() {
        var { skill } = this.props
        var result = null
        if (typeof skill !== 'undefined' || skill !== null)
            result = skill
        return (
            <div className="card">
                <div className="card-header">
                    <p style={{ fontSize: 20, fontWeight: 600, color: '#9c27b0' }}>Create Skill</p>
                </div>
                <div className="card-body">
                    <form onSubmit={this.handleSubmit} >
                        <div className='row'>
                            <div className='col-5'>
                                <fieldset className="form-group">
                                    <label className="bmd-label-floating">Skill</label>
                                    <input type="text"
                                        id="skillName" name="skillName"
                                        className="form-control"
                                        value={result.skillName}
                                        onChange={this.handleChange} />
                                </fieldset>
                            </div>
                            <div className='col-auto' style={{ marginLeft: 30, marginTop: 15 }}>
                                <label className="bmd-label-floating">Skill Type</label>
                            </div>
                            <div className='col' style={{ marginLeft: 30, marginTop: 10 }}>
                                <SelectBar name='skillType'
                                    type="special"
                                    placeholder="Select skill type"
                                    list={this.state.type}
                                    onSelectSkillType={this.onSelect}
                                    value={result.skillType}
                                />
                            </div>
                        </div>
                        <button className="btn btn-primary pull-right" onClick={this.onSubmit}>Create</button>
                    </form>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        skill: state.SkillReducer
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onGenerateSkill: () => {
            dispatch(generateSkill())
        },
        createSkill: (skill) => {
            dispatch(createSkill(skill))
        },
        updateSkillName: (skill) => {
            dispatch(updateSkill(skill))
        },
        updateSkillType: (skillType) => {
            dispatch(updateSkillType(skillType))
        },
        checkSession: () => {
            dispatch(checkSession())
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateSkills);