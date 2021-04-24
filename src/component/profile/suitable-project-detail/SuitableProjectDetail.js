import confirm from 'antd/lib/modal/confirm';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { confirmSuggestList } from '../../../service/action/SuggestCandidateAction';

class SuitableProjectDetail extends Component {

    addEmployee = (posID, requireID, empID, projectID, projectName, pmID) => {
        var { addEmployee } = this.props
        confirm({
            title: `Add this employee to this position in the project.`,
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
                var resutl = {
                    candidates: [
                        {
                            requiredPosID: requireID,
                            posID: posID,
                            empIDs: [
                                { empID: empID, isAccept: true, note: "" }
                            ]
                        }
                    ]
                }
                addEmployee(resutl, projectID, projectName, pmID, empID)
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }

    showContent = (items, projectInfo) => {
        var result = null
        result = items.map((item, index) => {
            return (
                <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.position}</td>
                    <td className='text-center' >{item.languageMatch.toFixed(2)} / 10</td>
                    <td className='text-center' >{item.softSkillMatch.toFixed(2)} / 10</td>
                    <td className='text-center' >{item.hardSkillMatch.toFixed(2)} / 10</td>
                    <td className='text-center' >{item.overallMatch.toFixed(2)} / 50</td>
                    <td className='text-center text-primary'>
                        <a onClick={() =>
                            this.addEmployee(item.posId, projectInfo.requiredPositions[index].requiredPosID,
                                this.props.empID, projectInfo.projectID, projectInfo.projectName, projectInfo.projectManagerID)}>Add</a>
                    </td>
                </tr>
            )
        })
        return result
    }

    render() {
        var { item } = this.props
        return (
            <React.Fragment>
                {item.matchInEachPos.length > 0 ?
                    <div class="table-responsive">
                        <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                            <thead>
                                <tr>
                                    <th className="font-weight-bold text-center" width={40}>No</th>
                                    <th className="font-weight-bold" width={200}>Position</th>
                                    <th className="font-weight-bold text-center" width={140}>Match Language</th>
                                    <th className="font-weight-bold text-center" width={140}>Match Soft Skill</th>
                                    <th className="font-weight-bold text-center" width={140}>Match Hard Skill</th>
                                    <th className="font-weight-bold text-center" width={140}>Overall Match</th>
                                    <th className="font-weight-bold text-center" width={50}>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.showContent(item.matchInEachPos, item.projectInfo)}
                            </tbody>
                        </table>
                    </div>
                    :
                    <h4 style={{ fontStyle: 'italic', color: 'gray' }} >There is no suitable position for this employee</h4>
                }
            </React.Fragment>
        );
    }
}

const mapDispatchToProp = (dispatch) => {
    return {
        addEmployee: (item, projectID, projectName, pmID, empID) => {
            dispatch(confirmSuggestList(item, projectID, projectName, pmID, empID))
        }
    }
}


export default connect(null, mapDispatchToProp)(SuitableProjectDetail);