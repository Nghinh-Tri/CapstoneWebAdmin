import axios from "axios"
import { FIREBASE } from "../constant"
import { API_URL, getUserName } from "../util/util"
import { fetchProject } from "./ProjectAction"

export const sendNotificate = (pmID, body) => {
    var url = `${API_URL}/Notification?topic=pm${pmID}`
    var token = JSON.parse(localStorage.getItem('FirebaseToken'))
    var message = {
        title: `Human Resources ${getUserName()} send you a notification`,
        body: body
    }
    return (dispatch) => {
        if (localStorage.getItem('token') !== null && token !== null) {
            var unsubcriptUrl = `${API_URL}/Notification/unsubscription?token=${token}&topic=pm${pmID}`
            axios.post(
                unsubcriptUrl,
                { headers: { "Authorization": `Bearer ${localStorage.getItem('token').replace(/"/g, "")}` } }
            ).then(
                axios.post(
                    url,
                    message,
                    { headers: { "Authorization": `Bearer ${localStorage.getItem('token').replace(/"/g, "")}` } }
                ).then(res => {
                    dispatch(sendNotificateSuccess())
                })
            )
        }
    }
}

export const recieveNotificate = (token) => {
    var url = `${API_URL}/Notification/subscription?token=${token}&topic=news`
    return (dispatch) => {
        axios.post(
            url,
            { headers: { "Authorization": `Bearer ${localStorage.getItem('token').replace(/"/g, "")}` } }
        ).then(res => {
            dispatch(fetchProject(1, ''))
        })
    }
}

export const recieveNotificateSuccess = () => {
    return { type: FIREBASE.RECIEVE_MESSAGE }
}

export const sendNotificateSuccess = () => {
    return { type: FIREBASE.RECIEVE_MESSAGE }
}