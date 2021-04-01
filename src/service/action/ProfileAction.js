import axios from "axios";
import { Type } from "../constant";
import { API_URL, callAPI } from "../util/util";
import { history } from "../helper/History";

export const generateProfile = (profile) => {
    history.push('/employee/register')
    return {
        type: Type.GENERATE_PROFILE,
        profile
    }
}

export const fetchProfile = (pageIndex) => {
    var url = `${API_URL}/User/paging?PageIndex=${pageIndex}&PageSize=6`
    return (dispatch) => {
        axios.get(
            url,
            { headers: { "Authorization": `Bearer ${JSON.parse(localStorage.getItem('token'))}` } }
        ).then(res => {
            dispatch(fetchProfileSuccess(res.data.resultObj))
        })
    }
}

export const fetchProfileSuccess = (resultObj) => {
    return {
        type: Type.FETCH_PROFILE,
        resultObj
    }
}

export const fetchProfileDetail = (id) => {
    var url = `${API_URL}/User/${id}`
    return (dispatch) => {
        return axios.get(
            url,
            { headers: { "Authorization": `Bearer ${JSON.parse(localStorage.getItem('token'))}` } }
        ).then(res => {
            console.log(res)
            dispatch(fetchProfileDetailSuccess(res.data.resultObj))
        })
    }
}

export const fetchProfileDetailSuccess = (resultObj) => {
    return {
        type: Type.FETCH_PROFILE_DETAIL,
        resultObj
    }
}

export const updateProfile = (profile, id) => {
    var url = `${API_URL}/User/${id}`
    return (dispatch) => {
        return axios.put(
            url,
            profile,
            { headers: { "Authorization": `Bearer ${JSON.parse(localStorage.getItem('token'))}` } }).then(res => {
                dispatch(updateProfileSuccess(res.data.resultObj))
            })
    }
}

export const updateProfileSuccess = (resultObj) => {
    return {
        type: Type.UPDATE_PROFILE,
        resultObj
    }
}

export const createUser = (profile, match) => {
    var url = `${API_URL}/User`
    console.log(profile)
    return (dispatch) => {
        return axios.post(
            url,
            profile,
            { headers: { "Authorization": `Bearer ${JSON.parse(localStorage.getItem('token'))}` } }
        ).then(res => {
            if (res.status === 200) {
                localStorage.setItem('EMP', JSON.stringify(res.data.resultObj.empId));
                dispatch(createProfileSuccess(profile))
                if (typeof match === 'undefined') {
                    history.push('/empList/create-position')
                }
                else {
                    history.push(`/empList/detail/${match.params.id}`)

                }
            }
        }).catch(err => {
            if (err.response.status === 401) {

                history.push('/login')
            }
        })
    }
}

export const createProfileSuccess = profile => {
    return {
        type: Type.CREATE_USER,
        profile
    }
}