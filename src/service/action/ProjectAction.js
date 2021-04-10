import axios from "axios";
import { Type, alertConstants } from "../constant";
import { API_URL } from "../util/util";
import { history } from "../helper/History";
import { sendNotificate } from "./FirebaseAction";

export const generateProject = (project) => {
    history.push('/project/create-project')
    return {
        type: Type.GENERATE_PROJECT,
        project
    }
}

export const fetchProject = (pageIndex, search) => {
    var url = ''
    if (search.length > 0)
        url = `${API_URL}/Project/paging?Keyword=${search}&PageIndex=${pageIndex}&PageSize=10`
    
    else
        url = `${API_URL}/Project/paging?PageIndex=${pageIndex}&PageSize=10`
    return (dispatch) => {
        axios.get(
            url,
            { headers: { "Authorization": `Bearer ${JSON.parse(localStorage.getItem('token'))}` } }
        ).then(res => {
            dispatch(fetchProjectSuccess(res.data.resultObj))
            console.log(res.data.resultObj.totalRecords)
        })
    }
}

export const fetchProjectSuccess = (resultObj) => {
    return {
        type: Type.FETCH_PROJECT,
        resultObj
    }
}

export const fetchProjectDetail = (projectID) => {
    var url = `${API_URL}/Project/${projectID}`
    return (dispatch) => {
        return axios.get(url, { headers: { "Authorization": `Bearer ${JSON.parse(localStorage.getItem('token'))}` } }).then(res => {
            dispatch(fetchProjectDetailSuccess(res.data.resultObj))
        })
    }
}

export const fetchProjectDetailSuccess = (resultObj) => {
    return {
        type: Type.FETCH_PROJECT_DETAIL,
        resultObj
    }
}

export const updateProject = (project, id) => {
    var url = `${API_URL}/Project/${id}`
    return (dispatch) => {
        return axios.put(
            url,
            project,
            { headers: { "Authorization": `Bearer ${JSON.parse(localStorage.getItem('token'))}` } }).then(res => {
                dispatch(updateProjectSuccess(res.data.resultObj))
            })
    }
}

export const updateProjectSuccess = (resultObj) => {
    return {
        type: Type.UPDATE_PROJECT,
        resultObj
    }
}

export const declineProject = (projectID, pmID) => {
    var url = `${API_URL}/Project/${projectID}`
    return (dispatch) => {
        return axios.delete(
            url,
            { headers: { "Authorization": `Bearer ${JSON.parse(localStorage.getItem('token'))}` } }).
            then(res => {
                if (res.data.isSuccessed)
                    dispatch(sendNotificate(pmID, 'declined'))
            }).catch(err => {
                dispatch(declineProjectFail())
            })
    }
}

export const declineProjectSuccess = () => {
    history.push('/project')
    return { type: Type.DECLINE_PROJECT }
}

export const declineProjectFail = () => {
    return { type: alertConstants.ERROR }
}
