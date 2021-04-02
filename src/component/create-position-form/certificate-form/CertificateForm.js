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
            isMinimize: false
        }
    }

    componentDidMount = () => {
        this.props.fetchCertificateList(this.props.hardSkillID)
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.hardSkillID !== prevState.hardSkillID) {
            return { someState: nextProps.hardSkillID };
        }
        return null;
    }

    componentDidUpdate(prevProps) {
        if (prevProps.hardSkillID !== this.props.hardSkillID) {
            this.props.fetchCertificateList(this.props.hardSkillID)
        }
    }

    setMinimize = () => {
        this.setState({
            isMinimize: !this.state.isMinimize
        })
    }

    getCertificateListNotSelect = () => {
        var { certificateList, certificate } = this.props
        var listNotSelect = certificateList.slice(0, certificateList.length)
        for (let i = 0; i < listNotSelect.length; i++) {
            for (let k = 0; k < certificate.length; k++) {
                if (listNotSelect[i].certificationID === certificate[k].certiID) {
                    var clone = { ...listNotSelect[i] }
                    clone.isSelect = true
                    listNotSelect[i] = clone
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
                    <div className="card-body">
                        {this.showItems(certificate, hardSkillIndex)}
                        {this.props.certificateList.length === this.props.certificate.length ?
                            '' :
                            <span className="material-icons add"
                                onClick={() => this.onAddCertificate(hardSkillIndex)}>add_box</span>
                        }
                    </div>
                )
        }

        return (
            <div className="card" style={{ marginLeft: 50, marginRight: 50 }} >
                <div className="card-header">
                    <div className="row">
                        <div className="col">
                            <h5 className="font-weight-bold">Certificate</h5>
                        </div>
                        <div className="col pull-right">
                            <span className="material-icons pull-right clear" onClick={this.setMinimize} >
                                {this.state.isMinimize === false ? 'minimize' : 'crop_free'}
                            </span>
                        </div>
                    </div>
                </div>
                {showCerti(certificate)}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        certificateList: state.CertificationSelectBarReducer
    }
}

const mapDispatchToProp = (dispatch) => {
    return {
        fetchCertificateList: (hardSkillID) => {
            dispatch(fetchCertification(hardSkillID))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProp)(CertificateForm);