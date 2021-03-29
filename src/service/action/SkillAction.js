import axios from "axios"
import { SKILL } from "../constant"
import { API_URL } from "../util/util";
import { history } from "../helper/History";
import { store } from "react-notifications-component";

export const fetchSkill = (pageIndex) => {
    var url = `${API_URL}/Skill/paging?PageIndex=${pageIndex}&PageSize=10`
    return (dispatch) => {
        axios.get(
            url,
            { headers: { "Authorization": `Bearer ${localStorage.getItem('token').replace(/"/g, "")}` } }
        ).then(res => {
            if (res.status = 200) {
                dispatch(fetchSkillSuccess(res.data.resultObj))
            }
        }).catch(err => {
            if (err.response.status === 401) {
                history.push('/login')
            }
        })
    }
}

export const fetchSkillSuccess = (skills) => {
    return {
        type: SKILL.FETCH_ALL_SKILL,
        skills
    }
}

export const fetchSkillFail = () => {
    return { type: SKILL.FETCH_ALL_SKILL_FAIL }
}

export const generateSkill = () => {
    var skill = { skillName: "", skillType: -1 }
    return { type: SKILL.GENERATE_SKILL, skill }
}

export const updateSkill = (skill) => {
    return { type: SKILL.UPDATE_SKILL, skill }
}
export const updateSkillType = (skillType) => {
    return { type: SKILL.UPDATE_SKILL_TYPE, skillType }
}

export const createSkill = (skill) => {
    console.log('skill', skill)
    var url = `${API_URL}/Skill`
    return (dispatch) => {
        if (skill.skillName.length === 0) {
            dispatch(createSkillFail())
            store.addNotification({
                message: "Skill name is required",
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
        }
        else if (skill.skillType === -1) {
            dispatch(createSkillFail())
            store.addNotification({
                message: "Skill type is required",
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
        } else {
            axios.post(
                url,
                skill,
                { headers: { "Authorization": `Bearer ${localStorage.getItem('token').replace(/"/g, "")}` } }
            ).then(res => {
                console.log('res', res)
                if (res.status = 200 && res.data.isSuccessed) {
                    dispatch(createSkillSuccess())
                }
            }).catch(err => {
                store.addNotification({
                    message: err.response.data.message,
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
}

export const createSkillSuccess = () => {
    history.push('/skill')
    return { type: SKILL.CREATE_SKILL }
}

export const createSkillFail = () => {
    return { type: SKILL.CREATE_SKILL_FAIL }
}