import axios from "axios"
import { SKILL } from "../../constant"
import { API_URL } from "../../util/util";
import { history } from "../../helper/History";

export const fetchSkill = (pageIndex, search, skillType, refresh) => {
    var url = ''
    if (search.length > 0)
        url = `${API_URL}/Skill/paging?Keyword=${search}&SkillType=${skillType}&PageIndex=${pageIndex}&PageSize=10`
    else
        url = `${API_URL}/Skill/paging?SkillType=${skillType}&PageIndex=${pageIndex}&PageSize=10`
    return (dispatch) => {
        axios.get(
            url,
            { headers: { "Authorization": `Bearer ${localStorage.getItem('token').replace(/"/g, "")}` } }
        ).then(res => {
            if (res.status = 200) {
                dispatch(fetchSkillSuccess(res.data.resultObj, typeof refresh === 'undefined' ? false : refresh))
            }
        }).catch(err => {
            if (err.response.status === 401) {
                history.push('/login')
            }
        })
    }
}

export const fetchSkillDetail = (skillID) => {
    var url = `${API_URL}/Skill/${skillID}`
    return (dispatch) => {
        axios.get(
            url,
            { headers: { "Authorization": `Bearer ${localStorage.getItem('token').replace(/"/g, "")}` } }
        ).then(res => {
            if (res.status = 200) {
                dispatch(fetchSkillDetailSuccess(res.data.resultObj))
            }
        }).catch(err => {
        })
    }
}

export const updateSkill = (skill) => {
    var url = `${API_URL}/Skill/${skill.skillID}`
    var item = { skillName: skill.skillName, skillType: skill.skillType, hardSkillOption: skill.hardSkillOption, softSkillOption: skill.softSkillOption }
    return (dispatch) => {
        axios.put(
            url,
            item,
            { headers: { "Authorization": `Bearer ${localStorage.getItem('token').replace(/"/g, "")}` } }
        ).then(res => {
            if (res.status = 200) {
                dispatch(updateSkillSuccess())
            }
        }).catch(err => {
            dispatch(createSkillFail(err.response.data.errors))
        })
    }
}

export const changeStatus = (skillID, pageIndex, search) => {
    var url = `${API_URL}/Skill/changeStatus/${skillID}`
    return (dispatch) => {
        axios.put(
            url,
            null,
            { headers: { "Authorization": `Bearer ${localStorage.getItem('token').replace(/"/g, "")}` } }
        ).then(res => {
            if (res.data.isSuccessed) {
                dispatch(fetchSkill(pageIndex, search))
            }
        }).catch(err => {
            dispatch(changeStatusFail(err.response.data.message))
        })
    }
}

export const changeStatusFail = (error) => {
    return { type: SKILL.CHANGE_STATUS_FAIL, error }
}

export const fetchSkillSuccess = (skills, refresh) => {
    return {
        type: SKILL.FETCH_ALL_SKILL,
        skills, refresh
    }
}

export const fetchSkillDetailSuccess = (skill) => {
    return {
        type: SKILL.FETCH_SKILL_DETAIL,
        skill
    }
}

export const fetchSkillFail = () => {
    return { type: SKILL.FETCH_ALL_SKILL_FAIL }
}

export const generateSkill = () => {
    var skill = { skillName: "", skillType: -1, hardSkillOption: [{ projectType: 0, position: [] }], softSkillOption: [] }
    return { type: SKILL.GENERATE_SKILL, skill }
}

export const updateSkillName = (skill) => {
    return { type: SKILL.UPDATE_SKILL_NAME, skill }
}
export const updateSkillType = (skillType) => {
    return { type: SKILL.UPDATE_SKILL_TYPE, skillType }
}

export const addHardSkillOption = () => {
    var option = { projectType: 0, position: [] }
    return { type: SKILL.ADD_HARD_SKILL_OPTION, option }
}

export const deleteHardSkillOption = (index) => {
    return { type: SKILL.DELETE_HARD_SKILL_OPTION, index }
}

export const selectProjectType = (index, projectType) => {
    return { type: SKILL.SELECT_PROJECT_TYPE, index, projectType }
}

export const selectPosition = (index, position) => {
    return { type: SKILL.SELECT_POSITION, index, position }
}

export const selectProjectField = (projectField) => {
    return { type: SKILL.SELECT_PROJECT_FIELD, projectField }
}

export const createSkill = (skill) => {
    var url = `${API_URL}/Skill`
    return (dispatch) => {
        axios.post(
            url,
            skill,
            { headers: { "Authorization": `Bearer ${localStorage.getItem('token').replace(/"/g, "")}` } }
        ).then(res => {
            if (res.data.isSuccessed) {
                dispatch(createSkillSuccess())
            }
        }).catch(err => {
            dispatch(createSkillFail(err.response.data.errors))
        })
    }
}

export const createSkillSuccess = () => {
    history.push('/skill')
    return { type: SKILL.CREATE_SKILL }
}

export const updateSkillSuccess = () => {
    history.push('/skill')
    return { type: SKILL.UPDATE_SKILL }
}

export const changeStatusSuccess = () => {
    return { type: SKILL.CHANGE_STATUS }
}

export const createSkillFail = (error) => {
    return { type: SKILL.CREATE_SKILL_FAIL, error }
}

export const refreshPage = () => {
    return { type: SKILL.REFRESH_PAGE, }
}