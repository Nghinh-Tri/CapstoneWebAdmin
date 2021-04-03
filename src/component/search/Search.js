import React, { Component } from 'react';

class Search extends Component {

    onHandle = (e) => {
        var { value } = e.target
        var { search } = this.props
        switch (search) {
            case 'project':
                this.props.searchProject(value)
                break
            case 'Employee':
                this.props.searchEmp(value)
                break
            case 'Position':
                this.props.searchPos(value)
                break
            case 'Skill':
                this.props.searchSkill(value)
                break
            case 'Certi':
                this.props.searchCert(value)
                break
        }
    }

    render() {
        return (
            <div className="input-group no-border" style={{ marginLeft: 30, width: 500 }}>
                <input type="text" name="search" className="form-control" placeholder={this.props.placeholder} onChange={this.onHandle} />
                <button type="submit" className="btn  btn-round btn-just-icon">
                    <i className="material-icons">search</i>
                </button>
            </div>
        );
    }
}

export default Search;