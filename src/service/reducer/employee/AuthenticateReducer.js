import { ERROR, Type } from "../../constant/index";
import { history } from "../../helper/History";

const initialState = { isLoad: false };

const authentication = (state = initialState, action) => {
    switch (action.type) {
        case Type.LOGIN_REQUEST:
            state.isLoad = true
            return state
        case Type.LOGIN_SUCCESS:
            state.isLoad = false
            return state
        case ERROR.LOGIN_ERROR:
            state.isLoad = false
            return state
        case Type.LOGOUT:
            localStorage.clear()
            history.push('/login')
            state.isLoad = false
            return state;
        default:
            return state
    }
}

export default authentication