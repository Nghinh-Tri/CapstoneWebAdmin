import axios from "axios"
import { alertConstants, FIREBASE } from "../constant"
import { API_URL, getUserName } from "../util/util"
import { fetchProject } from "./ProjectAction"

export const sendNotificate = (pmID, projectName, type) => {
    var url = `${API_URL}/Notification?topic=${pmID}`
    var message = {
        title: `Human Resources ${getUserName()} send you a notification`,
        body: `Project ${projectName} has been ${type === 'accept' ? 'accepted' : 'declined'}`
    }
    return (dispatch) => {
        if (localStorage.getItem('token') !== null) {
            axios.post(
                url,
                message,
                { headers: { "Authorization": `Bearer ${localStorage.getItem('token').replace(/"/g, "")}` } }
            ).then(res => {
                dispatch(sendNotificateSuccess())
            })
        }
        else {
            dispatch(recieveNotificateFail())
        }
    }
}

export const recieveNotificate = (token) => {
    var url = `${API_URL}/Notification/subscription?token=${token}&topic=news`
    return (dispatch) => {
        if (localStorage.getItem('token') !== null) {
            axios.post(
                url,
                { headers: { "Authorization": `Bearer ${localStorage.getItem('token').replace(/"/g, "")}` } }
            ).then(res => {
                dispatch(fetchProject(1, ''))
            })
        } else {
            dispatch(recieveNotificateFail())
        }
    }
}

export const recieveNotificateSuccess = () => {
    return { type: FIREBASE.RECIEVE_MESSAGE }
}

export const sendNotificateSuccess = () => {
    return { type: FIREBASE.RECIEVE_MESSAGE }
}

export const recieveNotificateFail = () => {
    return { type: alertConstants.ERROR }
}