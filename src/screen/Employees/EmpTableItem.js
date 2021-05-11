import React, { Component } from 'react';
import { history } from '../../service/helper/History';
import { getUserName, showRole } from '../../service/util/util';

class EmpTableItem extends Component {

    onHandle = () => {
        var { profile } = this.props
        var url = `/employee/profile/${profile.id}`
        history.push(url)
    }

    render() {
        var { index, profile, pageIndex } = this.props
        return (
            <tr>
                <th className="text-center">{(pageIndex - 1) * 10 + index + 1}</th>
                <th className="text-primary">
                    <a onClick={this.onHandle} style={{ cursor: 'pointer' }}>
                        {profile.name}
                    </a>
                </th>
                <th className="text-center">{profile.phoneNumber}</th>
                <th className="">{profile.email}</th>
                <th className="text-center">{profile.userName}</th>
                <th className='text-center' >{showRole(profile.roleName)}</th>
            </tr>
        );
        // }
    }
}

export default EmpTableItem;