import { CERTIFICATION, POSITION, SKILL, Type } from "../../constant";

const initState = false

const StatusReducer = (state = initState, action) => {
    switch (action.type) {
        case SKILL.UPDATE_SKILL:
            state = action.isSuccessed
            return state;
        case SKILL.CREATE_SKILL:
            state = action.isSuccessed
            return state;
        case SKILL.CHANGE_SKILL_STATUS:
            state = action.isSuccessed
            return state;
        case CERTIFICATION.CREATE_CERTIFICATION:
            state = action.isSuccessed
            return state;
        case CERTIFICATION.UPDATE_CERTIFICATION:
            state = action.isSuccessed
            return state;
        case CERTIFICATION.CHANGE_CERTIFICATION_STATUS:
            state = action.isSuccessed
            return state;
        case POSITION.CHANGE_STATUS:
            state = action.isSuccessed
            return state;
        case POSITION.CREATE_SUCCESS:
            state = action.isSuccessed
            return state;
        case POSITION.UDPATE_SUCCESS:
            state = action.isSuccessed
            return state;
        case Type.REGISTER_SUCCESS:
            state = action.isSuccessed
            return state;
        case Type.UPDATE_PROFILE:
            state = action.isSuccessed
            return state;
        default:
            state = false
            return state;
    }
}

export default StatusReducer