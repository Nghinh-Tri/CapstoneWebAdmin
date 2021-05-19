import { message } from 'antd';
import Dragger from 'antd/lib/upload/Dragger';
import React, { Component } from 'react';
import { InboxOutlined, FileExcelOutlined } from "@ant-design/icons";


class ImportCV extends Component {

    state = { file: false }

    onChange = (info) => {
        const status = info.file.status;
        if (status === 'done') {
            message.success(`${info.file.name} file uploaded successfully.`);
            this.setState({ file: true })
        } else if (status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    }

    render() {
        return (
            <React.Fragment>
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
            </React.Fragment>
        );
    }
}

export default ImportCV;