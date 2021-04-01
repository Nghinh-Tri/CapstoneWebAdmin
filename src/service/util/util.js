import axios from "axios";
import jwtDecode from "jwt-decode";

export const API_URL = "https://esms2020.azurewebsites.net/api"

export const callAPI = (endpoint, method = 'GET', body) => {
    return axios({
        method: method,
        url: `${API_URL}/${endpoint}`,
        data: body
    });
};

export const showStatus = status => {
    switch (status) {
        case 0:
            return "Pending"
        case 1:
            return "No Employee"
        case 2:
            return "On Going"
        case 3:
            return "Finish"
        default:
            break;
    }
}

export const showSpan = status => {
    switch (status) {
        case 0:
            return "badge-warning"
        case 1:
            return "badge-secondary"
        case 2:
            return "badge-primary"
        case 3:
            return "badge-success"
        default:
            break;
    }
}

export const showPositionStatus = status => {
    switch (status) {
        case true:
            return "Enable"
        case false:
            return "Disable"
        default:
            break;
    }
}

export const showPositionSpan = status => {
    switch (status) {
        case true:
            return "badge-success"
        case false:
            return "badge-secondary"
        default:
            break;
    }
}

export const formatDate = date => {
    return date.split("/").reverse().join("-")
}

export const convertPositionList = (list) => {
    var result = []
    list.forEach(element => {
        result.push({
            label: element.name,
            value: element.posID,
        })
    });
    return result;
}

export const convertSkillList = (list) => {
    var result = []
    list.forEach(element => {
        result.push({
            label: element.skillName,
            value: element.skillID,
            isSelect: typeof element.isSelect === 'undefined' ? false : element.isSelect
        })
    });
    return result;
}

export const convertCertificationList = (list) => {
    var result = []
    list.forEach(element => {
        result.push({
            label: element.certificationName,
            value: element.certificationID,
            isSelect: typeof element.isSelect === 'undefined' ? false : element.isSelect
        })
    });
    return result;
}

export const convertLanguageList = (list) => {
    var result = []
    list.forEach(element => {
        result.push({
            label: element.langName,
            value: element.langID,
            isSelect: typeof element.isSelect === 'undefined' ? false : element.isSelect
        })
    });
    return result;
}

export const sortSuggestListByOverallMatch = list => {
    list.sort((a, b) => { return b.overallMatch - a.overallMatch })
}

export const sortSuggestListByLanguageMatch = list => {
    list.sort((a, b) => { return b.languageMatch - a.languageMatch })
}

export const sortSuggestListBySoftSkillMatch = list => {
    list.sort((a, b) => { return b.softSkillMatch - a.softSkillMatch })
}

export const sortSuggestListByHardSkillMatch = list => {
    list.sort((a, b) => { return b.hardSkillMatch - a.hardSkillMatch })
}

export const convertSuggestList = list => {
    var result = [], empID = []
    if (list.length > 0) {
        list.forEach(element => {
            var positionObj = { posID: element.posID, empIDs: [] }
            element.candidateSelect.forEach(e => {
                empID.push(e.empID)
            });
            positionObj.empIDs = empID
            result.push(positionObj)
        });
    }
    return result
}

export const getUserName = () => {
    var result = ''
    var token = localStorage.getItem('token')
    var decode = jwtDecode(token)
    Object.keys(decode).forEach(key => {
        let res = key.split('/')
        if (res[res.length - 1] === 'givenname') {
            result = decode[key]
        }
    })
    return result
}

export const getRole = () => {
    var result = ''
    var token = localStorage.getItem('token')
    var decode = jwtDecode(token)
    Object.keys(decode).forEach(key => {
        let res = key.split('/')
        if (res[res.length - 1] === 'role') {
            result = decode[key]
        }
    })
    return result
}

