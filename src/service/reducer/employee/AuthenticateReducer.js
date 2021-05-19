import { ERROR, Type } from "../../constant/index";
import { history } from "../../helper/History";

const initialState = false;

const authentication = (state = initialState, action) => {
    switch (action.type) {
        case Type.LOGIN_REQUEST:
            state = true
            return state
        case Type.LOGIN_SUCCESS:
            state = false
            return state
        case ERROR.LOGIN_ERROR:
            state = false
            return state
        case Type.LOGOUT:
            localStorage.clear()
            history.push('/login')
            state = false
            return state;
        default:
            return state
    }
}

export default authentication