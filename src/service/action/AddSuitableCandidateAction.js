import axios from "axios"
import { store } from "react-notifications-component"
import { SUGGEST_CANDIDATE } from "../constant"
import { history } from "../helper/History"
import { API_URL } from "../util/util"
import { sendNotificate } from "./FirebaseAction"
import { fetchSuitableList } from "./SuitableListAction"

export const confirmSuggestList = (suggestList, projectID, projectName, pmID, optionType) => {
    var url = `${API_URL}/Project/confirmCandidate/${projectID}`
    return (dispatch) => {
        axios.post(
            url,
            suggestList,
            { headers: { "Authorization": `Bearer ${localStorage.getItem('token').replace(/"/g, "")} ` } }
        ).then(res => {
            if (res.status === 200) {
                if (res.data.isSuccessed) {
                    dispatch(fetchSuitableList(optionType))
                    dispatch(sendNotificate(pmID, `Employee for project '${projectName}' has been confirmed `))
                } else {
                    console.log(res.data)
                }
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
            // console.log(err.response.data.message)
        })

    }
}

export const confirmSuggestListSuggest = (empid) => {
    history.push(`/employee/profile/${empid}`)
    return { type: SUGGEST_CANDIDATE.CONFIRM_SUGGEST }
}