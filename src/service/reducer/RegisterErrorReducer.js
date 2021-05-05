import { ERROR } from "../constant/index";

var initState = { error: '' }

const RegisterErrorReducer = (state = initState, action) => {
    switch (action.type) {
        case ERROR.DUPLICATE_ERROR:
            state.error = action.error
            console.log(state)
            return state
        default:
            return state;
    }
}

export default RegisterErrorReducer;