import React, { Component } from 'react';
import HardSkillFormContent from './hard-skill-form-content/HardSkillFormContent';

class HardSkillForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            hardSkillDetail: {
                hardSkillID: 0,
                exp: 0,
                certiID: 0,
                priority: 0
            },
            isMinimize: false
        }
    }
    onAddHardSkill = (positionFormIndex) => {
        this.props.onAddHardSkill(positionFormIndex, this.state.hardSkillDetail)
    }

    showItems = (hardSkill, positionFormIndex) => {
        var result = null;
        result = hardSkill.map((hardSkillDetail, hardSkillIndex) => {
            // console.log(hardSkillIndex,hardSkillDetail)
            return (
                <HardSkillFormContent key={hardSkillIndex}
                    hardSkillDetail={hardSkillDetail}
                    hardSkillIndex={hardSkillIndex}
                    positionFormIndex={positionFormIndex}
                    onDeleteHardSkill={this.props.onDeleteHardSkill}
                    updateHardSkillExpPriority={this.props.updateHardSkillExpPriority}
                    onUpdateHardSkillID={this.props.onUpdateHardSkillID}
                    onUpdateHardSkillCerti={this.props.onUpdateHardSkillCerti}
                />
            );
        })
        return result;
    }

    setMinimize = () => {
        this.setState({
            isMinimize: !this.state.isMinimize
        })
    }

    render() {
        var { hardSkill, positionFormIndex } = this.props

        const showHardSkill = (hardSkill,positionFormIndex) => {
            if (this.state.isMinimize)
                return ""
            else
                return (<div className="card-body">
                    {this.showItems(hardSkill, positionFormIndex)}
                    <span className="material-icons add"
                        onClick={() => this.onAddHardSkill(positionFormIndex)}>add_box</span>
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
                {showHardSkill(hardSkill,positionFormIndex)}
            </div>

        );
    }
}

export default HardSkillForm;