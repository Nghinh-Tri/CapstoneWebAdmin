import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as Action from "../../service/action/position/PositionAssignAction";
import { fetchPostionList } from '../../service/action/position/PositionSelectBarAction';
import { checkSession } from '../../service/action/user/AuthenticateAction';
import LanguageForm from "../../component/create-position-form/language-form/LanguageForm";
import SoftSkillForm from "../../component/create-position-form/soft-skill-form/SoftSkillForm";
import HardSkillForm from "../../component/create-position-form/hard-skill-form/HardSkillForm";
import { compose } from 'redux';
import { withRouter } from 'react-router';
import { convertEmpInfo } from '../../service/util/util';
import { Modal, Spin } from 'antd';
import { history } from '../../service/helper/History';

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
            ],
            isLoad: true,
            isSubmit: false
        }
    }

    componentDidMount = () => {
        this.props.checkSession()
        this.props.onFetchPosition()
        var { match } = this.props
        if (typeof match !== 'undefined') {
            this.props.fetchPositionDetail(match.params.id) //update
        }
        else
            this.props.onGeneratePotitionAssign(this.state.positionInfo) //create
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.item !== prevState.item) {
            return { someState: nextProps.item };
        }
        return null;
    }

    componentDidUpdate(prevProps) {
        if (prevProps.status !== this.props.status) {
            if (this.state.isSubmit)
                if (this.props.status) {
                    var { location } = this.props
                    let empID = ''
                    if (typeof this.props.match.params.id !== 'undefined') {
                        empID = this.props.match.params.id
                    }
                    Modal.success({
                        title: typeof location.state.empID !== 'undefined' ?
                            'Assing Employee Skill Successfully' :
                            'Assing Employee Skill Successfully',
                        onOk() {
                            if (typeof location.state.empID !== 'undefined') {//create
                                history.push('/employee');
                            } else {
                                history.push(`/employee/profile/${empID}`)
                            }
                        }
                    })
                }
                else
                    Modal.error({
                        title: 'Create Position Failed'
                    })
        } else if (prevProps.item !== this.props.item) {
            this.setState({ isLoad: false })
        }
    }

    componentWillUnmount = () => {
        localStorage.removeItem('name')
        localStorage.removeItem('phone')
        localStorage.removeItem('email')
        this.props.refreshPage()
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

    onUpdateSoftSkillID = (value) => {
        this.props.onUpdateSoftSkillID(value)
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

    isCheck = (check, certificateIndex, hardSkillIndex) => {
        this.props.onCheckCertificateExpirationDate(check, certificateIndex, hardSkillIndex)
    }

    onAssignPosition = (e) => {
        e.preventDefault()
        this.setState({ isSubmit: true })
        var itemConverted = convertEmpInfo(this.props.item)
        if (typeof this.props.location.state.empID !== 'undefined') {//create
            this.props.onAssignPosition(this.props.location.state.empID, itemConverted, this.props.location.state.role)
        } else {
            this.props.updatePosition(this.props.match.params.id, itemConverted, this.props.location.state.role)
        }
    }

    render() {
        var { item, error } = this.props
        return (
            <React.Fragment>
                <div className="row breadcrumb mb-4 mt-3">
                    <div className='col'>
                        <li className="breadcrumb-item active" style={{ fontWeight: 600 }}>{localStorage.getItem('name')}</li>
                    </div>
                    <div className='col'>
                        <li className="breadcrumb-item active" style={{ fontWeight: 600 }}>Phone: {localStorage.getItem('phone')}</li>
                    </div>
                    <div className='col'>
                        <li className="breadcrumb-item active" style={{ fontWeight: 600 }}>Email: {localStorage.getItem('email')}</li>
                    </div>
                </div>
                {this.state.isLoad ?
                    <div className="row justify-content-center">
                        <Spin className="text-center" size="large" />
                    </div> :

                    <div class="card mb-4">
                        <div class="card-body">
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
                                isCheck={this.isCheck}
                                hardSkillError={error}
                            />
                            <LanguageForm language={item.languages}
                                onAddLanguage={this.onAddLanguage}
                                onDeleteLanguage={this.onDeleteLanguage}
                                onUpdateLanguageID={this.onUpdateLanguageID}
                                onUpdateLanguageLevel={this.onUpdateLanguageLevel}
                                languageError={error}
                            />

                            <SoftSkillForm softSkill={item.softSkills}
                                onUpdateSoftSkillID={this.onUpdateSoftSkillID}
                                softSkillError={error}
                            />
                            <button type="submit" className="btn btn-primary pull-right" style={{ fontWeight: 700, marginTop: 10 }} onClick={this.onAssignPosition} >Assign</button>
                        </div>
                    </div>
                }
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        item: state.PositionAssignReducer,
        positionList: state.PositionSelectBarReducer,
        error: state.ErrorReducer,
        status: state.StatusReducer
    }
}

const mapDispatchToProps = dispatch => {
    return {
        checkSession: () => {
            dispatch(checkSession())
        },
        fetchPositionDetail: (empID) => {
            dispatch(Action.fetchPositionProfileUpdateDetail(empID))
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
        onUpdateSoftSkillID: (value) => {
            dispatch(Action.updateSoftSkillID(value))
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
        onCheckCertificateExpirationDate: (check, certificateIndex, hardSkillIndex) => {
            dispatch(Action.checkCertificateExpirationDate(check, certificateIndex, hardSkillIndex))
        },
        onAssignPosition: (empID, item, role) => {
            dispatch(Action.assignPosition(empID, item, role))
        },
        updatePosition: (empID, item, role) => {
            dispatch(Action.updatePositionDetail(empID, item, role))
        },
        refreshPage: () => {
            dispatch(Action.refreshPage())
        }
    }
}

export default compose(withRouter, connect(mapStateToProps, mapDispatchToProps))(PositionAssign);