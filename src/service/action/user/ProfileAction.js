import axios from "axios";
import { Type } from "../../constant";
import { API_URL } from "../../util/util";
import { history } from "../../helper/History";

export const generateProfile = (profile) => {
    history.push('/employee/register')
    return {
        type: Type.GENERATE_PROFILE,
        profile
    }
}

export const fetchProfile = (pageIndex, search, role, refresh) => {
    var url = ''
    if (search.length > 0) {
        url = `${API_URL}/User/paging?Keyword=${search}&RoleName=${role}&PageIndex=${pageIndex}&PageSize=10`
    } else
        url = `${API_URL}/User/paging?RoleName=${role}&PageIndex=${pageIndex}&PageSize=10`
    return (dispatch) => {
        axios.get(
            url,
            { headers: { "Authorization": `Bearer ${JSON.parse(localStorage.getItem('token'))}` } }
        ).then(res => {
            console.log(res.data)
            dispatch(fetchProfileSuccess(res.data.resultObj, typeof refresh === 'undefined' ? false : refresh))
        })
    }
}

export const fetchProfileDetail = (id) => {
    var url = `${API_URL}/User/${id}`
    return (dispatch) => {
        return axios.get(
            url,
            { headers: { "Authorization": `Bearer ${JSON.parse(localStorage.getItem('token'))}` } }
        ).then(res => {
            dispatch(fetchProfileDetailSuccess(res.data.resultObj))
        })
    }
}

export const fetchPositionProfileDetail = (id) => {
    var url = `${API_URL}/User/getEmpInfo/${id}`
    return (dispatch) => {
        return axios.get(
            url,
            { headers: { "Authorization": `Bearer ${JSON.parse(localStorage.getItem('token'))}` } }
        ).then(res => {
            dispatch(fetchPositionProfileDetailSuccess(res.data.resultObj))
        })
    }
}

export const updateProfile = (id, profile) => {
    var url = `${API_URL}/User/${id}`
    return (dispatch) => {
        return axios.put(
            url,
            profile,
            { headers: { "Authorization": `Bearer ${JSON.parse(localStorage.getItem('token'))}` } }
        ).then(res => {
            dispatch(updateProfileSuccess(res.data.isSuccessed))
        }).catch(err => {
            dispatch(updateProfileFail(err.response.data.errors))
        })
    }
}

export const fetchProfileSuccess = (resultObj, refresh) => {
    return {
        type: Type.FETCH_PROFILE,
        resultObj, refresh
    }
}

export const fetchProfileDetailSuccess = (resultObj) => {
    return {
        type: Type.FETCH_PROFILE_DETAIL,
        resultObj
    }
}

export const fetchPositionProfileDetailSuccess = (resultObj) => {
    return {
        type: Type.FETCH_POSITION_PROFILE_DETAIL,
        resultObj
    }
}

export const updateProfileSuccess = (isSuccessed) => {
    return { type: Type.UPDATE_PROFILE, isSuccessed }
}

export const updateProfileFail = (error) => {
    return { type: Type.UPDATE_PROFILE_FAIL, error }
}

export const pushToProfilePage = () => {
    history.push('/profile')
    return { type: Type.PROFILE_PAGE }
}