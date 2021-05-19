import { message } from 'antd';
import Dragger from 'antd/lib/upload/Dragger';
import React, { Component } from 'react';
import { InboxOutlined, FileExcelOutlined } from "@ant-design/icons";
import { addFile } from '../../service/action/import-file/ImportActio';
import { connect } from 'react-redux';


class ImportCV extends Component {

    state = { file: false, fileList: [], }

    onChange = ({ fileList: newFileList }) => {
        if (newFileList.length > 0) {
            newFileList[newFileList.length - 1].status = "done";
        }
        this.setState({ fileList: newFileList, file: true });
    }

    onHandleSubmit = (e) => {
        e.preventDefault()
        var fileList = this.state.fileList
        if (!fileList || fileList.length === 0) {
            return;
        }
        this.props.addFile(fileList);
    }

    render() {
        return (
            <React.Fragment>
                <form onSubmit={this.onHandleSubmit}>
                    <Dragger name='file' multiple={false} action='//jsonplaceholder.typicode.com/posts/'
                        onChange={this.onChange} >
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
                            </>}
                    </Dragger>
                    <button type="submit" className="btn btn-primary pull-right mt-3">
                        Confirm
                    </button>
                </form>
            </React.Fragment>
        );
    }
}

const mapDispatchToProp = (dispatch) => {
    return {
        addFile: (fileList) => {
            dispatch(addFile(fileList))
        }
    }
}

export default connect(null, mapDispatchToProp)(ImportCV);