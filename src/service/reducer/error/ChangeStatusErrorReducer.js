import { CERTIFICATION, POSITION, SKILL } from "../../constant/index";

var initState = ''

const ChangeStatusErrorReducer = (state = initState, action) => {
    switch (action.type) {
        case POSITION.CHANGE_STATUS_FAIL:
            state = action.error
            return state
        case POSITION.REFRESH_PAGE:
            state = ''
            return state

        case SKILL.CHANGE_STATUS_FAIL:
            state = action.error
            return state
        case SKILL.REFRESH_PAGE:
            state = ''
            return state

        case CERTIFICATION.CHANGE_STATUS_FAIL:
            state = action.error
            return state
        case CERTIFICATION.REFRESH_PAGE:
            state = ''
            return state
        default:
            return state;
    }
}

export default ChangeStatusErrorReducer;