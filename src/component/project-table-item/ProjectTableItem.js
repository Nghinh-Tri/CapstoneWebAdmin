import React, { Component } from 'react';
import { history } from '../../service/helper/History';
import { showSpan, showStatus } from '../../service/util/util';

class ProjectTableItem extends Component {

    onHandle = () => {
        var { project } = this.props
        var url = `/project/confirm/${project.projectID}`
        if(project.status === 0){
            console.log(url)
            history.push(url)
        }

    }

    render() {
        var { index, project } = this.props
        return (
            <tr>
                <th className="text-center">{index + 1}</th>
                <th className="text-center">{project.projectName}</th>
                <th className="text-center">{project.name}</th>
                <th className="text-center">
                    <span className={`badge badge-pill ${showSpan(project.status)} span`}>
                        {showStatus(project.status)}
                    </span>
                </th>
                <th className="text-center">
                    <a onClick={this.onHandle} style={{cursor:'pointer'}}>
                        Detail
                    </a>
                </th>
            </tr>
        );
    }
}

export default ProjectTableItem;