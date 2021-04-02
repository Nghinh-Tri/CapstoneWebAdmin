import axios from "axios"
import { store } from "react-notifications-component"
import { alertConstants, POSITION_ASSIGN } from "../constant"
import { history } from "../helper/History"
import { API_URL } from "../util/util"

export const generatePositionAssign = (item) => {
    return { type: POSITION_ASSIGN.GENERATE_POSTION_ASSIGN, item }
}

export const updatePosID = (posID) => {
    return { type: POSITION_ASSIGN.UPDATE_POS_ID, posID }
}

export const updatePosLevel = (poslevel) => {
    return { type: POSITION_ASSIGN.UPDATE_POS_LEVEL, poslevel }
}

export const addLanguage = (language) => {
    return { type: POSITION_ASSIGN.ADD_LANGUAGE, language }
}

export const deleteLanguage = (index) => {
    return { type: POSITION_ASSIGN.DELETE_LANGUAGE, index }
}

export const updateLangID = (value, languageIndex) => {
    return { type: POSITION_ASSIGN.UPDATE_LANGUAGE_ID, value, languageIndex }
}

export const updateLangLevel = (value, languageIndex) => {
    return { type: POSITION_ASSIGN.UPDATE_LANGUAGE_LEVEL, value, languageIndex }
}

export const addSoftSkill = (value) => {
    return { type: POSITION_ASSIGN.ADD_SOFT_SKILL, value }
}

export const deleteSoftSkill = (index) => {
    return { type: POSITION_ASSIGN.DELETE_SOFT_SKILL, index }
}

export const updateSoftSkillID = (value, softSkillIndex) => {
    return { type: POSITION_ASSIGN.UPDATE_SOFT_SKILL_ID, value, softSkillIndex }
}

export const addHardSkill = (hardSkill) => {
    return { type: POSITION_ASSIGN.ADD_HARD_SKILL, hardSkill }
}

export const deleteHardSkill = (index) => {
    return { type: POSITION_ASSIGN.DELETE_HARD_SKILL, index }
}

export const updateHardSkillID = (value, hardSkillIndex) => {
    return { type: POSITION_ASSIGN.UPDATE_HARD_SKILL_ID, value, hardSkillIndex }
}

export const updateHardSkillLevel = (value, hardSkillIndex) => {
    return { type: POSITION_ASSIGN.UPDATE_HARD_SKILL_LEVEL, value, hardSkillIndex }
}

export const addCertificate = (hardSkillIndex, certificate) => {
    return { type: POSITION_ASSIGN.ADD_CERTIFICATE, hardSkillIndex, certificate }
}

export const deleteCertificate = (certificateIndex, hardSkillIndex) => {
    return { type: POSITION_ASSIGN.DELETE_CERTIFICATE, certificateIndex, hardSkillIndex }
}

export const updateCertificateID = (value, certificateIndex, hardSkillIndex) => {
    return { type: POSITION_ASSIGN.UPDATE_CERTIFICATE_ID, value, certificateIndex, hardSkillIndex }
}

export const updateCertificateDate = (name, value, certificateIndex, hardSkillIndex) => {
    return { type: POSITION_ASSIGN.UPDATE_CERTIFICATE_DATE, name, value, certificateIndex, hardSkillIndex }
}

export const assignPosition = (empID, positionAssign) => {
    var url = `${API_URL}/User/${empID}`
    return (dispatch) => {
        axios.post(
            url,
            positionAssign,
            { headers: { "Authorization": `Bearer ${JSON.parse(localStorage.getItem('token'))}` } })
            .then(res => {
                if (res.status === 200) {
                    dispatch(assignPositionSuccess())
                }
            })
            .catch(err => {
                store.addNotification({
                    message: err.toString(),
                    type: "danger",
                    insert: "top",
                    container: "top-center",
                    animationIn: ["animated", "fadeIn"],
                    animationOut: ["animated", "fadeOut"],
                    dismiss: {
                        duration: 2000,
                        onScreen: false
                    }
                })
            })
    }
}

export const assignPositionSuccess = () => {
    history.push('/employee');
    return { type: POSITION_ASSIGN.ASSIGN_POSITION }
}

export const assignPositionFail = () => {
    return { type: alertConstants.ERROR }
}