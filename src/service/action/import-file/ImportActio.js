import { Header } from "antd/lib/layout/layout";
import axios from "axios";
import { PROFILE } from "../../constant";
import { history } from "../../helper/History";
import { API_URL } from "../../util/util";

export const addFile = (fileList) => {
    var url = `${API_URL}/User/Import`;

    const listFileOrigin = fileList.map((file) => file.originFileObj);
    const formData = new FormData();
    for (let file of listFileOrigin) {
        console.log(file)
        formData.append("files", file);
        formData.append("name", 'me');
    }
    console.log(formData.get('files'))

    return (dispatch) => {
        axios({
            url: url,
            method: 'put',
            Header: { "Authorization": `Bearer ${localStorage.getItem("token").replace(/"/g, "")}` },
            data: formData
        }).then((res) => {
            console.log(res.data)
            if ((res.status = 200)) {
                dispatch(addFileSuccess());
            }
        }).catch((err) => {
            console.log('err', err.response)

            dispatch(addFileFail(err?.response?.data?.errors));
        });
        // axios.put(
        //     url,
        //     formData,
        //     // formData,
        //     {
        //         headers: { Authorization: `Bearer ${localStorage.getItem("token").replace(/"/g, "")}` },
        //         // body: { file: formData }
        //     }
        // ).then((res) => {
        //     console.log(res.data)
        //     if ((res.status = 200)) {
        //         dispatch(addFileSuccess());
        //     }
        // }).catch((err) => {
        //     console.log('err', err.response)

        //     dispatch(addFileFail(err?.response?.data?.errors));
        // });
    };
};

export const addFileSuccess = () => {
    history.push("/employee/position-assign");
    return { type: PROFILE.IMPORT };
};

export const addFileFail = (error) => {
    return { type: PROFILE.IMPORT_FALSE, error };
};