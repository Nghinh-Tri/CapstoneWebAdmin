import axios from "axios"
import { Type } from "../constant/index"
import { history } from "../helper/History"
import { API_URL, getRole } from "../util/util"
import { store } from 'react-notifications-component';

export const login = (username, password) => {
    var user = { email: username, password: password, rememberMe: true }
    return dispatch => {
        dispatch(request(user))
        axios.post(`${API_URL}/User/authenticate`, user).then(res => {
            if (res.status === 200) {
                localStorage.setItem('EMP', JSON.stringify(res.data.resultObj.empId));
                localStorage.setItem('token', JSON.stringify(res.data.resultObj.token));
                var role = getRole()
                if (role === 'admin') {
                    dispatch(success(JSON.stringify(res.data.resultObj)))
                    history.push('/');
                } else {
                    localStorage.clear()
                    dispatch(failure())
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
        })
            .catch(err => {
                dispatch(failure(err.toString()));
                if (err.response.status === 500) {
                    store.addNotification({
                        message: "Duplicate email or username",
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
                } else {
                    store.addNotification({
                        message: err.toString(),
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

            })
    }
}

export const request = (user) => {
    return {
        type: Type.LOGIN_REQUEST,
        user
    }
}

export const success = (user) => {
    return {
        type: Type.LOGIN_SUCCESS,
        user
    }
}

export const failure = (user) => {
    return {
        type: Type.LOGIN_FAILURE,
        user
    }
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
                    dispatch(registerSuccess(res.data.resultObj, emp.roleName))
                }
            })
            .catch(err => {
                console.log(err.response)
                dispatch(failure(err.toString()));
                // if (err.response.status === 500) {
                //     store.addNotification({
                //         message: "Duplicate email or username",
                //         type: "danger",
                //         insert: "top",
                //         container: "top-center",
                //         animationIn: ["animated", "fadeIn"],
                //         animationOut: ["animated", "fadeOut"],
                //         dismiss: {
                //             duration: 2000,
                //             onScreen: false
                //         }
                //     })
                // } else {
                //     store.addNotification({
                //         message: err.response.message,
                //         type: "danger",
                //         insert: "top",
                //         container: "top-center",
                //         animationIn: ["animated", "fadeIn"],
                //         animationOut: ["animated", "fadeOut"],
                //         dismiss: {
                //             duration: 2000,
                //             onScreen: false
                //         }
                //     })
                // }
            })
    }
}

export const registerRequest = (user) => {
    return {
        type: Type.REGISTER_REQUEST,
        user
    }
}

export const registerSuccess = (userID, role) => {
    if (role === 'Employee' || role === 'PM') {
        history.push('/employee/position-assign', { empID: userID, role: role });
    }
    else {
        history.push('/employee')
    }
    return { type: Type.REGISTER_SUCCESS }
}

export const registerFailure = (user) => {
    return {
        type: Type.REGISTER_FAILURE,
        user
    }

}
