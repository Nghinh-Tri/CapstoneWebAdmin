import axios from "axios"
import { API_URL } from "../../util/util"

export const exportTemplate = () => {
    var url = `${API_URL}/User/template`
    return (dispatch) => {
        axios.get(
            url,
            {
                headers: { "Authorization": `Bearer ${localStorage.getItem('token').replace(/"/g, "")}` },
                responseType: 'blob'
            }
        ).then(res => {
            const resUrl = window.URL.createObjectURL(new Blob([res.data]))
            const link = document.createElement('a')
            link.href = link
            link.setAttribute('download', 'template.xlsx')
            document.body.appendChild(link)
            link.click()
            dispatch(exportTemplateSuccess())
        }).catch(err=>{
            console.log(err.response)
        })
    }
}

export const exportTemplateSuccess = () => {
    return {}
}