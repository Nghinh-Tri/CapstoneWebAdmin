import moment from 'moment';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { checkSession } from '../../service/action/AuthenticateAction';
import { fetchPositionProfileDetail } from '../../service/action/ProfileAction';
import { history } from '../../service/helper/History';
import { showHardSkillLevel, showPositionLevel } from '../../service/util/util';

class PositionTable extends Component {

    componentDidMount = () => {
        this.props.checkSession()
        this.props.fetchPositionProfileDetai(this.props.empID)
    }

    showLanguage = (language) => {
        var result = null
        result = language.map((item, index) => {
            return (
                <ul key={index}>
                    <li style={{ fontSize: 18, marginLeft: 30, marginBottom: 20 }}>
                        <div className='row'>
                            <div className='col' style={{ fontWeight: 600 }}>{item.langName}</div>
                            <div className='col-auto' style={{ marginLeft: 100, fontWeight: 600, }}>Level : </div>
                            <div className='col' style={{ fontWeight: 400, marginLeft: -20 }}>{item.langLevel}</div>
                        </div>
                    </li>
                </ul>
            )
        })
        return result
    }

    showSoftSkill = (softSkill) => {
        var result = null
        result = softSkill.map((item, index) => {
            return (
                <ul key={index}>
                    <li style={{ fontSize: 18, marginLeft: 30, marginBottom: 20 }}>
                        <div className='row'>
                            <div className='col' style={{ fontWeight: 600 }}>{item.skillName}</div>
                        </div>
                    </li>
                </ul>
            )
        })
        return result
    }

    showHardSkill = (hardSkill) => {
        var result = null
        result = hardSkill.map((item, index) => {
            return (
                <ul key={index}>
                    <li style={{ fontSize: 18, marginLeft: 30, marginBottom: 20 }}>
                        <div className='row' >
                            <div className='col' style={{ fontWeight: 600 }}>{item.skillName}</div>
                            <div className='col-auto' style={{ marginLeft: 100, fontWeight: 600 }}>Level : </div>
                            <div className='col' style={{ fontWeight: 400, marginLeft: -20 }}>{showHardSkillLevel(item.skillLevel)}</div>
                        </div>
                        {/* List Certi */}
                        {item.certifications.length > 0 ?
                            <div className='row' >
                                <div className='col' style={{ fontSize: 16, marginBottom: 20, marginTop: 20 }}>
                                    {this.showCertificate(item.certifications)}
                                </div>
                            </div> : ''
                        }

                    </li>
                </ul>
            )
        })
        return result
    }

    showCertificate = (certificate) => {
        var result = null
        result = certificate.map((item, index) => {
            return (
                <ul key={index} style={{ marginTop: 5 }} >
                    <li >
                        <div className='row'>
                            <div className='col-3' style={{ fontWeight: 400 }} >{item.certiName}</div>
                            <div className='col-auto' style={{ marginLeft: 30, fontWeight: 400 }}>Level : </div>
                            <div className='col-auto' style={{ marginLeft: -20, fontWeight: 350 }}>{item.certiLevel}</div>
                            <div className='col-auto' style={{ marginLeft: 30, fontWeight: 400 }}>Taken Date : </div>
                            <div className='col-auto' style={{ marginLeft: -20, fontWeight: 350 }}>{moment(item.dateTaken).format('DD-MM-YYYY')}</div>
                            <div className='col-auto' style={{ marginLeft: 30, fontWeight: 400 }}>Expired Date : </div>
                            <div className='col' style={{ fontWeight: 350 }}>{moment(item.dateEnd).format('DD-MM-YYYY')}</div>
                        </div>
                    </li>
                </ul>
            )
        })
        return result
    }

    onUpdate = () => {
        history.push(`/employee/update-position/${this.props.empID}`)
    }

    render() {
        var { positionDetail } = this.props
        return (
            <div className="card">
                <div className="card-header card-header-primary">
                    <h4 className="card-title">Position Detail</h4>
                </div>
                <div className="card-body">
                    {positionDetail.posName !== null && typeof positionDetail.posName !== 'undefined' ?
                        <div>
                            {/* Name */}
                            <div className="row">
                                <div className="col-auto">
                                    <label className="bmd-label">
                                        <h4 style={{ fontWeight: 700 }}>Position : </h4>
                                    </label>
                                </div>
                                <div className="col" style={{ marginLeft: -20 }}>
                                    <label className="bmd-label">
                                        <h4>{positionDetail.posName.trim()}</h4>
                                    </label>
                                </div>
                                <div className='col-auto' style={{ marginLeft: 85, fontWeight: 600 }}>

                                    <h4>Level :</h4>
                                </div>
                                <div className="col" style={{ marginLeft: -20 }} >
                                    <label className="bmd-label">
                                        <h4 style={{ fontWeight: 500 }}>{showPositionLevel(positionDetail.posLevel)}</h4>
                                    </label>
                                </div>
                            </div>

                            {/* Language */}
                            <div className="row">
                                <div className="col-auto">
                                    <label className="bmd-label">
                                        <h4 style={{ fontWeight: 700 }}>Languages : </h4>
                                    </label>
                                </div>
                            </div>
                            {/* List Language */}
                            {this.showLanguage(positionDetail.languages)}

                            {/* Soft Skill */}
                            <div className="row">
                                <div className="col-auto">
                                    <label className="bmd-label">
                                        <h4 style={{ fontWeight: 700 }}>Soft Skills : </h4>
                                    </label>
                                </div>
                                <div className="col" style={{ marginLeft: 100, marginTop: -15, width: 250 }}>
                                    {/* <Input className="form-group" value={profile.name} disabled="true" style={{ color: "black", cursor: 'default', fontWeight: 700, fontSize: 18, border: 'none', backgroundColor: 'white' }} /> */}
                                </div>
                            </div>
                            {/* List Sost skills */}
                            {this.showSoftSkill(positionDetail.softSkills)}

                            {/* Hard Skill */}
                            <div className="row">
                                <div className="col-auto">
                                    <label className="bmd-label">
                                        <h4 className="" style={{ fontWeight: 700 }}>Hard Skills : </h4>
                                    </label>
                                </div>
                                <div className="col" style={{ marginLeft: 100, marginTop: -15, width: 250 }}>
                                    {/* <Input className="form-group" value={profile.name} disabled="true" style={{ color: "black", cursor: 'default', fontWeight: 700, fontSize: 18, border: 'none', backgroundColor: 'white' }} /> */}
                                </div>
                            </div>
                            {/* List Hard Skills */}
                            {this.showHardSkill(positionDetail.hardSkills)}

                        </div>
                        :
                        <h4 className='text-center'>No Data</h4>
                    }

                    {/* Update */}
                    <div className="col">
                        <button type="button" className="btn btn-primary pull-right" style={{ width: 110, fontWeight: 600 }} onClick={this.onUpdate}>Update</button>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        positionDetail: state.PositionReducer
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchPositionProfileDetai: (empID) => {
            dispatch(fetchPositionProfileDetail(empID))
        },
        checkSession: () => {
            dispatch(checkSession())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PositionTable);