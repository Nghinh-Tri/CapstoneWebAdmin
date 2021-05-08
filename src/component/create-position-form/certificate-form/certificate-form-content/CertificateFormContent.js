import { Tooltip } from 'antd';
import React, { Component } from 'react';
import { convertCertificationList } from '../../../../service/util/util';
import SelectBar from '../../select-search/SelectBar';

class CertificateFormContent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            check: false
        }
    }


    onDeleteCertificate = (certificateIndex, hardSkillIndex) => {
        this.props.onDeleteCertificate(certificateIndex, hardSkillIndex)
    }

    handleInputChange = (e) => {
        var { name, value } = e.target
        this.props.onUpdateCertificateDate(name, value, this.props.certificateIndex, this.props.hardSkillIndex)
    }

    onCheck = (e) => {
        this.setState({ check: e.target.checked })
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
                        <input type="date" name="dateTake" className="form-control"
                            value={certificateDetail.dateTaken} onChange={this.handleInputChange}
                            style={{ width: 200, height: 32 }} />
                    </td>
                    <td style={{ display: 'flex', flexDirection: 'row' }} >
                        <input type="date" name="dateEnd" className="form-control"
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
            // <div className="row" style={{ marginBottom: 10 }}>
            //     {/* Skill */}
            //     <div className="col-auto" style={{ marginLeft: 30, marginTop: 5 }}>
            //         <label className="bmd-label">
            //             <h5 className="font-weight-bold">Certificate</h5>
            //         </label>
            //     </div>
            //     <div className="col-auto">
            //         <SelectBar name="certificateID"
            //             type='unique'
            //             placeholder="Select certificate"
            //             hardSkillIndex={hardSkillIndex}
            //             list={listConverted}
            //             certificateIndex={certificateIndex}
            //             value={certificateDetail.certiID}
            //             onUpdateCertficateID={this.props.onUpdateCertficateID}
            //         />
            //     </div>
            //     {/* Date take*/}
            //     <div className="col-auto" style={{ marginLeft: 30, marginTop:5 }}>
            //         <label className="bmd-label">
            //             <h5 className="font-weight-bold">Date take</h5>
            //         </label>
            //     </div>
            //     <div className="col" style={{marginTop:-12}}>
            //         <div className="form-group">
            //             <input
            //                 type="date"
            //                 name="dateTake"
            //                 className="form-control"
            //                 value={certificateDetail.dateTaken}
            //                 onChange={this.handleInputChange}
            //             />
            //         </div>
            //     </div>

            //     {/* Date expire*/}
            //     <div className="col-auto" style={{ marginLeft: 30, marginTop:5 }}>
            //         <label className="bmd-label">
            //             <h5 className="font-weight-bold">Date expire</h5>
            //         </label>
            //     </div>
            //     <div className="col" style={{marginTop:-12}}>
            //         <div className="form-group" >
            //             <input
            //                 type="date"
            //                 name="dateEnd"
            //                 className="form-control"
            //                 value={certificateDetail.dateEnd}
            //                 onChange={this.handleInputChange}
            //             />
            //         </div>
            //     </div>

            //     {/* Button Delete */}
            //     <div className="col">
            //         <span className="material-icons pull-right clear"
            //             onClick={() => this.onDeleteCertificate(certificateIndex, hardSkillIndex)}
            //         >clear</span>
            //     </div>


            // </div>
        );
    }
}

export default CertificateFormContent;