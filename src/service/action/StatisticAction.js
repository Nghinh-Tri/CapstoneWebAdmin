import axios from "axios";
import { Type } from "../constant";
import { API_URL, callAPI } from "../util/util";


export const fetchDataStatistics = () => {
    var url = `${API_URL}/Project/getStatistics`
    console.log(url)
    return (dispatch) => {
        axios.get(
            url,
            { headers: { "Authorization": `Bearer ${JSON.parse(localStorage.getItem('token'))}` } }
        ).then(res => {
            dispatch(fetchDataStatisticsSuccess(res.data.resultObj))
            console.log(res.data.resultObj.projectByStatuses)
        })
    }
}

export const fetchDataStatisticsSuccess = (resultObj) => {
    return {
        type: Type.AWAITING_STATISTICS,
        resultObj
    };
}
