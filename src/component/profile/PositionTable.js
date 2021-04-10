import moment from 'moment';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { checkSession } from '../../service/action/AuthenticateAction';
import { fetchPositionProfileDetail } from '../../service/action/ProfileAction';
import { history } from '../../service/helper/History';
import { showHardSkillLevel, showPositionLevel } from '../../service/util/util';
import { Button, Descriptions } from 'antd';


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
                    <li>
                        <div className='row'>
                            <div className='col' >{item.langName}</div>
                            <div className='col-auto' >Level : </div>
                            <div className='col' >{item.langLevel}</div>
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
                            <div className='col'>{item.skillName}</div>
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
                    <li>
                        <div className='row' >
                            <div className='col'>{item.skillName}</div>
                            <div className='col-auto'>Level : </div>
                            <div className='col'>{showHardSkillLevel(item.skillLevel)}</div>
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
        history.push(`/employee/update-position/${this.props.empID}`, { role: this.props.role })
    }

    render() {
        var { positionDetail } = this.props
        console.log(positionDetail)
        return (
            <React.Fragment>
                <div className="card">

                    <div className="card-body">
                        <div className="form-group">
                            <Descriptions title="Posotion detail" layout='horizontal' bordered extra={<Button onClick={this.onUpdate} type="primary" >Edit</Button>}>
                            </Descriptions>
                                <Descriptions title="Position Info" layout='horizontal'>
                                    <Descriptions.Item span={3} label="Positon Name">{positionDetail.posName}</Descriptions.Item>
                                    <Descriptions.Item span={3} label="Positon Level">{showPositionLevel(positionDetail.posLevel)}</Descriptions.Item>
                                </Descriptions>

                                <Descriptions title="HardSkill Info" layout='horizontal'>
                                    <Descriptions.Item span={3} label="HardSkill Name"> {this.showHardSkill(positionDetail.hardSkills)}</Descriptions.Item>
                                </Descriptions>

                                <Descriptions title="Language Info" layout='horizontal'>
                                    <Descriptions.Item span={3}> {this.showLanguage(positionDetail.languages)}</Descriptions.Item>

                                </Descriptions>

                                <Descriptions title="Soft Skill Info" layout='horizontal'>
                                    <Descriptions.Item label="Soft Skill Name">
                                        {this.showSoftSkill(positionDetail.softSkills)}
                                    </Descriptions.Item>
                                </Descriptions>
                          
                        </div>
                    </div>
                </div>
            </React.Fragment>
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