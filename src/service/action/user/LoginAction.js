import axios from "axios"
import { ERROR, Type } from "../../constant/index"
import { history } from "../../helper/History"
import { API_URL, getEmail, getEmpID, getRole } from "../../util/util"
import { store } from 'react-notifications-component';

export const login = (username, password) => {
    var user = { email: username.trim(), password: password, rememberMe: true }
    return dispatch => {
        dispatch(request())
        axios.post(
            `${API_URL}/User/authenticate`,
            user
        ).then(res => {
            if (res.data.isSuccessed) {
                dispatch(success())
                localStorage.setItem('token', JSON.stringify(res.data.resultObj));
                var role = getRole()
                if (role === 'admin') {
                    history.push('/');
                } else {
                    localStorage.clear()
                    store.addNotification({
                        message: "User role is not match",
                        type: "danger",
                        insert: "top",
                        container: "top-center",
                        animationIn: ["animated", "fadeIn"],
                        animationOut: ["animated", "fadeOut"],
                        dismiss: {
                            duration: 2000,
                            onScreen: false
                        }
                    })
                }
            }
        }).catch(err => {
            if (typeof err.response !== 'undefined') {
                var error = err.response.data
                if (error.errors !== null) {
                    dispatch(loginFailure(error.errors))
                } else {
                    dispatch(loginFailure({}))
                    store.addNotification({
                        message: error.message,
                        type: "danger",
                        insert: "top",
                        container: "top-center",
                        animationIn: ["animated", "fadeIn"],
                        animationOut: ["animated", "fadeOut"],
                        dismiss: {
                            duration: 2000,
                            onScreen: false
                        }
                    })
                }
            }
        })
    }
}

export const request = () => {
    return { type: Type.LOGIN_REQUEST }
}

export const success = () => {
    return { type: Type.LOGIN_SUCCESS }
}

export const register = (emp) => {
    var url = `${API_URL}/User`
    return dispatch => {
        axios.post(
            url,
            emp,
            { headers: { "Authorization": `Bearer ${JSON.parse(localStorage.getItem('token'))}` } })
            .then(res => {
                if (res.status === 200) {
                    dispatch(registerFailure({}))
                    dispatch(registerErrorFailure(''))
                    dispatch(registerSuccess(res.data.resultObj, emp.roleName, emp.name, emp.phoneNumber, emp.email, res.data.isSuccessed))
                }
            })
            .catch(err => {
                if (err.response.status === 400) {
                    if (typeof err.response.data.errors !== 'undefined')
                        dispatch(registerFailure(err.response.data.errors))
                    else {
                        dispatch(registerErrorFailure(err.response.data.message))
                    }
                } else {
                    dispatch(registerFailure(err.response.data.errors))
                }
            })
    }
}

export const changePassword = (password) => {
    var id = getEmpID()
    var email = getEmail()
    var url = `${API_URL}/User/ChangePassword/${id}`
    return dispatch => {
        axios.put(
            url,
            password,
            { headers: { "Authorization": `Bearer ${JSON.parse(localStorage.getItem('token'))}` } })
            .then(res => {
                if (res.status === 200) {
                    dispatch(login(email, password.newPassword))
                }
            })
            .catch(err => {
                if (err.response.status === 400) {
                    if (typeof err.response.data.errors !== 'undefined')
                        dispatch(registerFailure(err.response.data.errors))
                    else {
                        dispatch(registerErrorFailure(err.response.data.message))
                    }
                } else {
                    dispatch(registerFailure(err.response.data.errors))
                }
            })
    }
}

export const refreshPage = () => {
    return { type: Type.REFRESH_REGISTER_PAGE }
}

export const registerRequest = (user) => {
    return { type: Type.REGISTER_REQUEST, user }
}

export const registerSuccess = (userID, role, name, phone, email, isSuccessed) => {   
    return { type: Type.REGISTER_SUCCESS, isSuccessed, resultObj: { userID, role, name, phone, email } }
}

export const registerFailure = (error) => {
    return { type: ERROR.REGISTER_ERROR, error }
}

export const loginFailure = (error) => {
    return { type: ERROR.LOGIN_ERROR, error }
}

export const registerErrorFailure = (error) => {
    return { type: ERROR.DUPLICATE_ERROR, error }
}
