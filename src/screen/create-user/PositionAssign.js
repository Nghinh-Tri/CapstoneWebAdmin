import React, { Component } from 'react';
import { connect } from 'react-redux';
import SelectBar from '../../component/create-position-form/select-search/SelectBar';
import * as Action from "../../service/action/PositionAssignAction";
import { fetchPostionList } from '../../service/action/PositionSelectBarAction';
import { checkSession } from '../../service/action/AuthenticateAction';
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
        this.props.checkSession()
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

    onDeleteHardSkill = (index) => {
        this.props.onDeleteHardSkill(index)
    }

    onUpdateHardSkillID = (value, hardSkillIndex) => {
        this.props.onUpdateHardSkillID(value, hardSkillIndex)
    }

    onUpdateHardSkillLevel = (value, hardSkillIndex) => {
        this.props.onUpdateHardSkillLevel(value, hardSkillIndex)
    }

    onAddCertificate = (hardSkillIndex, certificate) => {
        this.props.onAddCertificate(hardSkillIndex, certificate)
    }

    onDeleteCertificate = (certificateIndex, hardSkillIndex) => {
        this.props.onDeleteCertificate(certificateIndex, hardSkillIndex)
    }

    onUpdateCertficateID = (value, certificateIndex, hardSkillIndex) => {
        this.props.onUpdateCertficateID(value, certificateIndex, hardSkillIndex)
    }

    onUpdateCertificateDate = (name, value, certificateIndex, hardSkillIndex) => {
        this.props.onUpdateCertificateDate(name, value, certificateIndex, hardSkillIndex)
    }

    onAssignPosition = (e) => {
        e.preventDefault()
    }

    render() {
        var { item, positionList } = this.props
        var listConverted = convertPositionList(positionList)
        console.log('Position Assign', item)
        return (
            <div>
                <div className="card mb-50" style={{ marginRight: 20 }}>
                    <div className="card-header card-header-primary">
                        <h4 className="card-title">Assign Position</h4>
                    </div>
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
                                        name="positionID"
                                        type='common'
                                        placeholder="Select position"
                                        list={listConverted}
                                        onUpdatePositionID={this.onUpdatePositionID}
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
                                <div className="col" style={{ marginLeft: 20, marginTop: 15 }}>
                                    <SelectBar name="posLevel"
                                        type='common'
                                        placeholder="Select position level"
                                        list={this.state.posLevel}
                                        onUpdatePositionLevel={this.onUpdatePositionLevel}
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
                                onDeleteHardSkill={this.onDeleteHardSkill}
                                onUpdateHardSkillID={this.onUpdateHardSkillID}
                                onUpdateHardSkillLevel={this.onUpdateHardSkillLevel}

                                //Certi
                                onAddCertificate={this.onAddCertificate}
                                onDeleteCertificate={this.onDeleteCertificate}
                                onUpdateCertficateID={this.onUpdateCertficateID}
                                onUpdateCertificateDate={this.onUpdateCertificateDate}
                            />

                        </div>
                    </div>
                </div>
                <button type="submit" className="btn btn-primary pull-right" style={{ fontWeight: 700, marginTop: -25, marginRight: 25 }} onClick={this.onAssignPosition} >Assign</button>
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
        checkSession: () => {
            dispatch(checkSession())
        },
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
        },
        onDeleteHardSkill: index => {
            dispatch(Action.deleteHardSkill(index))
        },
        onUpdateHardSkillID: (value, hardSkillIndex) => {
            dispatch(Action.updateHardSkillID(value, hardSkillIndex))
        },
        onUpdateHardSkillLevel: (value, hardSkillIndex) => {
            dispatch(Action.updateHardSkillLevel(value, hardSkillIndex))
        },
        onAddCertificate: (hardSkillIndex, certificate) => {
            dispatch(Action.addCertificate(hardSkillIndex, certificate))
        },
        onDeleteCertificate: (certificateIndex, hardSkillIndex) => {
            dispatch(Action.deleteCertificate(certificateIndex, hardSkillIndex))
        },
        onUpdateCertficateID: (value, certificateIndex, hardSkillIndex) => {
            dispatch(Action.updateCertificateID(value, certificateIndex, hardSkillIndex))
        },
        onUpdateCertificateDate: (name, value, certificateIndex, hardSkillIndex) => {
            dispatch(Action.updateCertificateDate(name, value, certificateIndex, hardSkillIndex))
        },
        onAssignPosition: (empID, item) => {
            dispatch(Action.assignPosition(empID,item))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PositionAssign);