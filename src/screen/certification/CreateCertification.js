import React, { Component } from 'react';
import { connect } from 'react-redux';
import SelectBar from '../../component/create-position-form/select-search/SelectBar';
import { checkSession } from '../../service/action/AuthenticateAction';
import { createCertification, generateCertification, updateCertificationName, updateCertiLevel, updateSKillId } from '../../service/action/CertificationSelectBarAction';
import { fetchHardSkill } from '../../service/action/HardSkillSelectBarAction';
import { convertSkillList } from '../../service/util/util';

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
            ]
        }
    }


    componentDidMount = () => {
        this.props.checkSession()
        this.props.onGenerateCerti()
        this.props.onFetchHardSkill()
    }

    handleChange = (e) => {
        this.props.onUpdateCertiName(e.target.name, e.target.value)
    }

    onSelectSkill = (value) => {
        this.props.onUpdateSkillID(value)
    }

    onSelectLevel = (value) => {
        this.props.onUpdateCertiLevel(value)
    }

    onSubmit = (e) => {
        e.preventDefault()
        this.props.onCreateCertification(this.props.certi)
    }

    render() {
        var { certi } = this.props
        var listConverted = convertSkillList(this.props.hardSkillList)
        return (
            <div className="card">
                <div className="card-header">
                    <p style={{ fontSize: 20, fontWeight: 600, color: '#9c27b0' }}>Create Certification</p>
                </div>
                <div className="card-body">
                    <form onSubmit={this.handleSubmit} >
                        <div className='row'>
                            <div className='col'>
                                <fieldset className="form-group">
                                    <label className="bmd-label-floating">Certification</label>
                                    <input type="text"
                                        id="certificationName" name="certificationName"
                                        className="form-control"
                                        value={certi.certificationName}
                                        onChange={this.handleChange} />
                                </fieldset>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-auto' style={{  marginTop: 15 }}>
                                <label className="bmd-label-floating">Skill</label>
                            </div>
                            <div className='col-auto' style={{ marginLeft: 30, marginTop: 10 }}>
                                <SelectBar name='hardSkillList'
                                    type="common"
                                    placeholder='Select skill'
                                    list={listConverted}
                                    value={certi.skillID}
                                    onSelectSkill={this.onSelectSkill}
                                />
                            </div>
                            <div className='col-auto' style={{ marginLeft: 30, marginTop: 15 }}>
                                <label className="bmd-label-floating">Level</label>
                            </div>
                            <div className='col-auto' style={{ marginLeft: 30, marginTop: 10 }}>
                                <SelectBar name='certiLevel'
                                    type="common"
                                    placeholder='Select level'
                                    list={this.state.level}
                                    onUpdateCerti={this.onSelectLevel}
                                    value={certi.certiLevel}
                                />
                            </div>
                        </div>
                        <div className="row" style={{ marginTop: 10 }}>
                            <div className='col'>
                                <fieldset className="form-group">
                                    <label className="bmd-label-floating">Description</label>
                                    <textarea type="textarea"
                                        id="description" name="description"
                                        value={certi.description}
                                        className="form-control"
                                        row="10"
                                        onChange={this.handleChange} />
                                </fieldset>
                            </div>
                        </div>
                        <button className="btn btn-primary pull-right" onClick={this.onSubmit}>Create</button>
                    </form>
                </div>
            </div>

        );
    }
}

const mapStateToProps = (state) => {
    return {
        certi: state.CertificationReducer,
        hardSkillList: state.HardSkillSelectBarReducer
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        checkSession: () => {
            dispatch(checkSession())
        },
        onGenerateCerti: () => {
            dispatch(generateCertification())
        },
        onUpdateCertiName: (name, value) => {
            dispatch(updateCertificationName(name, value))
        },
        onUpdateSkillID: (value) => {
            dispatch(updateSKillId(value))
        },
        onUpdateCertiLevel: (value) => {
            dispatch(updateCertiLevel(value))
        },
        onFetchHardSkill: () => {
            dispatch(fetchHardSkill())
        },
        onCreateCertification: (certificate) => {
            dispatch(createCertification(certificate))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateCertification);