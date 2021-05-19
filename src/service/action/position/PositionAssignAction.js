import axios from "axios"
import { store } from "react-notifications-component"
import { alertConstants, POSITION_ASSIGN, Type } from "../../constant"
import { history } from "../../helper/History"
import { API_URL } from "../../util/util"

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

export const updateSoftSkillID = (value,) => {
    return { type: POSITION_ASSIGN.UPDATE_SOFT_SKILL_ID, value }
}

export const addHardSkill = (hardSkill) => {
    return { type: POSITION_ASSIGN.ADD_HARD_SKILL, hardSkill }
}

export const deleteHardSkill = (index) => {
    return { type: POSITION_ASSIGN.DELETE_HARD_SKILL, index }
}

export const updateHardSkillID = (value, hardSkillIndex) => {
    var url = `${API_URL}/Certification/getCertifications/${value}`
    return (dispatch) => {
        axios.get(
            url,
            { headers: { "Authorization": `Bearer ${localStorage.getItem('token').replace(/"/g, "")}` } }
        ).then(res => {
            dispatch(updateHardSkillIDSuccess(value, hardSkillIndex, res.data.resultObj))
        })
    }
}

export const updateHardSkillIDSuccess = (value, hardSkillIndex, certiList) => {
    return { type: POSITION_ASSIGN.UPDATE_HARD_SKILL_ID, value, hardSkillIndex, certiList }
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

export const assignPosition = (empID, positionAssign, role) => {
    var url = `${API_URL}/User/${empID}`
    return (dispatch) => {
        axios.post(
            url,
            positionAssign,
            { headers: { "Authorization": `Bearer ${JSON.parse(localStorage.getItem('token'))}` } }
        ).then(res => {
            dispatch(assignPositionSuccess(res.data.isSuccessed))
        }).catch(err => {
            dispatch(assignPositionFail(err.response.data.errors))
        })
    }
}

export const fetchPositionProfileUpdateDetail = (id) => {
    var url = `${API_URL}/User/loadEmpInfo/${id}`
    return (dispatch) => {
        return axios.get(
            url,
            { headers: { "Authorization": `Bearer ${JSON.parse(localStorage.getItem('token'))}` } }
        ).then(res => {
            dispatch(fetchPositionProfileUpdateDetailSuccess(res.data.resultObj))
        })
    }
}

export const updatePositionDetail = (empID, positionAssign, role) => {
    var url = `${API_URL}/User/updateEmpInfo/${empID}`
    return (dispatch) => {
        axios.post(
            url,
            positionAssign,
            { headers: { "Authorization": `Bearer ${JSON.parse(localStorage.getItem('token'))}` } }
        ).then(res => {
            dispatch(updatePositionDetailSuccess(res.data.isSuccessed))
        }).catch(err => {
            dispatch(assignPositionFail(err.response.data.errors))
        })
    }
}

export const fetchPositionProfileUpdateDetailSuccess = (item) => {
    return {
        type: Type.FETCH_POSITION_PROFILE_UDPATE_DETAIL,
        item
    }
}

export const assignPositionSuccess = (isSuccessed) => {
    return { type: POSITION_ASSIGN.ASSIGN_POSITION, isSuccessed }
}

export const assignPositionFail = (error) => {
    return { type: POSITION_ASSIGN.ASSIGN_POSITION_FAIL, error }
}

export const refreshPage = () => {
    return { type: POSITION_ASSIGN.REFRESH_PAGE }
}


export const updatePositionDetailSuccess = (isSuccessed) => {
    return { type: POSITION_ASSIGN.UPDATE_POSITION_DETAIL, isSuccessed }
}