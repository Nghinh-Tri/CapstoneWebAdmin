import axios from "axios"
import { SUGGEST_CANDIDATE } from "../constant"
import { history } from "../helper/History"
import { API_URL } from "../util/util"
import { sendNotificate } from "./FirebaseAction"

export const setPositionSelect = index => {
    return {
        type: SUGGEST_CANDIDATE.SET_SELECT_POSITION,
        index
    }
}

export const selectCandidate = (candidate, candidateList) => {
    return {
        type: SUGGEST_CANDIDATE.SELECT_CANDIDATE,
        candidate, candidateList

    }
}

export const selectAllCandidates = (candidateList) => {
    return {
        type: SUGGEST_CANDIDATE.SELECT_ALL_CANDIDATE,
        candidateList
    }
}

export const unselectCandiate = (candidate, position) => {
    return {
        type: SUGGEST_CANDIDATE.UNSELECT_CANDIDATE,
        candidate, position
    }
}

export const unselectAllCandiates = (position) => {
    return {
        type: SUGGEST_CANDIDATE.UNSELECT_ALL_CANDIDATE,
        position
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

export const confirmSuggestList = (suggestList, projectID, projectName, pmID) => {
    var url = `${API_URL}/Project/confirmCandidate/${projectID}`
    return (dispatch) => {
        axios.post(
            url,
            suggestList,
            { headers: { "Authorization": `Bearer ${localStorage.getItem('token').replace(/"/g, "")} ` } }
        ).then(res => {
            if (res.status === 200) {
                dispatch(confirmSuggestListSuggest())
                dispatch(sendNotificate(pmID, projectName, 'accept'))
                suggestList.candidates.forEach(element => {
                    element.empIDs.forEach(e1 => {
                        dispatch(sendNotificate(e1, projectName, 'accept'))
                    });
                });
                history.push("/project")
            }
        })
    }
}

export const confirmSuggestListSuggest = () => {
    return { type: SUGGEST_CANDIDATE.CONFIRM_SUGGEST }
}