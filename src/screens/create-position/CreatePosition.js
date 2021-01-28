import React, { Component } from 'react';
import { connect } from 'react-redux';
import CreatePositionForm from '../../components/create-position-form/CreatePositionForm';
import * as Action from "../../store/store-action/PositionAction";


class CreatePosition extends Component {

    constructor(props) {
        super(props);
        this.state = {
            position: {
                positionId: "",
                nOC: 0,
                softSkill: [],
                hardSkill: []
            }
        }
    }

    // Position
    onAddPosition = () => {
        this.props.onAddPosition(this.state.position)
    }

    onDeletePositionForm = (positionFormIndex) => {
        this.props.onDeletePosition(positionFormIndex)
    }

    onUpdatePositionID = (positionID, positionFormIndex) => {
        this.props.onUpdatePositionID(positionID, positionFormIndex)
    }

    onUpdateNOC = (nOC, positionFormIndex) => {
        this.props.onUpdateNOC(nOC, positionFormIndex)
    }

    // Soft Skill
    onAddSoftSkill = (positionFormIndex) => {
        this.props.onAddSoftSkillItem(positionFormIndex)
    }

    onDeleteSoftSkill = (softSkillIndex, positionFormIndex) => {
        this.props.onDeleteSoftSkillItem(softSkillIndex, positionFormIndex)
    }

    onUpdateSoftSkillID = (value, softSkillIndex, positionFormIndex) => {
        this.props.onUpdateSoftSkillID(value, softSkillIndex, positionFormIndex)
    }

    // Hard Skill
    onAddHardSkill = (positionFormIndex, hardSkillItem) => {
        this.props.onAddHardSkillItem(positionFormIndex, hardSkillItem)
    }

    onDeleteHardSkill = (hardSkillIndex, positionFormIndex) => {
        this.props.onDeleteHardSkillItem(hardSkillIndex, positionFormIndex)
    }

    updateHardSkillExpPriority = (hardSkillIndex, positionFormIndex, value, name) => {
        this.props.updateHardSkillExpPriority(hardSkillIndex, positionFormIndex, value, name)
    }

    onUpdateHardSkillID = (value, hardSkillIndex, positionFormIndex) => {
        this.props.onUpdateHardSkillID(value, hardSkillIndex, positionFormIndex)
    }

    onUpdateHardSkillCerti = (value, hardSkillIndex, positionFormIndex) => {
        this.props.onUpdateHardSkillCerti(value,hardSkillIndex,positionFormIndex)
    }

    //For render
    showItems = (items) => {
        var result = null;
        result = items.map((item, positionFormIndex) => {
            return (
                <CreatePositionForm key={positionFormIndex}
                    positionFormIndex={positionFormIndex}
                    item={item} //position object
                    //position
                    onDeletePositionForm={this.onDeletePositionForm}
                    onUpdatePositionID={this.onUpdatePositionID}
                    onUpdateNOC={this.onUpdateNOC}
                    //soft skill
                    onAddSoftSkill={this.onAddSoftSkill}
                    onDeleteSoftSkill={this.onDeleteSoftSkill}
                    onUpdateSoftSkillID={this.onUpdateSoftSkillID}
                    //hard skill
                    onAddHardSkill={this.onAddHardSkill}
                    onDeleteHardSkill={this.onDeleteHardSkill}
                    updateHardSkillExpPriority={this.updateHardSkillExpPriority}
                    onUpdateHardSkillID={this.onUpdateHardSkillID}
                    onUpdateHardSkillCerti={this.onUpdateHardSkillCerti}
                />
            );
        })
        return result;
    }

    render() {
        return (
            <div>
                {this.showItems(this.props.items)}
                <div >
                    <button type="button" className="btn btn-primary" onClick={this.onAddPosition}>
                        <i className="material-icons mr-5">add_box</i>
                    More Position
                    </button>
                </div>
                <div >
                    <button type="submit" className="btn btn-primary pull-right">Next</button>
                </div>
            </div>
        );
    }
}

const mapStateToProp = (state) => {
    return {
        items: state.PositionFormReducer
    }
}

const mapDispatchToProp = (dispatch, props) => {
    return {
        onAddPosition: (positionItem) => {
            dispatch(Action.addPositionRequire(positionItem))
        },
        onDeletePosition: (positionFormIndex) => {
            dispatch(Action.deletePositionRequire(positionFormIndex))
        },
        onUpdatePositionID: (positionID, positionFormIndex) => {
            dispatch(Action.updatePositionID(positionID, positionFormIndex))
        },
        onUpdateNOC: (nOC, positionFormIndex) => {
            dispatch(Action.updateNOC(nOC, positionFormIndex))
        },
        onAddSoftSkillItem: positionFormIndex => {
            dispatch(Action.addSoftSkillRequire(positionFormIndex))
        },
        onDeleteSoftSkillItem: (softSkillIndex, positionFormIndex) => {
            dispatch(Action.deleteSoftSkillRequire(softSkillIndex, positionFormIndex))
        },
        onUpdateSoftSkillID: (softSkillID, softSkillIndex, positionFormIndex) => {
            dispatch(Action.updateSoftSkillID(softSkillID, softSkillIndex, positionFormIndex))
        },
        onAddHardSkillItem: (positionFormIndex, hardSkillItem) => {
            dispatch(Action.addHardSkillRequire(positionFormIndex, hardSkillItem))
        },
        onDeleteHardSkillItem: (hardSkillIndex, positionFormIndex) => {
            dispatch(Action.deleteHardSkillRequire(hardSkillIndex, positionFormIndex))
        },
        updateHardSkillExpPriority: (hardSkillIndex, positionFormIndex, value, name) => {
            dispatch(Action.updateHardSkillExpPriority(hardSkillIndex, positionFormIndex, value, name))
        },
        onUpdateHardSkillID: (value, hardSkillIndex, positionFormIndex) => {
            dispatch(Action.updateHardSkillID(value, hardSkillIndex, positionFormIndex))
        },
        onUpdateHardSkillCerti: (value, hardSkillIndex, positionFormIndex) => {
            dispatch(Action.updateHardSkillCerti(value,hardSkillIndex,positionFormIndex))
        }
    }
}

export default connect(mapStateToProp, mapDispatchToProp)(CreatePosition);