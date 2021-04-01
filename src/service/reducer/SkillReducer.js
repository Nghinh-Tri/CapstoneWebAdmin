import { SKILL } from "../constant"
import { history } from "../helper/History"

const initState = {}

const skillReducer = (state = initState, action) => {
    switch (action.type) {
        case SKILL.FETCH_ALL_SKILL:
            state = action.skills
            return state
        case SKILL.GENERATE_SKILL:
            state = action.skill
            return state
        case SKILL.UPDATE_SKILL_NAME:
            var clone = { ...state }
            clone.skillName = action.skill
            state = clone
            return state
        case SKILL.UPDATE_SKILL_TYPE:
            var clone = { ...state }
            clone.skillType = parseInt(action.skillType)
            state = clone
            return state
        case SKILL.FETCH_SKILL_DETAIL:
            state = action.skill
            return state
        case SKILL.CHANGE_STATUS:
            history.push('/skill')
        default:
            return state
    }
}

export default skillReducer