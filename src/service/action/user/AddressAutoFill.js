import axios from "axios"
import { ADDRESS } from "../../constant"

export const suggestAddress = (value) => {
    const url = `https://rsapi.goong.io/Place/AutoComplete?api_key=DKpuzt04wf86vYHvjhbrr5xlUmxjbReDdMFBaaAQ&input=${value}&location=10.762622,106.660172`
    return (dispatch) => {
        dispatch(suggestAddressSuccess([]))
        return axios.get(
            url
        ).then(res => {
            dispatch(suggestAddressSuccess(res.data.predictions))
        })
    }
}

export const suggestAddressSuccess = (value) => {
    return { type: ADDRESS.SUGGEST, value }
}