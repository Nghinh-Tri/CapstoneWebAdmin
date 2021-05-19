import { Tooltip } from 'antd';
import moment from 'moment';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { assignPositionFail } from '../../../../service/action/position/PositionAssignAction';
import { convertCertificationList } from '../../../../service/util/util';
import SelectBar from '../../select-search/SelectBar';

class CertificateFormContent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            check: this.props.certificateDetail.dateEnd !== ''
        }
    }

    onDeleteCertificate = (certificateIndex, hardSkillIndex) => {
        this.props.onDeleteCertificate(certificateIndex, hardSkillIndex)
    }

    handleInputChange = (e) => {
        var { name, value } = e.target
        this.props.onUpdateCertificateDate(name, value, this.props.certificateIndex, this.props.hardSkillIndex)
        if (name === 'dateTake') {
            var duration = moment.duration(moment().day(2).diff(moment(value)))
            if (duration.days() === 0) {
                if (duration.hours() <= 0) {
                    this.props.certiError({ Certificate: [`Taken Date must before ${moment(moment().day(2)).format("DD-MM-YYYY")}`] })
                }
                else {
                    this.props.certiError({ Certificate: [] })
                }
            } else if (duration.days() < 0) {
                this.props.certiError({ Certificate: [`Taken Date must before ${moment(moment().day(2)).format("DD-MM-YYYY")}`] })
            } else {
                this.props.certiError({ Certificate: [] })
            }
        } else if (name === 'dateEnd') {
            var duration = moment.duration(moment(value).diff(moment().day(4)))
            if (duration.days() === 0) {
                if (duration.hours() > 24) {
                    this.props.certiError({ Certificate: [`Expiration Date must before ${moment(moment().day(4)).format("DD-MM-YYYY")}`] })
                }
                else {
                    this.props.certiError({ Certificate: [] })
                }
            } else if (duration.days() < 0) {
                this.props.certiError({ Certificate: [`Expiration Date must before ${moment(moment().day(4)).format("DD-MM-YYYY")}`] })
            } else {
                this.props.certiError({ Certificate: [] })
            }
        }
    }

    onCheck = (e) => {
        this.setState({ check: e.target.checked })
        this.props.isCheck(e.target.checked, this.props.certificateIndex, this.props.hardSkillIndex)
    }

    render() {
        var { certificateDetail, certificateIndex, hardSkillIndex, certificateList } = this.props
        var listConverted = convertCertificationList(certificateList)
        return (
            <React.Fragment>
                <tr >
                    <td >
                        <SelectBar name="certificateID"
                            type='certi'
                            placeholder="Select certificate"
                            hardSkillIndex={hardSkillIndex}
                            list={listConverted}
                            certificateIndex={certificateIndex}
                            value={certificateDetail.certiID}
                            onUpdateCertficateID={this.props.onUpdateCertficateID}
                        />
                    </td>
                    <td >
                        <input type="date" name="dateTake"
                            className="form-control"
                            max={moment(moment().day(2)).format("YYYY-MM-DD")}
                            value={certificateDetail.dateTaken} onChange={this.handleInputChange}
                            style={{ width: 200, height: 32 }} />
                    </td>
                    <td style={{ display: 'flex', flexDirection: 'row' }} >
                        <input type="date" name="dateEnd" className="form-control" min={moment(moment().day(4)).format("YYYY-MM-DD")}
                            value={certificateDetail.dateEnd} onChange={this.handleInputChange}
                            style={{ width: 200, height: 32 }}
                            readOnly={!this.state.check} />
                        <Tooltip title="Check to input expired date" placement='bottom' >
                            <input type='checkbox' checked={this.state.check}
                                onClick={this.onCheck}
                                style={{ marginLeft: 10, marginTop: 10, width: 14, height: 14 }} />
                        </Tooltip>
                    </td>
                    <td >
                        <span className="material-icons pull-right" style={{ marginTop: 10, cursor: 'pointer' }}
                            onClick={() => this.onDeleteCertificate(certificateIndex, hardSkillIndex)}
                        >clear</span>
                    </td>
                </tr>
            </React.Fragment>
        );
    }
}

const mapDispatchToProp = (dispatch) => {
    return {
        certiError: (error) => {
            dispatch(assignPositionFail(error))
        }
    }
}

export default connect(null, mapDispatchToProp)(CertificateFormContent);