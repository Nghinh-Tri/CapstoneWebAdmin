import { Type } from "../constant/index";
import { history } from "../helper/History";
    

let user = JSON.parse(localStorage.getItem('user'));
const initialState = user ? { loggedIn: true, user } : {};

const authentication = (state = initialState, action) => {
    switch (action.type) {
        case Type.LOGIN_REQUEST:
            return {
                loggingIn: true,
                user: action.user
            };
        case Type.LOGIN_SUCCESS:
            return {
                loggedIn: true,
                user: action.user
            };
        case Type.LOGIN_FAILURE:
            return {};
        case Type.LOGOUT:
            case Type.LOGOUT:
            localStorage.clear()
            history.push('/login')
            return {};
        case Type.REGISTER_REQUEST:
            return {
                registering: true
            }
        case Type.REGISTER_SUCCESS:
            return {
                registering: true,
                user: action.user
            }
        case Type.REGISTER_FAILURE:
            return {};
        default:
            return state
    }
}

export default authentication