import { Modal } from 'antd';
import confirm from 'antd/lib/modal/confirm';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { compose } from 'redux';
import { confirmSuggestList } from '../../../service/action/confirm/AddSuitableCandidateAction';
import { fetchSuitableList } from '../../../service/action/confirm/SuitableListAction';

class SuitableProjectDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isSubmit: false
        }
    }

    componentDidUpdate = (prevProp) => {
        if (prevProp.status !== this.props.status) {
            if (this.state.isSubmit) {
                let { fetchSuitableList, match } = this.props
                if (this.props.status)
                    Modal.success({
                        title: 'Confirm Employee Successfully',
                        onOk() { fetchSuitableList(match.params.id) }
                    })
            }
        }
    }

    addEmployee = (posID, requireID, empID, projectID, projectName, pmID) => {
        var { addEmployee } = this.props
        confirm({
            title: `Add this employee to this position in the project.`,
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk: () => {
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
                this.setState({ isSubmit: true })
                addEmployee(resutl, projectID, projectName, pmID, empID)
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }   

    showContent = () => {
        var { item } = this.props
        var result = null
        result = item.requiredPositions.map((detail, index) => {
            if (detail.matchDetail !== null)
                return (
                    <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{detail.posName}</td>
                        <td className='text-center'>{detail.candidateNeeded - detail.missingEmployee} / {detail.candidateNeeded}</td>
                        <td className='text-center'>{detail.matchDetail.projectTypeMatch} / 10</td>
                        <td className='text-center'>{detail.matchDetail.projectFieldMatch} / 10</td>
                        <td className='text-center'>{detail.matchDetail.languageMatch} / 10</td>
                        <td className='text-center'>{detail.matchDetail.softSkillMatch} / 10</td>
                        <td className='text-center'>{detail.matchDetail.hardSkillMatch} / 10</td>
                        <td className='text-center'>{detail.matchDetail.overallMatch} / 50</td>
                        <td className='text-center text-primary'>
                            <a onClick={() =>
                                this.addEmployee(detail.posID, detail.requiredPosID, detail.matchDetail.empID,
                                    item.projectID, item.projectName, item.projectManagerID
                                )}>Add</a>
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
                {
                    item.requiredPositions.length > 0 ?
                        <div class="table-responsive">
                            <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                                <thead>
                                    <tr>
                                        <th className="font-weight-bold text-center" width={40}>No</th>
                                        <th className="font-weight-bold text-center" width={200}>Position</th>
                                        <th className="font-weight-bold text-center" width={130}>Employees</th>
                                        <th className="font-weight-bold text-center" width={140}>Project Type Match</th>
                                        <th className="font-weight-bold text-center" width={140}>Project Field Match</th>
                                        <th className="font-weight-bold text-center" width={140}>Language Match</th>
                                        <th className="font-weight-bold text-center" width={140}>Soft Skill Match</th>
                                        <th className="font-weight-bold text-center" width={140}>Hard Skill Match</th>
                                        <th className="font-weight-bold text-center" width={140}>Overall Match</th>
                                        <th className="font-weight-bold text-center" width={50}>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.showContent()}
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

const mapStateToProps = (state) => {
    return {
        status: state.StatusReducer
    }
}

const mapDispatchToProp = (dispatch) => {
    return {
        addEmployee: (item, projectID, projectName, pmID, empID) => {
            dispatch(confirmSuggestList(item, projectID, projectName, pmID, empID))
        },
        fetchSuitableList: (empID) => {
            dispatch(fetchSuitableList(empID))
        }
    }
}


export default compose(withRouter, connect(mapStateToProps, mapDispatchToProp))(SuitableProjectDetail);