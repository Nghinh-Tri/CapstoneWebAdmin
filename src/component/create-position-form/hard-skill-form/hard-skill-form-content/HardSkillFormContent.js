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
            <div className="row" style={{marginBottom:10}}>
                {/* Skill */}
                <div className="col-auto" style={{ marginLeft: 30, marginTop:5 }}>
                    <label className="bmd-label">
                        <h5 className="font-weight-bold">Skill</h5>
                    </label>
                </div>
                <div className="col-auto">
                    <SelectBar name="hardSkill"
                        type='unique'
                        placeholder="Select hard skill"
                        hardSkillIndex={hardSkillIndex}
                        list={listConverted}
                        value={hardSkillDetail.skillID}
                        onUpdateHardSkillID={this.props.onUpdateHardSkillID}
                    />
                </div>
                {/* Level */}
                <div className="col-auto" style={{ marginLeft: 30, marginTop:5 }}>
                    <label className="bmd-label">
                        <h5 className="font-weight-bold">Level</h5>
                    </label>
                </div>
                <div className="col-auto">
                    <SelectBar name="skillLevel"
                        type='common'
                        placeholder="Select hard skill level"
                        hardSkillIndex={hardSkillIndex}
                        list={this.state.skillLevel}
                        value={hardSkillDetail.skillLevel}
                        onUpdateHardSkillLevel={this.props.onUpdateHardSkillLevel}
                    />
                </div>

                {/* Button Delete */}
                <div className="col">
                    <span className="material-icons pull-right clear"
                        onClick={() => this.onDeleteHardSkill(hardSkillIndex)}>clear</span>
                </div>

                <CertificateForm
                    certificate={hardSkillDetail.empCertifications}
                    hardSkillID={hardSkillDetail.skillID}
                    hardSkillIndex={hardSkillIndex}
                    onAddCertificate={this.props.onAddCertificate}
                    onDeleteCertificate={this.props.onDeleteCertificate}
                    onUpdateCertficateID={this.props.onUpdateCertficateID}
                    onUpdateCertificateDate={this.props.onUpdateCertificateDate}
                />
            </div>
        );
    }
}

export default HardSkillFormContent;