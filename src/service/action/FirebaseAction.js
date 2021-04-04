import axios from "axios"
import { FIREBASE } from "../constant"
import { API_URL } from "../util/util"

export const recieveNotificate = (token) => {
    // var token = 'evGS6ZxFNACa7en0JEFUKY:APA91bFw-PLLxv34JgXAePonDQr89lBvKKk9Jq7AmJLOEPhBGDszchNcFYOlF5kqXQRwyXO7ZfGSN8wRCwqBJAU1qrsVY6oGvhd5h-Q3BEQNM0_yj5r_5mkGJsEb9_wZf0P0d04ek8lV'
    var url = `${API_URL}/Notification/subscription?token=${token}&topic=news`

    return (dispatch) => {
        axios.post(
            url,
            { headers: { "Authorization": `Bearer ${localStorage.getItem('token').replace(/"/g, "")}` } }
        ).then(res => {
            console.log(res)
            dispatch(recieveNotificateSuccess())
        })
    }
}

export const recieveNotificateSuccess = () => {
    return { type: FIREBASE.RECIEVE_MESSAGE }
}