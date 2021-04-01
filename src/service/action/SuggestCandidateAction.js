import axios from "axios"
import { SUGGEST_CANDIDATE } from "../constant"
import { history } from "../helper/History"
import { API_URL } from "../util/util"

export const setPositionSelect = index => {
    return {
        type: SUGGEST_CANDIDATE.SET_SELECT_POSITION,
        index
    }
}

export const selectCandidate = (candidate, position, posId) => {
    return {
        type: SUGGEST_CANDIDATE.SELECT_CANDIDATE,
        candidate, position, posId

    }
}

export const unselectCandiate = (candidate, position) => {
    return {
        type: SUGGEST_CANDIDATE.UNSELECT_CANDIDATE,
        candidate, position
    }
}

export const fetchSelectedList = () => {
    return {
        type: SUGGEST_CANDIDATE.FETCH_SELECTED_LIST
    }
}

export const fetchSuggestList = (projectID) => {
    var urlToGetListSuggest = `${API_URL}/Project/getEmpsInProject/${projectID}`
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

export const confirmSuggestList = (suggestList, projectID) => {
    var url = `${API_URL}/Project/confirmCandidate/${projectID}`
    var candidates = { candidates: suggestList }
    console.log(candidates)
    return (dispatch) => {
        axios.post(
            url,
            candidates,
            { headers: { "Authorization": `Bearer ${localStorage.getItem('token').replace(/"/g, "")} ` } }
        ).then(res => {
            console.log(res)
            if (res.status === 200) {
                dispatch(confirmSuggestListSuggest())
                history.push("/project")
            }
        })
    }
}

export const confirmSuggestListSuggest = () => {
    return { type: SUGGEST_CANDIDATE.CONFIRM_SUGGEST }
}