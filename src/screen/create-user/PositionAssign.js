import React, { Component } from 'react';
import { connect } from 'react-redux';
import SelectBar from '../../component/create-position-form/select-search/SelectBar';
import * as Action from "../../service/action/PositionAssignAction";
import { fetchPostionList } from '../../service/action/PositionSelectBarAction';
import { convertPositionList } from '../../service/util/util';
import LanguageForm from "../../component/create-position-form/language-form/LanguageForm";
import SoftSkillForm from "../../component/create-position-form/soft-skill-form/SoftSkillForm";
import HardSkillForm from "../../component/create-position-form/hard-skill-form/HardSkillForm";

class PositionAssign extends Component {

    constructor(props) {
        super(props);
        this.state = {
            positionInfo: {
                posID: 0,
                posLevel: 0,
                languages: [],
                softSkills: [],
                hardSkills: []
            },
            posLevel: [
                { label: 'Intern', value: 1 },
                { label: 'Fresher', value: 2 },
                { label: 'Junior', value: 3 },
                { label: 'Senior', value: 4 },
                { label: 'Master', value: 5 },
            ]
        }
    }

    componentDidMount = () => {
        this.props.onGeneratePotitionAssign(this.state.positionInfo)
        this.props.onFetchPosition()
    }

    onUpdatePositionID = (value) => {
        this.props.onUpdatePosID(value)
    }

    onUpdatePositionLevel = (value) => {
        this.props.onUpdatePosLevel(value)
    }

    onAddLanguage = (language) => {
        this.props.onAddLanguage(language)
    }

    onDeleteLanguage = (index) => {
        this.props.onDeleteLanguage(index)
    }

    onUpdateLanguageID = (value, languageIndex) => {
        this.props.onUpdateLangID(value, languageIndex)
    }

    onUpdateLanguageLevel = (value, languageIndex) => {
        this.props.onUpdateLangLevel(value, languageIndex)
    }

    onAddSoftSkill = (value) => {
        this.props.onAddSoftSkill(value)
    }

    onDeleteSoftSkill = (index) => {
        this.props.onDeleteSoftSkill(index)
    }

    onUpdateSoftSkillID = (value, softSkillIndex) => {
        this.props.onUpdateSoftSkillID(value, softSkillIndex)
    }

    onAddHardSkill = (hardSkill) => {
        this.props.onAddHardSkill(hardSkill)
    }

    render() {
        var { item, positionList } = this.props
        var listConverted = convertPositionList(positionList)
        console.log(item)
        return (
            <div className="card mb-50" style={{ marginRight: 20 }}>
                <div className="card-body">
                    <div className="form-group">
                        <div className="row">
                            {/* Position */}
                            <div className="col-1" style={{ marginLeft: 20, marginTop: 20, }}>
                                <label className="bmd-label  ">
                                    <h4 className="font-weight-bold">
                                        Position
                                </h4>
                                </label>
                            </div>
                            {/* Select Bar */}
                            <div className="col" style={{ marginLeft: 20, marginTop: 15 }}>
                                <SelectBar
                                    list={listConverted}
                                    onUpdatePositionID={this.onUpdatePositionID}
                                    name="positionID"
                                    value={item.posID}
                                />
                            </div>
                            {/* Position Level */}
                            <div className="col-auto" style={{ marginLeft: 20, marginTop: 20, }}>
                                <label className="bmd-label ">
                                    <h4 className="font-weight-bold ">
                                        Position Level
                                    </h4>
                                </label>
                            </div>
                            <div className="col" style={{ marginLeft: 20, marginTop: 16 }}>
                                <SelectBar
                                    list={this.state.posLevel}
                                    onUpdatePositionLevel={this.onUpdatePositionLevel}
                                    name="posLevel"
                                    value={item.posLevel}
                                />
                            </div>
                        </div>

                        <LanguageForm language={item.languages}
                            onAddLanguage={this.onAddLanguage}
                            onDeleteLanguage={this.onDeleteLanguage}
                            onUpdateLanguageID={this.onUpdateLanguageID}
                            onUpdateLanguageLevel={this.onUpdateLanguageLevel} />

                        <SoftSkillForm softSkill={item.softSkills}
                            onAddSoftSkill={this.onAddSoftSkill}
                            onDeleteSoftSkill={this.onDeleteSoftSkill}
                            onUpdateSoftSkillID={this.onUpdateSoftSkillID} />

                        <HardSkillForm hardSkill={item.hardSkills}
                            onAddHardSkill={this.onAddHardSkill}
                        />

                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        item: state.PositionAssignReducer,
        positionList: state.PositionSelectBarReducer
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onGeneratePotitionAssign: item => {
            dispatch(Action.generatePositionAssign(item))
        },
        onFetchPosition: () => {
            dispatch(fetchPostionList())
        },
        onUpdatePosID: (posID) => {
            dispatch(Action.updatePosID(posID))
        },
        onUpdatePosLevel: (poslevel) => {
            dispatch(Action.updatePosLevel(poslevel))
        },
        onAddLanguage: (language) => {
            dispatch(Action.addLanguage(language))
        },
        onDeleteLanguage: (language) => {
            dispatch(Action.deleteLanguage(language))
        },
        onUpdateLangID: (value, languageIndex) => {
            dispatch(Action.updateLangID(value, languageIndex))
        },
        onUpdateLangLevel: (value, languageIndex) => {
            dispatch(Action.updateLangLevel(value, languageIndex))
        },
        onAddSoftSkill: (value) => {
            dispatch(Action.addSoftSkill(value))
        },
        onDeleteSoftSkill: index => {
            dispatch(Action.deleteSoftSkill(index))
        },
        onUpdateSoftSkillID: (value, softSkillIndex) => {
            dispatch(Action.updateSoftSkillID(value, softSkillIndex))
        },
        onAddHardSkill: hardSkill => {
            dispatch(Action.addHardSkill(hardSkill))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PositionAssign);