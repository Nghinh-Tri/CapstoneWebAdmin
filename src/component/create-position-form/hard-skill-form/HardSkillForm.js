import React, { Component } from 'react';
import HardSkillFormContent from './hard-skill-form-content/HardSkillFormContent';

class HardSkillForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            hardSkills: {
                skillID: 0,
                skillLevel: 0,
                empCertifications: []
            },
            isMinimize: false
        }
    }
    onAddHardSkill = () => {
        this.props.onAddHardSkill(this.state.hardSkills)
    }

    showItems = (hardSkill) => {
        var result = null;
        if (typeof hardSkill !== 'undefined') {
            result = hardSkill.map((hardSkillDetail, hardSkillIndex) => {
                return (
                    <HardSkillFormContent key={hardSkillIndex}
                        hardSkillDetail={hardSkillDetail}
                        hardSkillIndex={hardSkillIndex}
                        onDeleteHardSkill={this.props.onDeleteHardSkill}
                        updateHardSkillExpPriority={this.props.updateHardSkillExpPriority}
                        onUpdateHardSkillID={this.props.onUpdateHardSkillID}
                        onUpdateHardSkillCerti={this.props.onUpdateHardSkillCerti}
                    />
                );
            })
        }
        return result;
    }

    setMinimize = () => {
        this.setState({
            isMinimize: !this.state.isMinimize
        })
    }

    render() {
        var { hardSkill } = this.props

        const showHardSkill = (hardSkill) => {
            if (this.state.isMinimize)
                return ""
            else
                return (<div className="card-body">
                    {this.showItems(hardSkill)}
                    <span className="material-icons add"
                        onClick={this.onAddHardSkill}>add_box</span>
                </div>)
        }

        return (
            <div className="card">
                <div className="card-header ">
                    <div className="row">
                        <div className="col">
                            <h5 className="font-weight-bold">Hard Skill</h5>
                        </div>
                        <div className="col pull-right">
                            <span className="material-icons pull-right clear" onClick={this.setMinimize} >
                                {this.state.isMinimize === false ? 'minimize' : 'crop_free'}
                            </span>
                        </div>
                    </div>
                </div>
                {showHardSkill(hardSkill)}
            </div>

        );
    }
}

export default HardSkillForm;