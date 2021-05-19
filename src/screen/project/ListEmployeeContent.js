import { Modal, notification } from 'antd';
import moment from 'moment';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getPrevRequire } from '../../service/action/position/PositionAction';
import { PROJECT_EMPLOYEE_LIST } from '../../service/constant/nodata';
import { history } from '../../service/helper/History';
import { showHardSkillLevel } from "../../service/util/util";

class ListEmployeeContent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            visible: false
        }
    }

    componentDidMount = () => {
        if (typeof this.props.item.posID !== 'undefined') {
            if (typeof this.props.item.posID === 'number')
                this.props.getPrevRequire(this.props.project.projectID, this.props.item.posID)
        }
    }

    componentDidUpdate = (prevProp) => {
        if (prevProp.item !== this.props.item) {
            this.props.getPrevRequire(this.props.project.projectID, this.props.item.posID)
        }
    }

    showCandidate = (employees, posName) => {
        var result = null
        result = employees.map((employee, index) => {
            return (
                <tr key={index}>
                    <th >
                        <NavLink className="text-primary" to={`/employee/profile/${employee.empID}`}>{employee.name}</NavLink>
                    </th>
                    <th className="text-center">{posName}</th>
                    <th className="">{employee.email}</th>
                    <th className="text-center">{employee.phoneNumber}</th>
                    <th className="text-center">
                        {employee.dateIn === null ? "-" : moment(employee.dateIn).format('DD-MM-YYYY')}
                    </th>
                </tr>)
        })
        return result
    }

    onClickAddEmployees = () => {
        this.setState({ visible: true })
    }

    handleOk = () => {
        var { prevRequire } = this.props
        if (prevRequire.status === 2 | prevRequire.status === 0) {
            var obj = {
                requiredPosID: prevRequire.requiredPosID,
                posID: prevRequire.posID,
                candidateNeeded: prevRequire.missingEmployee,
                language: [],
                softSkillIDs: [],
                hardSkills: []
            }
            prevRequire.language.forEach(element => {
                var language = { langID: element.langID, priority: element.priority }
                obj.language.push(language)
            });
            prevRequire.hardSkills.forEach(element => {
                var hardSkill = { hardSkillID: element.hardSkillID, skillLevel: element.skillLevel, certificationLevel: element.certificationLevel, priority: element.priority }
                obj.hardSkills.push(hardSkill)
            });
            prevRequire.softSkillIDs.forEach(element => {
                obj.softSkillIDs.push(element.softSkillID)
            });
            var array = []
            array.push(obj)
            localStorage.setItem('projectId', JSON.stringify(this.props.project.projectID))
            localStorage.setItem('pmID', JSON.stringify(this.props.project.pmID))
            localStorage.setItem('projectType', JSON.stringify(this.props.project.typeID))
            localStorage.setItem('projectField', JSON.stringify(this.props.project.fieldID))
            localStorage.setItem('projectName', JSON.stringify(this.props.project.projectName))
            localStorage.setItem('positionRequire', JSON.stringify(array))
            localStorage.setItem('dateCreate', this.props.project.dateBegin)
            localStorage.setItem('dateEnd', this.props.project.dateEstimatedEnd)
            history.push(`/project/add-employees/${this.props.project.projectID}`, { type: 'AddEmployee' })
        } else if (prevRequire.status === 1) {
            notification.open({
                message: 'Require is waiting to confirm',
            });
        }
    }

    handleCancel = (e) => {
        this.setState({ visible: false });
    }

    showHardSkill = (skills) => {
        var result = null
        result = skills.map((value, index) => {
            return (<ul key={index} style={{ width: 300 }}>
                <li>{value.hardSkillName}</li>
                <li>Skill Level: {showHardSkillLevel(value.skillLevel)}</li>
                <li>
                    Certificate Level: {value.certificationLevel === 0 ? 'All' : 'Level ' + value.certificationLevel}  <br />
                </li>
                <li>
                    Priority: {value.priority}
                </li>
            </ul>)
        })
        return result
    }

    showLanguage = (language) => {
        var result = null
        result = language.map((value, index) => {
            return (
                <ul key={index} style={{ width: 200 }}>
                    <li>{value.langName}</li>
                    <li>Priority: {value.priority}</li>
                </ul>
            )
        })
        return result
    }

    showSoftSkill = (softSkill) => {
        var result = null
        result = softSkill.map((value, index) => {
            return (
                <ul key={index} style={{ width: 200 }}>
                    <li>{value.softSkillName}</li>
                </ul>
            )
        })
        return result
    }

    render() {
        var { item, prevRequire } = this.props
        var temp = {}
        if (typeof prevRequire.requiredPosID !== 'undefined') {
            temp = prevRequire
        }
        return (
            <React.Fragment>
                <div className='row pull-right' style={{ width: 'auto' }} >
                    <h5 style={{ marginRight: 14 }} >{item.noe} / {item.candidateNeeded} Employees </h5>
                </div>
                {item.employees.length === 0 ?
                    <div className='row justify-content-center'>
                        <h4 style={{ fontStyle: 'italic', color: 'gray' }} >{PROJECT_EMPLOYEE_LIST.NO_EMP_IN_POS}</h4>
                    </div>
                    :
                    <div className="table-responsive">
                        <table className="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                            <thead className="font-weight-bold text-center text-primary">
                                <th>Name</th>
                                <th>Position</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th width={140}>Confirmed Date</th>
                            </thead>
                            <tbody>
                                {this.showCandidate(item.employees, item.posName)}
                            </tbody>
                        </table>
                    </div>
                }
                {typeof prevRequire.requiredPosID !== 'undefined' ?
                    item.noe !== item.candidateNeeded && (temp.status === 2 || temp.status === 0) ?
                        <>
                            <button type="submit" className="btn btn-primary pull-right" onClick={this.onHandle} style={{ fontWeight: 700 }} onClick={this.onClickAddEmployees} >
                                Add Employees
                        </button>
                            <Modal title={<span style={{ color: 'red', fontWeight: 600 }} >
                                System will suggest suitable employees based on these requirements
                                </span>}
                                width={1000}
                                visible={this.state.visible}
                                onOk={this.handleOk}
                                onCancel={this.handleCancel} >
                                <div>
                                    <div style={{ display: 'flex', flexDirection: 'row', marginBottom: 10 }} >
                                        <span style={{ fontWeight: 600 }} >{prevRequire.posName}</span>
                                        <span style={{ marginLeft: 300, fontWeight: 600 }} >Candidate Needed:</span>
                                        <span style={{ marginLeft: 20 }}>{prevRequire.missingEmployee}</span>
                                    </div>
                                    <div style={{ marginTop: 10, marginBottom: 10 }} >
                                        <div style={{ marginTop: 10, marginBottom: 10, fontWeight: 600 }}>Hard Skill</div>
                                        <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }} >
                                            {this.showHardSkill(prevRequire.hardSkills)}
                                        </div>
                                    </div>
                                    <div>
                                        <div style={{ marginTop: 10, marginBottom: 10, fontWeight: 600 }}>Language</div>
                                        <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }} >
                                            {this.showLanguage(prevRequire.language)}
                                        </div>
                                    </div>
                                    <div>
                                        <div style={{ marginTop: 10, marginBottom: 10, fontWeight: 600 }}>Soft Skill</div>
                                        <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }} >
                                            {this.showSoftSkill(prevRequire.softSkillIDs)}
                                        </div>
                                    </div>
                                </div>
                            </Modal>
                        </> : '' : ''}
            </React.Fragment>

        );
    }
}

const mapStateToProps = state => {
    return {
        prevRequire: state.PreviosRequrieReducer
    }
}

const mapDispatchToProp = dispatch => {
    return {
        getPrevRequire: (projectID, posID) => {
            dispatch(getPrevRequire(projectID, posID))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProp)(ListEmployeeContent);