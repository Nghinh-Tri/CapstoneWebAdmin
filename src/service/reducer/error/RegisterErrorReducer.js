import { ERROR, Type } from "../../constant/index";

var initState = { error: '' }

const RegisterErrorReducer = (state = initState, action) => {
    switch (action.type) {
        case ERROR.DUPLICATE_ERROR:
            state.error = action.error
            return state
        case Type.REFRESH_REGISTER_PAGE:
            state.error = ''
            return state
        default:
            return state;
    }
}

export default RegisterErrorReducer;