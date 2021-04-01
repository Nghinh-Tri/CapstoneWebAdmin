import React, { Component } from 'react';
import { connect } from 'react-redux';
import SelectBar from '../../component/create-position-form/select-search/SelectBar';
import { checkSession } from '../../service/action/AuthenticateAction';
import { createSkill, fetchSkillDetail, generateSkill, updateSkill, updateSkillName, updateSkillType } from '../../service/action/SkillAction';

class CreateSkills extends Component {

    constructor(props) {
        super(props);
        this.state = {
            type: [
                { label: 'Hard Skill', value: 0 },
                { label: 'Soft Skill', value: 1 }
            ],
        }
    }

    componentDidMount = () => {
        this.props.checkSession()
        var { match } = this.props
        if (typeof match !== 'undefined') {
            this.props.fetchSkillDetail(match.params.id)
        } else
            this.props.onGenerateSkill()
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.skill !== prevState.skill) {
            return { someState: nextProps.skill };
        }
        return null;
    }

    componentDidUpdate(prevProps) {
        if (prevProps.skill !== this.props.skill) {
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
        if (typeof this.props.match === 'undefined')
            this.props.createSkill(this.props.skill)
        else
            this.props.updateSkill(this.props.skill)

    }

    render() {
        var { skill } = this.props
        var result = null
        if (typeof skill !== 'undefined' || skill !== null)
            result = skill
        return (
            <div className="card">
                <div className="card-header card-header-primary">
                    <h4 className="card-title">
                        {typeof this.props.match !== 'undefined' ? 'Update Skill' : 'Create Skill'}
                    </h4>
                </div>
                <div className="card-body">
                    <form >
                        <div className='row'>
                            <div className="col-5">
                                <fieldset className="form-group">
                                    <label className={`bmd-label-${typeof this.props.match !== 'undefined' ? 'static' : 'floating'}`} >Skill</label>
                                    <input type="text" className="form-control" name="skillName" value={result.skillName} onChange={this.handleChange} />
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
                        <button className="btn btn-primary pull-right" onClick={this.onSubmit}>
                            {typeof this.props.match !== 'undefined' ? 'Update' : 'Create'}
                        </button>
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
            dispatch(updateSkillName(skill))
        },
        updateSkillType: (skillType) => {
            dispatch(updateSkillType(skillType))
        },
        checkSession: () => {
            dispatch(checkSession())
        },
        fetchSkillDetail: (skillID) => {
            dispatch(fetchSkillDetail(skillID))
        },
        updateSkill: (skill) => {
            dispatch(updateSkill(skill))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateSkills);