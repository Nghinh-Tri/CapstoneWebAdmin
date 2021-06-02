import { Modal } from 'antd';
import React, { Component } from 'react';
import { store } from 'react-notifications-component';
import { connect } from 'react-redux';
import { convertSkillList } from '../../../../service/util/util';
import CertificateForm from '../../certificate-form/CertificateForm';
import SelectBar from "../../select-search/SelectBar";
import { assignPositionFail } from "../../../../service/action/position/PositionAssignAction";
import { closeModal, openModal } from '../../../../service/action/certificate/ValidateCertifcate';

class HardSkillFormContent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            skillLevel: [
                { label: 'Basic Knowledge', value: 1 },
                { label: 'Limited Experience', value: 2 },
                { label: 'Practical', value: 3 },
                { label: 'Applied Theory', value: 4 },
                { label: 'Recognized Authority', value: 5 },
            ],
            visible: false,
            check: false
        }
    }

    onDeleteHardSkill = (hardSkillIndex) => {
        this.props.onDeleteHardSkill(hardSkillIndex)
    }

    onShowCertificate = () => {
        if (this.props.hardSkillDetail.skillID !== 0)
            this.props.openModal()
        else
            store.addNotification({
                message: "Please select hard skill",
                type: "danger",
                insert: "top",
                container: "top-center",
                animationIn: ["animated", "fadeIn"],
                animationOut: ["animated", "fadeOut"],
                dismiss: {
                    duration: 6000,
                    onScreen: false
                }
            })
    }

    handleOk = (e) => {
        this.props.closeModal(this.props.hardSkillDetail.empCertifications)
    }

    handleCancel = (e) => {
        this.props.closeModal(this.props.hardSkillDetail.empCertifications)
    }

    getHardSkillName = (hardSkillList, hardSkillId) => {
        var name = ''
        hardSkillList.forEach(element => {
            if (element.value === hardSkillId)
                name = element.label
        });
        return name
    }

    isCheck = (value) => {
        this.setState({ check: value })
    }

    render() {
        var { hardSkillIndex, hardSkillList, hardSkillDetail, validate } = this.props
        var listConverted = convertSkillList(hardSkillList)
        // console.log(validate)
        return (
            <React.Fragment>
                <tr>
                    <td>
                        <SelectBar name="hardSkill"
                            type='unique'
                            placeholder="Select hard skill"
                            hardSkillIndex={hardSkillIndex}
                            list={listConverted}
                            value={hardSkillDetail.skillID}
                            onUpdateHardSkillID={this.props.onUpdateHardSkillID}
                        />
                    </td>
                    <td>
                        <SelectBar name="skillLevel"
                            type='common'
                            placeholder="Select hard skill level"
                            hardSkillIndex={hardSkillIndex}
                            list={this.state.skillLevel}
                            value={hardSkillDetail.skillLevel}
                            onUpdateHardSkillLevel={this.props.onUpdateHardSkillLevel}
                        />
                    </td>
                    <td className="text-center" >
                        <a style={{ color: 'blue' }} onClick={this.onShowCertificate} >Details</a>
                        <Modal width={1070}
                            title={
                                <div style={{ display: 'flex', flexDirection: 'row' }}>
                                    <div style={{ marginRight: 10 }}>
                                        {this.getHardSkillName(listConverted, hardSkillDetail.skillID)}
                                    </div>

                                </div>
                            }
                            cancelButtonProps={{ style: { display: 'none' } }}
                            visible={validate.visible} onOk={this.handleOk} onCancel={this.handleCancel}>
                            {validate.certiError.map((element, index) => {
                                return (<><div key={index} className="error text-danger font-weight-bold">{element}</div><br /></>)
                            })}
                            {validate.dateTakenError.map((element, index) => {
                                return (
                                    <><div key={index} className="error text-danger font-weight-bold">{element}</div> <br />
                                    </>)
                            })}

                            {validate.dateExprireError.map((element, index) => {
                                return (<div key={index} className="error text-danger font-weight-bold">{element}</div>)
                            })}
                            <CertificateForm
                                certificate={hardSkillDetail.empCertifications}
                                certiList={hardSkillDetail.certiList}
                                hardSkillID={hardSkillDetail.skillID}
                                hardSkillIndex={hardSkillIndex}
                                onAddCertificate={this.props.onAddCertificate}
                                onDeleteCertificate={this.props.onDeleteCertificate}
                                onUpdateCertficateID={this.props.onUpdateCertficateID}
                                onUpdateCertificateDate={this.props.onUpdateCertificateDate}
                                isCheck={this.props.isCheck}
                            />
                        </Modal>
                    </td>
                    {/* Button Delete */}
                    <td>
                        <span className="material-icons pull-right" style={{ cursor: 'pointer' }}
                            onClick={() => this.onDeleteHardSkill(hardSkillIndex)}>clear</span>
                    </td>
                </tr>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {        
        validate: state.ValidateCertificateReducer
    }
}

const mapDispatchToProp = (dispatch) => {
    return {        
        openModal: () => {
            dispatch(openModal())
        },
        closeModal: (certificates) => {
            dispatch(closeModal(certificates))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProp)(HardSkillFormContent);