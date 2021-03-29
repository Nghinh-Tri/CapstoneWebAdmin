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

export const createPosition = (position) => {
    var url = `${API_URL}/Position`
    return (dispatch) => {
        if (position.name.length === 0) {
            dispatch(createPositionFail())
            store.addNotification({
                message: "Positon name is required",
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
        }
        else if (position.description.length === 0) {
            dispatch(createPositionFail())
            store.addNotification({
                message: "Positon description is required",
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
        } else {
            axios.post(
                url,
                position,
                { headers: { "Authorization": `Bearer ${localStorage.getItem('token').replace(/"/g, "")}` } }
            ).then(res => {
                if (res.status === 200)
                    dispatch(createPositionSuccess())
            }).catch(err => {
                store.addNotification({
                    message: err.response.data.message,
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
            })
        }

    }
}

export const createPositionSuccess = () => {
    history.push('/position')
    return { type: POSITION.CREATE_SUCCESS }
}

export const createPositionFail = () => {
    return { type: POSITION.CREATE_FAIL }
}

export const fetchPostionListSuccess = (positionList) => {
    return {
        type: Type.FETCH_POSITION_LIST,
        positionList
    }
}