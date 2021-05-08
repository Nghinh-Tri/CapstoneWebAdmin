import { POSITION, Type } from "../constant/index"
import axios from "axios";
import { API_URL } from "../util/util";
import { store } from "react-notifications-component";
import { history } from "../helper/History";

export const fetchPostionList = () => {
    var url = `${API_URL}/Position/getPositions`
    return (dispatch) => {
        axios.get(
            url,
            { headers: { "Authorization": `Bearer ${localStorage.getItem('token').replace(/"/g, "")}` } }
        ).then(res => {
            dispatch(fetchPostionListSuccess(res.data.resultObj))
        })
    }
}

export const fetchPostionListPaging = (pageIndex, search) => {
    var url = ''
    if (search.length === 0)
        url = `${API_URL}/Position/paging?PageIndex=${pageIndex}&PageSize=10`
    else
        url = `${API_URL}/Position/paging?Keyword=${search}&PageIndex=${pageIndex}&PageSize=10`
    return (dispatch) => {
        axios.get(
            url,
            { headers: { "Authorization": `Bearer ${localStorage.getItem('token').replace(/"/g, "")}` } }
        ).then(res => {
            dispatch(fetchPostionListPaginSuccess(res.data.resultObj))
        })
    }
}

export const fetchPostionDetail = (posID) => {
    var url = `${API_URL}/Position/${posID}`
    return (dispatch) => {
        axios.get(
            url,
            { headers: { "Authorization": `Bearer ${localStorage.getItem('token').replace(/"/g, "")}` } }
        ).then(res => {
            dispatch(fetchPostionDetailSuccess(res.data.resultObj))
        })
    }
}

export const createPosition = (position) => {
    var url = `${API_URL}/Position`
    return (dispatch) => {
        axios.post(
            url,
            position,
            { headers: { "Authorization": `Bearer ${localStorage.getItem('token').replace(/"/g, "")}` } }
        ).then(res => {
            dispatch(createPositionSuccess())
        }).catch(err => {
            dispatch(createPositionFail(err.response.data.errors))
        })
    }
}

export const updatePosition = (posID, position) => {
    var url = `${API_URL}/Position/${posID}`
    return (dispatch) => {
        axios.put(
            url,
            position,
            { headers: { "Authorization": `Bearer ${localStorage.getItem('token').replace(/"/g, "")}` } }
        ).then(res => {
            if (res.status === 200)
                dispatch(updatePositionSuccess())
        })
    }
}

export const changeStatusPosition = (posID, pageIndex, search) => {
    var url = `${API_URL}/Position/changeStatus/${posID}`
    return (dispatch) => {
        axios.put(
            url,
            null,
            { headers: { "Authorization": `Bearer ${localStorage.getItem('token').replace(/"/g, "")}` } }
        ).then(res => {
            if (res.status === 200)
                dispatch(fetchPostionListPaging(pageIndex, search))
        })
    }
}

export const createPositionSuccess = () => {
    history.push('/position')
    return { type: POSITION.CREATE_SUCCESS }
}

export const createPositionFail = (error) => {
    return { type: POSITION.CREATE_FAIL, error }
}

export const fetchPostionListSuccess = (positionList) => {
    return {
        type: Type.FETCH_POSITION_LIST,
        positionList
    }
}

export const fetchPostionDetailSuccess = (pos) => {
    return {
        type: POSITION.FETCH_POSITION_DETAIL,
        pos
    }
}

export const updatePositionSuccess = () => {
    history.push('/position')
    return { type: POSITION.UDPATE_SUCCESS }
}


export const fetchPostionListPaginSuccess = (positionList) => {
    return {
        type: POSITION.FETCH_POSITION_LIST_PAGING,
        positionList
    }
}

