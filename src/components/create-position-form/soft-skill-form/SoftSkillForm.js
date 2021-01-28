import React, { Component } from 'react';
import SoftSkillFormContent from './soft-skill-form-content/SoftSkillFormContent';

class SoftSkillForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isMinimize: false
        }
    }


    onAddSoftSkill = (positionFormIndex) => {
        this.props.onAddSoftSkill(positionFormIndex)
    }

    showItems = (softSkill, positionFormIndex) => {
        var result = null;
        result = softSkill.map((item, softSkillIndex) => {
            return (
                <SoftSkillFormContent key={softSkillIndex}
                    positionFormIndex={positionFormIndex}
                    softSkillIndex={softSkillIndex}
                    onDeleteSoftSkill={this.props.onDeleteSoftSkill}
                    item={item}
                    onUpdateSoftSkillID={this.props.onUpdateSoftSkillID} />
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
        var { softSkill, positionFormIndex } = this.props
        const showSoftSkill = (softSkill, positionFormIndex) => {
            if (this.state.isMinimize)
                return ""
            else {
                return (<div className="card-body">
                    {this.showItems(softSkill, positionFormIndex)}
                    <span className="material-icons add"
                        onClick={() => this.onAddSoftSkill(positionFormIndex)}>add_box</span>
                </div>)
            }

        }
        return (
            <div className="card mb-50">
                <div className="card-header ">
                    <div className="row">
                        <div className="col">
                            <h5 className="font-weight-bold">Soft Skill</h5>
                        </div>
                        <div className="col pull-right">
                            <span className="material-icons pull-right clear" onClick={this.setMinimize} > {this.state.isMinimize === false ? 'minimize' : 'crop_free'}</span>
                        </div>
                    </div>

                </div>
                {showSoftSkill(softSkill, positionFormIndex)}
            </div>

        );
    }
}

export default SoftSkillForm;