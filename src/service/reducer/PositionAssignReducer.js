import { POSITION_ASSIGN } from "../constant"

const initState = {}

const PositionAssignReducer = (state = initState, action) => {
    var clone, language = null
    switch (action.type) {
        case POSITION_ASSIGN.GENERATE_POSTION_ASSIGN:
            state = action.item
            return state

        case POSITION_ASSIGN.UPDATE_POS_ID:
            clone = { ...state }
            clone.posID = action.posID
            state = clone
            return state

        case POSITION_ASSIGN.UPDATE_POS_LEVEL:
            clone = { ...state }
            clone.posLevel = action.poslevel
            state = clone
            return state

        case POSITION_ASSIGN.ADD_LANGUAGE:
            clone = { ...state }
            clone.languages.push(action.language)
            state = clone
            return state

        case POSITION_ASSIGN.DELETE_LANGUAGE:
            clone = { ...state }
            clone.languages.splice(action.index, 1)
            state = clone
            return state

        case POSITION_ASSIGN.UPDATE_LANGUAGE_ID:
            clone = { ...state.languages[action.languageIndex] }
            clone.langID = action.value
            state.languages.splice(action.languageIndex, 1, clone)
            return state

        case POSITION_ASSIGN.UPDATE_LANGUAGE_LEVEL:
            clone = { ...state.languages[action.languageIndex] }
            clone.langLevel = action.value
            state.languages.splice(action.languageIndex, 1, clone)
            return state

        case POSITION_ASSIGN.ADD_SOFT_SKILL:
            clone = { ...state }
            clone.softSkills.push(action.value)
            state = clone
            return state

        case POSITION_ASSIGN.DELETE_SOFT_SKILL:
            clone = { ...state }
            clone.softSkills.splice(action.index, 1)
            state = clone
            return state

        case POSITION_ASSIGN.UPDATE_SOFT_SKILL_ID:
            clone = { ...state.softSkills[action.softSkillIndex] }
            clone = action.value
            state.softSkills.splice(action.softSkillIndex, 1, clone)
            return state

        case POSITION_ASSIGN.ADD_HARD_SKILL:
            clone = { ...state }
            clone.hardSkills.push(action.hardSkill)
            state = clone
            return state

        default:
            return state
    }
}

export default PositionAssignReducer