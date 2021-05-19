import axios from "axios"
import { store } from "react-notifications-component"
import { SUGGEST_CANDIDATE } from "../../constant"
import { API_URL } from "../../util/util"
import { sendNotificate } from "../firebase/FirebaseAction"

export const confirmSuggestList = (suggestList, projectID, projectName, pmID, optionType) => {
    var url = `${API_URL}/Project/confirmCandidate/${projectID}`
    return (dispatch) => {
        axios.post(
            url,
            suggestList,
            { headers: { "Authorization": `Bearer ${localStorage.getItem('token').replace(/"/g, "")} ` } }
        ).then(res => {
            if (res.data.isSuccessed) {
                dispatch(confirmSuggestListSuggest(res.data.isSuccessed))
                dispatch(sendNotificate(pmID, `Employee for project '${projectName}' has been confirmed `))
            }
        }).catch(err => {
            if (typeof err.response !== 'undefined')
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
        })
    }
}

export const confirmSuggestListSuggest = (isSuccessed) => {
    return { type: SUGGEST_CANDIDATE.CONFIRM_SUGGEST, isSuccessed }
}