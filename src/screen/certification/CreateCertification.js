import TextArea from 'antd/lib/input/TextArea';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import SelectBar from '../../component/create-position-form/select-search/SelectBar';
import { checkSession } from '../../service/action/user/AuthenticateAction';
import { createCertification, fetchCertificationDetail, refreshPage, updateCertificate } from '../../service/action/certificate/CertificationSelectBarAction';
import { fetchHardSkill } from '../../service/action/skill/HardSkillSelectBarAction';
import { convertSkillList } from '../../service/util/util';
import { Modal } from 'antd';
import { history } from '../../service/helper/History';

class CreateCertification extends Component {

    constructor(props) {
        super(props);
        this.state = {
            level: [
                { label: 1, value: 1 },
                { label: 2, value: 2 },
                { label: 3, value: 3 },
                { label: 4, value: 4 },
                { label: 5, value: 5 },
                { label: 6, value: 6 },
                { label: 7, value: 7 },
                { label: 8, value: 8 },
                { label: 9, value: 9 },
                { label: 10, value: 10 },
            ],
            certificationName: "",
            description: "",
            skillID: 0,
            certiLevel: 0,
            certificationID: 0
        }
    }

    componentDidMount = () => {
        this.props.checkSession()
        this.props.onFetchHardSkill()
        var { match } = this.props
        if (typeof match !== 'undefined') {
            this.props.fetchCertiDetail(match.params.id)
        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.certi !== prevState.certi) {
            return { someState: nextProps.certi };
        }
        return null;
    }

    componentDidUpdate(prevProps) {
        if (prevProps.certi !== this.props.certi) {
            var { certi } = this.props
            this.setState({
                certificationID: certi.certificationID,
                certificationName: certi.certificationName,
                description: certi.description,
                skillID: certi.skillID,
                certiLevel: certi.certiLevel
            })
        } else if (prevProps.status !== this.props.status) {
            if (this.props.status)
                Modal.success({
                    title: typeof this.props.match === 'undefined' ? 'Create Certificate Successfully' : 'Update Certificate Successfully',
                    onOk() { history.push('/certification') }
                })
            else
                Modal.error({
                    title: typeof this.props.match === 'undefined' ? 'Create Certificate Failed' : 'Update Certificate Failed'
                })
        }
    }

    componentWillUnmount = () => {
        this.props.refreshPage()
    }

    handleChange = (e) => {
        var { name, value } = e.target
        this.setState({ [name]: value })
    }

    onSelectSkill = (value) => {
        this.setState({ skillID: value })
    }

    onSelectLevel = (value) => {
        this.setState({ certiLevel: value })
    }

    onSubmit = (e) => {
        e.preventDefault()
        if (typeof this.props.match === 'undefined') {
            let certi = {
                certificationName: this.state.certificationName.trim(),
                description: this.state.description.trim(),
                skillID: this.state.skillID,
                certiLevel: this.state.certiLevel
            }
            this.props.onCreateCertification(certi)
        }
        else {
            var { certificationID, certiLevel, certificationName, description, skillID } = this.state
            let certi = {
                certificationID: certificationID,
                certificationName: certificationName.trim(),
                description: description.trim(),
                skillID: skillID,
                certiLevel: certiLevel
            }
            this.props.updateCertficate(certi)
        }
    }

    render() {
        var { certiLevel, certificationName, description, skillID } = this.state
        var { error } = this.props
        var listConverted = convertSkillList(this.props.hardSkillList)
        return (
            <div className="card" style={{ marginTop: "50px", }}>
                <div className="card-header card-header-primary">
                    <h4 className="card-title">
                        {typeof this.props.match !== "undefined" ? "Update Certificate" : "Create New Certificate"}
                    </h4>
                </div>
                <div className="card-body">
                    <form onSubmit={this.handleSubmit}>
                        {/* Certificate */}
                        <div className="row">
                            <div className="col">
                                <fieldset className="form-group">
                                    <label className='bmd-label-static'>
                                        Certificate <span style={{ color: 'red', fontWeight: 500 }} >*</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="certificationName"
                                        name="certificationName"
                                        className="form-control"
                                        value={certificationName}
                                        onChange={this.handleChange}
                                    />
                                    {typeof error.CertificationName !== "undefined"
                                        ? error.CertificationName.map((element, index) => {
                                            return (
                                                <div key={index} className="error text-danger font-weight-bold">
                                                    {element}
                                                </div>
                                            );
                                        })
                                        : ""}
                                </fieldset>
                            </div>
                        </div>

                        {/* Skill */}
                        <div className="row">
                            <div className="col-auto" style={{ marginTop: 15 }}>
                                <label className="bmd-label-floating">
                                    Skill <span style={{ color: 'red', fontWeight: 500 }} >*</span>
                                </label>
                            </div>
                            <div className="col-auto" style={{ marginTop: 10 }}>
                                <SelectBar
                                    name="hardSkillList"
                                    type="common"
                                    placeholder="Select skill"
                                    list={listConverted}
                                    value={skillID}
                                    onSelectSkill={this.onSelectSkill}
                                />
                                {typeof error.SkillID !== "undefined"
                                    ? error.SkillID.map((element, index) => {
                                        return (
                                            <div key={index} className="error text-danger font-weight-bold">
                                                {element}
                                            </div>
                                        );
                                    })
                                    : ""}
                            </div>

                            {/* Level */}
                            <div className="col-auto" style={{ marginLeft: 30, marginTop: 15 }}>
                                <label className="bmd-label-floating">
                                    Level <span style={{ color: 'red', fontWeight: 500 }} >*</span>
                                </label>
                            </div>
                            <div className="col-auto" style={{ marginTop: 10 }}>
                                <SelectBar
                                    name="certiLevel"
                                    type="common"
                                    placeholder="Select level"
                                    list={this.state.level}
                                    onUpdateCerti={this.onSelectLevel}
                                    value={certiLevel}
                                />
                                {typeof error.CertiLevel !== "undefined"
                                    ? error.CertiLevel.map((element, index) => {
                                        return (
                                            <div key={index} className="error text-danger font-weight-bold">
                                                {element}
                                            </div>
                                        );
                                    })
                                    : ""}
                            </div>
                        </div>

                        {/* Description */}
                        <div className="row" style={{ marginTop: 10 }}>
                            <div className="col">
                                <fieldset className="form-group">
                                    <label className="bmd-label-floating">
                                        Description <span style={{ color: 'red', fontWeight: 500 }} >*</span>
                                    </label>
                                    <TextArea
                                        type="textarea"
                                        elastic
                                        id="description"
                                        name="description"
                                        value={description}
                                        className="form-control"
                                        autoSize={{ minRows: 5, maxRows: 20 }}
                                        onChange={this.handleChange}
                                    />
                                    {typeof error.Description !== "undefined"
                                        ? error.Description.map((element, index) => {
                                            return (
                                                <div key={index} className="error text-danger font-weight-bold">
                                                    {element}
                                                </div>
                                            );
                                        })
                                        : ""}
                                </fieldset>
                            </div>
                        </div>
                        <button className="btn btn-primary pull-right" onClick={this.onSubmit}>
                            {typeof this.props.match !== "undefined" ? "Update" : "Create"}
                        </button>
                    </form>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        certi: state.CertificationReducer,
        hardSkillList: state.HardSkillSelectBarReducer,
        error: state.ErrorReducer,
        status: state.StatusReducer
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        checkSession: () => {
            dispatch(checkSession())
        },
        onFetchHardSkill: () => {
            dispatch(fetchHardSkill())
        },
        onCreateCertification: (certificate) => {
            dispatch(createCertification(certificate))
        },
        fetchCertiDetail: (certiID) => {
            dispatch(fetchCertificationDetail(certiID))
        },
        updateCertficate: (certi) => {
            dispatch(updateCertificate(certi))
        },
        refreshPage: () => {
            dispatch(refreshPage())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateCertification);