import { CERTIFICATION, Type } from "../../constant/index"
import axios from "axios";
import { API_URL } from "../../util/util";

export const fetchCertification = (hardSkillID) => {
    var url = `${API_URL}/Certification/getCertifications/${hardSkillID}`
    return (dispatch) => {
        axios.get(
            url,
            { headers: { "Authorization": `Bearer ${localStorage.getItem('token').replace(/"/g, "")}` } }
        ).then(res => {
            dispatch(fetchCertificationSuccess(res.data.resultObj))
        })
    }
}

export const fetchCertificationPaging = (pageIndex, search, refresh) => {
    var url = ''
    if (search.length > 0)
        url = `${API_URL}/Certification/paging?Keyword=${search}&PageIndex=${pageIndex}&PageSize=10`
    else
        url = `${API_URL}/Certification/paging?PageIndex=${pageIndex}&PageSize=10`
    return (dispatch) => {
        axios.get(
            url,
            { headers: { "Authorization": `Bearer ${localStorage.getItem('token').replace(/"/g, "")}` } }
        ).then(res => {
            dispatch(fetchCertificationPagingSuccess(res.data.resultObj, typeof refresh === 'undefined' ? false : refresh))
        })
    }
}

export const fetchCertificationDetail = (certiID) => {
    var url = `${API_URL}/Certification/${certiID}`
    return (dispatch) => {
        axios.get(
            url,
            { headers: { "Authorization": `Bearer ${localStorage.getItem('token').replace(/"/g, "")}` } }
        ).then(res => {
            dispatch(fetchCertificationDetailSuccess(res.data.resultObj))
        })
    }
}

export const createCertification = (certification) => {
    var url = `${API_URL}/Certification`
    return (dispatch) => {
        axios.post(
            url,
            certification,
            { headers: { "Authorization": `Bearer ${localStorage.getItem('token').replace(/"/g, "")}` } }
        ).then(res => {
            dispatch(createCertificationSuccess(res.data.isSuccessed))
        }).catch(err => {
            dispatch(createCertificationFail(err.response.data.errors))
        })
    }
}

export const updateCertificate = (certi) => {
    var url = `${API_URL}/Certification/${certi.certificationID}`
    var item = {
        certificationName: certi.certificationName,
        description: certi.description,
        skillID: certi.skillID,
        certiLevel: certi.certiLevel
    }
    return (dispatch) => {
        axios.put(
            url,
            item,
            { headers: { "Authorization": `Bearer ${localStorage.getItem('token').replace(/"/g, "")}` } }
        ).then(res => {
            dispatch(updateCertificateSuccess(res.data.isSuccessed))
        }).catch(err => {
            dispatch(createCertificationFail(err.response.data.errors))
        })
    }
}

export const changeStatus = (certificationID) => {
    var url = `${API_URL}/Certification/changeStatus/${certificationID}`
    return (dispatch) => {
        axios.put(
            url,
            null,
            { headers: { "Authorization": `Bearer ${localStorage.getItem('token').replace(/"/g, "")}` } }
        ).then(res => {
            dispatch(changeStatusSuccess(res.data.isSuccessed))
        }).catch(err => {
            dispatch(changeStatusFail(err.response.data.message))
        })
    }
}

export const changeStatusSuccess = (isSuccessed) => {
    return { type: CERTIFICATION.CHANGE_CERTIFICATION_STATUS, isSuccessed }
}

export const changeStatusFail = (error) => {
    return { type: CERTIFICATION.CHANGE_STATUS_FAIL, error }
}

export const fetchCertificationSuccess = (certiList) => {
    return { type: Type.FETCH_CERTIFICATION_LIST, certiList };
}

export const fetchCertificationPagingSuccess = (certiList, refresh) => {
    return { type: CERTIFICATION.FETCH_CERTIFICATION_PAGING, certiList, refresh };
}

export const fetchCertificationDetailSuccess = (certi) => {
    return { type: CERTIFICATION.FETCH_CERTIFICATION_DETAIL, certi };
}

export const createCertificationSuccess = (isSuccessed) => {
    return { type: CERTIFICATION.CREATE_CERTIFICATION, isSuccessed }
}

export const createCertificationFail = (error) => {
    return { type: CERTIFICATION.CREATE_FAIL, error }
}

export const updateCertificateSuccess = (isSuccessed) => {
    return { type: CERTIFICATION.UPDATE_CERTIFICATION, isSuccessed }
}

export const refreshPage = () => {
    return { type: CERTIFICATION.REFRESH_PAGE }
}