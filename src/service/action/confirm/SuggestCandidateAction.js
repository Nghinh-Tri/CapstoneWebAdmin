import axios from "axios"
import { store } from "react-notifications-component"
import { SUGGEST_CANDIDATE } from "../../constant"
import { history } from "../../helper/History"
import { API_URL } from "../../util/util"
import { sendNotificate } from "../firebase/FirebaseAction"

export const setPositionSelect = index => {
    return {
        type: SUGGEST_CANDIDATE.SET_SELECT_POSITION,
        index
    }
}

export const selectCandidate = (check, candidate, posID) => {
    return {
        type: SUGGEST_CANDIDATE.SELECT_CANDIDATE,
        check, candidate, posID
    }
}

export const noteRejectingReason = (value, candidate, posID) => {
    return {
        type: SUGGEST_CANDIDATE.NOTE_REJECTING_REASON,
        value, candidate, posID
    }
}

export const selectAllCandidates = (check, posID) => {
    return {
        type: SUGGEST_CANDIDATE.SELECT_ALL_CANDIDATE,
        check, posID
    }
}

export const fetchSelectedList = () => {
    return {
        type: SUGGEST_CANDIDATE.FETCH_SELECTED_LIST
    }
}

export const fetchSuggestList = (projectID) => {
    var urlToGetListSuggest = `${API_URL}/Project/getCandidates/${projectID}`
    return (dispatch) => {
        axios.get(
            urlToGetListSuggest,
            { headers: { "Authorization": `Bearer ${localStorage.getItem('token').replace(/"/g, "")} ` } }
        ).then(res => {
            if (res.status === 200) {
                dispatch(fetchSuggestListSuccess(res.data.resultObj))
            }
        })
    }
}

export const fetchSuggestListSuccess = (list) => {
    return {
        type: SUGGEST_CANDIDATE.FETCH_SUGGEST_LIST,
        list
    }
}

export const checkRejectCandidatesInSuggestList = (suggestList, projectID) => {
    var checkUrl = `${API_URL}/Project/checkCandidate/${projectID}`
    return (dispatch) => {
        if (suggestList.candidates.length > 0) {
            axios.post(
                checkUrl,
                suggestList,
                { headers: { "Authorization": `Bearer ${localStorage.getItem('token').replace(/"/g, "")} ` } }
            ).then(res => {
                dispatch(rejectedCandidate(res.data.message !== null ? res.data.message : '', res.data.resultObj !== null ? res.data.resultObj : []))
            }).catch(err => {
                console.log(err.response)
            })
        } else {
            dispatch(rejectedCandidate('', []))
        }
    }
}

export const confirmSuggestList = (suggestList, projectID, projectName, pmID, optionType) => {
    var url = `${API_URL}/Project/confirmCandidate/${projectID}`
    return (dispatch) => {
        if (typeof suggestList.candidates.find(e => e.empIDs.find(k => !k.isAccept && k.note.length === 0)) !== 'undefined')
            store.addNotification({
                message: "Please type rejecting reason for the candidate you not accept",
                type: "danger",
                insert: "top",
                container: "top-center",
                animationIn: ["animated", "fadeIn"],
                animationOut: ["animated", "fadeOut"],
                dismiss: {
                    duration: 6000,
                    onScreen: false
                }
            })
        else {
            axios.post(
                url,
                suggestList,
                { headers: { "Authorization": `Bearer ${localStorage.getItem('token').replace(/"/g, "")} ` } }
            ).then(res => {
                if (res.data.isSuccessed) {
                    localStorage.removeItem('projectId')
                    localStorage.removeItem('pmID')
                    localStorage.removeItem('projectType')
                    localStorage.removeItem('projectField')
                    localStorage.removeItem('projectName')
                    localStorage.removeItem('positionRequire')
                    localStorage.removeItem('dateCreate')
                    localStorage.removeItem('dateEnd')
                    // suggestList.candidates.forEach(element => {
                    //     element.empIDs.forEach(e1 => {
                    //         dispatch(sendNotificate(e1, `You has been confirm to join project '${projectName}'`))
                    //     });
                    // });
                    dispatch(confirmSuggestListSuggest(res.data.isSuccessed))
                    dispatch(sendNotificate("" + pmID, `Employee for project '${projectName}' has been confirmed `))

                    // if (typeof optionType !== 'undefined') {
                    //     history.push(`employee/profile/${optionType}`)
                    // } else {
                    //     history.push("/project")
                    // }
                } else {
                    console.log(res.data)
                }
            }).catch(err => {
                if (typeof err.response !== 'undefined')
                    store.addNotification({
                        message: err.response.data.message,
                        type: "danger",
                        insert: "top",
                        container: "top-center",
                        animationIn: ["animated", "fadeIn"],
                        animationOut: ["animated", "fadeOut"],
                        dismiss: {
                            duration: 5000,
                            onScreen: false
                        }
                    })
            })
        }
    }
}

export const confirmSuggestListSuggest = (isSuccessed) => {
    return { type: SUGGEST_CANDIDATE.CONFIRM_SUGGEST, isSuccessed }
}

export const rejectedCandidate = (message, list) => {
    return { type: SUGGEST_CANDIDATE.REJECTED_CANDIDATE, message, list }
}