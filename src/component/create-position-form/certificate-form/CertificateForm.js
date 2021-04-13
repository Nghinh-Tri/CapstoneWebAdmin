import React, { Component } from 'react';
import { connect } from 'react-redux';
import CertificateFormContent from './certificate-form-content/CertificateFormContent';
import { fetchCertification } from "../../../service/action/CertificationSelectBarAction";

class CertificateForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            empCertifications: {
                certiID: 0,
                dateTaken: "",
                dateEnd: ""
            },
            isMinimize: false,
            hardSkillID: 0,
            hardSkillIndex: 0
        }
    }

    setMinimize = () => {
        this.setState({
            isMinimize: !this.state.isMinimize
        })
    }

    getCertificateListNotSelect = () => {
        var { certificateList, certificate } = this.props
        var listNotSelect = []
        if (typeof certificateList !== 'undefined') {
            if (certificateList.length > 0) {
                listNotSelect = certificateList.slice(0, certificateList.length)
                for (let i = 0; i < listNotSelect.length; i++) {
                    for (let k = 0; k < certificate.length; k++) {
                        if (listNotSelect[i].certificationID === certificate[k].certiID) {
                            var clone = { ...listNotSelect[i] }
                            clone.isSelect = true
                            listNotSelect[i] = clone
                        }
                    }
                }
            }
        }
        return listNotSelect
    }

    showItems = (certificate, hardSkillIndex) => {
        var result = null
        var certificateList = this.getCertificateListNotSelect()
        if (typeof certificate !== 'undefined') {
            result = certificate.map((certificateDetail, certificateIndex) => {
                return (
                    <CertificateFormContent key={certificateIndex}
                        certificateDetail={certificateDetail}
                        certificateIndex={certificateIndex}
                        certificateList={certificateList}
                        hardSkillIndex={hardSkillIndex}

                        onDeleteCertificate={this.props.onDeleteCertificate}
                        onUpdateCertficateID={this.props.onUpdateCertficateID}
                        onUpdateCertificateDate={this.props.onUpdateCertificateDate}
                    />
                );
            })
        }
        return result;
    }

    onAddCertificate = (hardSkillIndex) => {
        this.props.onAddCertificate(hardSkillIndex, this.state.empCertifications)
    }

    render() {
        var { certificate, hardSkillIndex } = this.props
        const showCerti = (certificate) => {
            if (this.state.isMinimize || this.props.hardSkillID === 0)
                return ""
            else
                return (
                    <>
                        {this.showItems(certificate, hardSkillIndex)}
                        {typeof this.props.certificateList !== 'undefined' ?
                            this.props.certificateList.length === this.props.certificate.length ?
                                '' :
                                <span className="material-icons add" style={{ marginTop: 10, cursor: 'pointer' }}
                                    onClick={() => this.onAddCertificate(hardSkillIndex)}>add_box</span>
                            : ''}
                    </>
                )
        }

        return (
            <div>
                {!this.state.isMinimize ?
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                                <thead>
                                    <tr>
                                        <th width={250}>Certificate</th>
                                        <th width={250}>Taken Date</th>
                                        <th width={250}>Expired Date</th>
                                        <th width={50}></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {showCerti(certificate)}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    : ''}
            </div>
            // <div className="card" style={{ marginLeft: 50, marginRight: 50 }} >
            //     <div className="card-header">
            //         <div className="row">
            //             <div className="col">
            //                 <h5 className="font-weight-bold">Certificate</h5>
            //             </div>
            //             <div className="col pull-right">
            //                 <span className="material-icons pull-right clear" onClick={this.setMinimize} >
            //                     {this.state.isMinimize === false ? 'minimize' : 'crop_free'}
            //                 </span>
            //             </div>
            //         </div>
            //     </div>
            //     {showCerti(certificate)}
            // </div>
        );
    }
}

export default CertificateForm;