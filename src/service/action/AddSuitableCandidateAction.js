import axios from "axios"
import { SUGGEST_CANDIDATE } from "../constant"
import { history } from "../helper/History"
import { API_URL } from "../util/util"
import { sendNotificate } from "./FirebaseAction"

export const confirmSuggestList = (suggestList, projectID, projectName, pmID, optionType) => {
    var url = `${API_URL}/Project/confirmCandidate/${projectID}`
    // console.log('pm', suggestList)
    return (dispatch) => {
        axios.post(
            url,
            suggestList,
            { headers: { "Authorization": `Bearer ${localStorage.getItem('token').replace(/"/g, "")} ` } }
        ).then(res => {
            if (res.status === 200) {
                if (res.data.isSuccessed) {
                    setTimeout(() => {
                        console.log('ok')
                        dispatch(sendNotificate(pmID, `Employee for project '${projectName}' has been confirmed `))
                    }, 5000);
                    // suggestList.candidates.forEach(element => {
                    //     element.empIDs.forEach(e1 => {
                    //         setTimeout(() => {
                    //             dispatch(sendNotificate(e1, `You has been confirm to join project '${projectName}'`))
                    //         }, 5000);
                    //     });
                    // });
                    dispatch(confirmSuggestListSuggest(optionType))
                } else {
                    console.log(res.data)
                }
            }
        }).catch(err => {
            // store.addNotification({
            //     message: err.response.data.message,
            //     type: "danger",
            //     insert: "top",
            //     container: "top-center",
            //     animationIn: ["animated", "fadeIn"],
            //     animationOut: ["animated", "fadeOut"],
            //     dismiss: {
            //         duration: 2000,
            //         onScreen: false
            //     }
            // })
            // console.log(err.response.data.message)
        })

    }
}

export const confirmSuggestListSuggest = (empid) => {
    history.push(`/employee/profile/${empid}`)
    return { type: SUGGEST_CANDIDATE.CONFIRM_SUGGEST }
}