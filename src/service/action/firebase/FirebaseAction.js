import axios from "axios"
import { FIREBASE } from "../../constant"
import { API_URL, getUserName } from "../../util/util"
import firebase from "../../firebase/firebase";
import moment from "moment";

export const sendNotificate = (pmID, body) => {
    var pm = ''
    if (typeof pmID === 'string')
        pm = pmID
    var message = {
        title: `Human Resources ${getUserName()} sent a notification`,
        body: body,
        status: true,
        topic: pm,
        dateCreate: moment.now()
    }
    const fb = firebase.database().ref('fir-4d2be-default-rtdb')
    fb.push(message)
}

export const recieveNotificate = (token) => {
    var url = `${API_URL}/Notification/subscription?token=${token}&topic=news`
    return (dispatch) => {
        if (localStorage.getItem('token') !== null && token !== null)
            axios.post(
                url,
                { headers: { "Authorization": `Bearer ${localStorage.getItem('token').replace(/"/g, "")}` } }
            ).then(res => {
                console.log('recieveNotificate ok', res.status)
            }).catch(err => {
                console.log(err)
            })
    }
}

export const recieveNotificateSuccess = () => {
    return { type: FIREBASE.RECIEVE_MESSAGE }
}

export const recieveNotificateFailed = () => {
    return { type: FIREBASE.RECIEVE_MESSAGE }
}

export const sendNotificateSuccess = () => {
    return { type: FIREBASE.RECIEVE_MESSAGE }
}