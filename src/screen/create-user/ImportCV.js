import { Button, Modal } from 'antd';
import Dragger from 'antd/lib/upload/Dragger';
import React, { Component } from 'react';
import { InboxOutlined, FileExcelOutlined } from "@ant-design/icons";
import { addFile } from '../../service/action/import-file/ImportActio';
import { connect } from 'react-redux';
import { history } from '../../service/helper/History';

class ImportCV extends Component {

    state = { file: false, fileList: [] }

    componentDidUpdate = (prevProps) => {
        if (prevProps.status !== this.props.status) {
            if (this.props.status === true) {
                let { userID, role, name, phone, email } = this.props.profile
                Modal.success({
                    title: 'Import CV File Successfully',
                    onOk() {
                        localStorage.setItem('name', name)
                        localStorage.setItem('phone', phone)
                        localStorage.setItem('email', email)
                        history.push('/employee/position-assign', { empID: userID, role: role });
                    }
                })
            }
            else
                Modal.error({
                    title: 'Import CV File  Failed'
                })
        }
    }

    onHandleSubmit = (e) => {
        const { fileList } = this.state;
        if (!fileList || fileList.length === 0) {
            return;
        }
        this.props.addFile(fileList);
    }

    render() {
        const { fileList } = this.state;
        const props = {
            onRemove: (file) => {
                this.setState((state) => {
                    const index = state.fileList.indexOf(file);
                    const newFileList = state.fileList.slice();
                    newFileList.splice(index, 1);
                    return {
                        fileList: newFileList,
                        file: false
                    };
                });
            },
            beforeUpload: (file) => {
                if (fileList.length === 0)
                    this.setState(state => ({
                        fileList: [...state.fileList, file],
                        file: true
                    }));
                return false;
            },
            fileList,
        };
        return (
            <React.Fragment>
                <Dragger {...props} multiple={false} accept='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' >
                    {this.state.file ?
                        <p className="ant-upload-drag-icon">
                            <FileExcelOutlined />
                        </p>
                        :
                        <>
                            <p className="ant-upload-drag-icon">
                                <InboxOutlined />
                            </p>
                            <p className="ant-upload-text">Click or drag file to this area to upload</p>
                        </>
                    }
                </Dragger>
                <Button className='pull-right mt-3' type="primary" onClick={this.onHandleSubmit}
                    disabled={fileList.length === 0} style={{ marginTop: 16 }}>
                    Confirm
                    </Button>
            </React.Fragment>
        );
    }
}

const mapState = (state) => {
    return {
        status: state.StatusReducer,
        profile: state.ProfileFetchReducer,
    };
}

const mapDispatchToProp = (dispatch) => {
    return {
        addFile: (fileList) => {
            dispatch(addFile(fileList))
        }
    }
}

export default connect(mapState, mapDispatchToProp)(ImportCV);