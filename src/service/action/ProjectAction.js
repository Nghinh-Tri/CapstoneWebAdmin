import axios from "axios";
import { Type } from "../constant";
import { API_URL, callAPI } from "../util/util";
import { history } from "../helper/History";

export const generateProject = (project) => {
    history.push('/project/create-project')
    return {
        type: Type.GENERATE_PROJECT,
        project
    }
}

export const fetchProject = (pageIndex) => {
    var url = `${API_URL}/Project/paging?PageIndex=${pageIndex}&PageSize=5`
    return (dispatch) => {
        axios.get(
            url,
            { headers: { "Authorization": `Bearer ${JSON.parse(localStorage.getItem('token'))}` } }
        ).then(res => {
            dispatch(fetchProjectSuccess(res.data.resultObj))
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
            console.log(res)
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


