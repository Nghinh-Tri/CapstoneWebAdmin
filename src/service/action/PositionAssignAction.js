import { POSITION_ASSIGN } from "../constant"

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