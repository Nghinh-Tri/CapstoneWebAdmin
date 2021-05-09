import { CERTIFICATION, ERROR, POSITION, POSITION_ASSIGN, SKILL, Type } from "../../constant/index";

var initState = {}

const ErrorReducer = (state = initState, action) => {
    switch (action.type) {
        case ERROR.LOGIN_ERROR:
            state = action.error
            return state
        case ERROR.REGISTER_ERROR:
            state = action.error
            return state
        case Type.REGISTER_SUCCESS:
            state = {}
            return state
        case Type.LOGIN_SUCCESS:
            state = {}
            return state
        case Type.REFRESH_REGISTER_PAGE:
            state = {}
            return state
        case POSITION.CREATE_FAIL:
            state = action.error
            return { ...state }
        case POSITION.REFRESH_PAGE:
            state = {}
            return state
        case SKILL.CREATE_SKILL_FAIL:
            state = action.error
            return { ...state }
        case SKILL.REFRESH_PAGE:
            state = {}
            return state
        case CERTIFICATION.CREATE_FAIL:
            state = action.error
            return { ...state }
        case CERTIFICATION.REFRESH_PAGE:
            state = {}
            return state
        case Type.UPDATE_PROFILE_FAIL:
            state = action.error
            return { ...state }
        case POSITION_ASSIGN.ASSIGN_POSITION_FAIL:
            state = action.error
            return { ...state }
        case POSITION_ASSIGN.REFRESH_PAGE:
            state = {}
            return state
        default:
            return state;
    }
}

export default ErrorReducer;