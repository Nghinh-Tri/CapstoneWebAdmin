import React, { Component } from 'react';
import { convertSkillList } from '../../../../service/util/util';
import CertificateForm from '../../certificate-form/CertificateForm';
import SelectBar from "../../select-search/SelectBar";

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
            ]
        }
    }


    onDeleteHardSkill = (hardSkillIndex) => {
        this.props.onDeleteHardSkill(hardSkillIndex)
    }

    render() {
        var { hardSkillIndex, hardSkillList, hardSkillDetail } = this.props
        var listConverted = convertSkillList(hardSkillList)
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
                    {/* Button Delete */}
                    <td>
                        <span className="material-icons pull-right" style={{ cursor: 'pointer' }}
                            onClick={() => this.onDeleteHardSkill(hardSkillIndex)}>clear</span>
                    </td>
                </tr>
                <tr >
                    <td colSpan={3}>
                        <CertificateForm
                            certificate={hardSkillDetail.empCertifications}
                            certiList={hardSkillDetail.certiList}
                            hardSkillID={hardSkillDetail.skillID}
                            hardSkillIndex={hardSkillIndex}
                            onAddCertificate={this.props.onAddCertificate}
                            onDeleteCertificate={this.props.onDeleteCertificate}
                            onUpdateCertficateID={this.props.onUpdateCertficateID}
                            onUpdateCertificateDate={this.props.onUpdateCertificateDate}
                        />
                    </td>
                </tr>
            </React.Fragment>
        );
    }
}

export default HardSkillFormContent;