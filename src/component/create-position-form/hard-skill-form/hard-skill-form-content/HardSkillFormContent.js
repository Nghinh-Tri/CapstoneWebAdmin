import React, { Component } from 'react';
import { connect } from 'react-redux';
import SelectSearch from '../../select-search/SelectSearch';
import { fetchHardSkill } from "../../../../service/action/HardSkillSelectBarAction";
import { fetchCertification } from "../../../../service/action/CertificationSelectBarAction";
import { convertSkillList, convertCertificationList } from "../../../../service/util/util";

class HardSkillFormContent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            project: {
                dateBegin: '',
                dateEndEst: '',
            }
        }
    }

    onHandle = (event) => {
        var target = event.target;
        var name = target.name
        var value = target.value
        this.setState({
            [name]: value
        })
    }

    onUpdate = event => {
        var { hardSkillIndex, positionFormIndex } = this.props
        var value = event.target.value
        var name = event.target.name
        this.props.updateHardSkillExpPriority(hardSkillIndex, positionFormIndex, value, name)
    }

    componentDidMount = () => {
        this.props.fetchHardSkillList()
        this.props.fetchCertificationList()
    }

    onDeleteHardSkill = (hardSkillIndex, positionFormIndex) => {
        this.props.onDeleteHardSkill(hardSkillIndex, positionFormIndex)
    }

    render() {
        var { hardSkillIndex, positionFormIndex, hardSkillList, certificationList, hardSkillDetail, item } = this.props
        var hardSkillListConverted = convertSkillList(hardSkillList)
        var certificationListConverted = convertCertificationList(certificationList)
        var {dateBegin, dateEndEst} = this.state
        console.log(item)
        return (
            <div className="row">

                {/* Skill */}
                <div className="col mt-15-ml-30">
                    <label className="bmd-label">
                        <h5 className="font-weight-bold">Skill</h5>
                    </label>
                </div>
                <div className="col-2">
                    <SelectSearch positionFormIndex={positionFormIndex}
                        hardSkillIndex={hardSkillIndex}
                        list={hardSkillListConverted}
                        name="hardSkillID"
                        value={hardSkillDetail.hardSkillID}
                        onUpdateHardSkillID={this.props.onUpdateHardSkillID} />
                </div>
                {/* Level */}
                <div className="col mt-15-ml-30">
                    <label className="bmd-label">
                        <h5 className="font-weight-bold">Level</h5>
                    </label>
                </div>
                <div className="col-2">
                    <SelectSearch positionFormIndex={positionFormIndex}
                        hardSkillIndex={hardSkillIndex}
                        list={hardSkillListConverted}
                        name="level"
                        value={hardSkillDetail.hardSkillLevel}
                        onUpdateHardSkillLevel={this.props.onUpdateHardSkillLevel} />
                </div>

                {/* Exp */}
                <div className="col mt-15-ml-30">
                    <label className="bmd-label">
                        <h5 className="font-weight-bold">Experience</h5>
                    </label>
                </div>
                <div className="col">
                    <div className="form-group">
                        <input type="number" name="exp" className="form-control" value={hardSkillDetail.exp} min="0" onChange={this.onUpdate} />
                    </div>
                </div>
                <div className="col">
                    <label className="bmd-label label mt-10">
                        Years
                    </label>
                </div>

                {/* Certi */}
                <div className="col mt-15-ml-30 mr-10">
                    <label className="bmd-label  ">
                        <h5 className="font-weight-bold">
                            Certification
                        </h5>
                    </label>
                </div>
                <div className="col-2">
                    <SelectSearch positionFormIndex={positionFormIndex}
                        hardSkillIndex={hardSkillIndex}
                        list={certificationListConverted}
                        name="certiID"
                        value={hardSkillDetail.certificationID}
                        onUpdateHardSkillCerti={this.props.onUpdateHardSkillCerti} />
                </div>

                <div className="col">
                    <div className="form-group">
                        <input type="number" name="priority" value={hardSkillDetail.priority} className="form-control" min="0" onChange={this.onUpdate} />
                    </div>
                </div>
                {/* Date */}
                <div className="row">
                    {/* Date begin */}
                    <div className="col-md-6">
                        <label className="bmd-label">Date begin</label>

                        <div className="form-group">
                            <input
                                type="date"
                                name="dateBegin"
                                defaultValue={dateBegin}
                                className="form-control"
                                onChange={this.onHandle}
                            />
                        </div>
                    </div>
                    {/* Date end estimate */}
                    <div className="col-md-6">
                        <label className="bmd-label">Date End Estimate</label>

                        <div className="form-group">
                            <input
                                type="date"
                                name="dateEndEst"
                                defaultValue={dateEndEst}
                                className="form-control"
                                onChange={this.onHandle} />
                        </div>
                    </div>
                </div>
                {/* Button Delete */}
                <div className="col mt-15-ml-30">
                    <span className="material-icons pull-right clear"
                        onClick={() => this.onDeleteHardSkill(hardSkillIndex, positionFormIndex)}>clear</span>
                </div>
            </div>

        );
    }
}

const mapStateToProps = (state) => {
    return {
        hardSkillList: state.HardSkillSelectBarReducer,
        certificationList: state.CertificationSelectBarReducer
    }
}

const mapDispatchToProp = (dispatch, props) => {
    return {
        fetchHardSkillList: () => {
            dispatch(fetchHardSkill())
        },
        fetchCertificationList: () => {
            dispatch(fetchCertification())
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProp)(HardSkillFormContent);