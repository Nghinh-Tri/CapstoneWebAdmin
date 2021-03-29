import { CERTIFICATION, Type } from "../constant/index"
import axios from "axios";
import { API_URL } from "../util/util";
import { store } from "react-notifications-component";
import { history } from "../helper/History";

export const fetchCertification = () => {
    var url = `${API_URL}/Certification/getCertifications`
    return (dispatch) => {
        axios.get(
            url,
            { headers: { "Authorization": `Bearer ${localStorage.getItem('token').replace(/"/g, "")}` } }
        ).then(res => {
            dispatch(fetchCertificationSuccess(res.data.resultObj))
        })
    }
}

export const fetchCertificationPaging = (pageIndex) => {
    var url = `${API_URL}/Certification/paging?PageIndex=${pageIndex}&PageSize=10`
    return (dispatch) => {
        axios.get(
            url,
            { headers: { "Authorization": `Bearer ${localStorage.getItem('token').replace(/"/g, "")}` } }
        ).then(res => {
            dispatch(fetchCertificationPaginSuccess(res.data.resultObj))
        })
    }
}

export const fetchCertificationSuccess = (certiList) => {
    return {
        type: Type.FETCH_CERTIFICATION_LIST,
        certiList
    };
}

export const fetchCertificationPaginSuccess = (certiList) => {
    return {
        type: CERTIFICATION.FETCH_CERTIFICATION_PAGING,
        certiList
    };
}

export const generateCertification = () => {
    var certi = {
        certificationName: "",
        description: "",
        skillID: 0,
        certiLevel: 0
    }
    return { type: CERTIFICATION.GENERATE_CERTIFICATION, certi }
}

export const updateCertificationName = (name, value) => {
    return { type: CERTIFICATION.UPDATE_CERTIFICATION_NAME, name, value }
}

export const updateSKillId = (value) => {
    return { type: CERTIFICATION.UPDATE_SKILL, value }
}

export const updateCertiLevel = (value) => {
    return { type: CERTIFICATION.UPDATE_LEVEL, value }
}

export const createCertification = (certification) => {
    var url = `${API_URL}/Certification`
    return (dispatch) => {
        if (certification.certificationName.length === 0) {
            dispatch(createCertificationFail())
            store.addNotification({
                message: "Certificate name is required",
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
        else if (certification.description.length === 0) {
            dispatch(createCertificationFail())
            store.addNotification({
                message: "Certificate description is required",
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
        else if (certification.skillID === 0) {
            dispatch(createCertificationFail())
            store.addNotification({
                message: "Skill is required",
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
        else if (certification.certiLevel === 0) {
            dispatch(createCertificationFail())
            store.addNotification({
                message: "Certificate level is required",
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
        else {
            axios.post(
                url,
                certification,
                { headers: { "Authorization": `Bearer ${localStorage.getItem('token').replace(/"/g, "")}` } }
            ).then(res => {
                if (res.data.isSuccessed)
                    history.push('/certification')
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

export const createCertificationFail = () => {
    return { type: CERTIFICATION.CREATE_FAIL }
}