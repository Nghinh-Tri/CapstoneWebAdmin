import { Modal } from "antd";
import TextArea from "antd/lib/input/TextArea";
import axios from "axios";
import { PROFILE } from "../../constant";
import { API_URL, getEmpID } from "../../util/util";
import { registerSuccess } from "../user/LoginAction";
const FileDownload = require('js-file-download');
export const addFile = (fileList) => {
    var url = `${API_URL}/User/Import`;
    const formData = new FormData();
    for (let file of fileList) {
        formData.append("file", file);
    }
    return (dispatch) => {
        axios.put(
            url,
            formData,
            { headers: { Authorization: `Bearer ${localStorage.getItem("token").replace(/"/g, "")}` }, }
        ).then((res) => {
            if (res.data.isSuccessed) {
                dispatch(registerSuccess(res.data.resultObj.id, 'Employee', res.data.resultObj.name,
                    res.data.resultObj.phoneNumber, res.data.resultObj.email, res.data.isSuccessed));
                dispatch(addFileSuccess(res.data.isSuccessed))
            }
        }).catch((err) => {
            let error = 'Import CV File  Failed'
            let content = ''
            if (err.response.status === 403) {
                let errors = err.response.data.errors
                Object.keys(errors).forEach(key => {
                    errors[key].forEach(element => {
                        content += element + '\n'
                    });
                })
            }
            Modal.error({
                title: error,
                content: (<>
                    <TextArea defaultValue={content} disabled={true} autoSize={true}
                        style={{ color: 'black', backgroundColor: 'white', borderColor: 'white', cursor: 'default' }} />
                </>)
            })
            dispatch(addFileFail(false));
        });
    };
};

export const downloadCVFile = (empID) => {
    var url = `${API_URL}/User/Export/${empID}`;
    return (dispatch) => {
        axios.get(
            url,
            {
                headers: { Authorization: `Bearer ${localStorage.getItem("token").replace(/"/g, "")}` },
                responseType: 'blob'
            }
        ).then(res => {
            FileDownload(res.data, 'CV.xlsx')
            dispatch(exportSuccess())
        }).catch(err => {
            console.log('err', err)
        })
    }
}

export const exportTemplate = (empID) => {
    var url = `${API_URL}/User/template/${getEmpID()}`;
    return (dispatch) => {
        axios.get(
            url,
            {
                headers: { Authorization: `Bearer ${localStorage.getItem("token").replace(/"/g, "")}` },
                responseType: 'blob'
            }
        ).then(res => {
            FileDownload(res.data, 'Template CV.xlsx')
            dispatch(exportSuccess())
        }).catch(err => {
            console.log('err', err)
        })
    }
}

export const exportSuccess = () => {
    return { type: true };
};

export const addFileSuccess = (isSuccessed) => {
    return { type: PROFILE.IMPORT, isSuccessed };
};

export const addFileFail = (isSuccessed) => {
    return { type: PROFILE.IMPORT_FALSE, isSuccessed };
};