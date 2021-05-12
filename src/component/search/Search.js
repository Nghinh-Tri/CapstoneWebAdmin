import { Input, } from 'antd';
import React, { Component } from 'react';
import { SearchOutlined } from "@ant-design/icons";

class Search extends Component {

    constructor(props) {
        super(props);
        this.state = {
            key: ''
        }
    }

    componentDidUpdate(prevProp) {
        if (prevProp.refresh !== this.props.refresh) {
            if (this.props.refresh) {
                this.setState({ key: '' })
            }
        }
    }

    onHandle = (e) => {
        var { value } = e.target
        this.setState({ key: value })
        var { search } = this.props
        switch (search) {
            case 'project':
                this.props.searchProject(value.trim())
                break
            case 'Employee':
                this.props.searchEmp(value.trim())
                break
            case 'Position':
                this.props.searchPos(value.trim())
                break
            case 'Skill':
                this.props.searchSkill(value.trim())
                break
            case 'Certi':
                this.props.searchCert(value.trim())
                break
        }
    }

    render() {
        return (
            <div class="d-none d-md-inline-block form-inline ml-auto mr-0 mr-md-3 my-2 my-md-0" >
                <div class="input-group" style={{ marginTop: 20, marginRight: 5 }}>
                    <Input suffix={<SearchOutlined />}
                        value={this.state.key}
                        placeholder={this.props.placeholder}
                        onChange={this.onHandle}
                        aria-label="Search" aria-describedby="basic-addon2" />
                </div>
            </div>
        );
    }
}

export default Search;