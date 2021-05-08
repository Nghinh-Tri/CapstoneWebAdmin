import { ERROR, POSITION, Type } from "../constant/index";

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
        case POSITION.CREATE_FAIL:
            state = action.error
            return {...state}
        default:
            return state;
    }
}

export default ErrorReducer;