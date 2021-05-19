import React, { Component } from 'react';
import { showRequestStatus } from '../../service/util/util';
import moment from 'moment';
import RequireModalDetail from './RequireModalDetail';

class RequireModal extends Component {

    render() {
        var { index, value } = this.props
        return (
            <tr>
                <td className='text-center'>{index + 1} </td>
                <td>{value.posName}</td>
                <td className='text-center'>{value.candidateNeeded}</td>
                <td className='text-center'>{value.missingEmployee}</td>
                <td className='text-center'>{value.hardSkills.length}</td>
                <td className='text-center'>{value.language.length}</td>
                <td className='text-center'>{value.softSkillIDs.length}</td>
                <td className='text-center'>{moment(value.dateCreated).format('DD-MM-YYYY hh:mm:ss')}</td>
                <td className='text-center'>{showRequestStatus(value.status)}</td>
                <td className='text-center'>
                    <RequireModalDetail value={value} />
                </td>
            </tr>
        );
    }
}

export default RequireModal;