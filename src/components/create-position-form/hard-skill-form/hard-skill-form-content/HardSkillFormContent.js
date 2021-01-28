import React, { Component } from 'react';
import { connect } from 'react-redux';
import SelectSearch from '../../select-search/SelectSearch';
import { fetchHardSkill } from "../../../../store/store-action/HardSkillSelectBarAction";
import { fetchCertification } from "../../../../store/store-action/CertificationSelectBarAction";
import { convertList } from "../../../../util";

class HardSkillFormContent extends Component {

    onUpdate = event => {
        var { hardSkillIndex, positionFormIndex } = this.props
        var value = event.target.value
        var name = event.target.name
        this.props.updateHardSkillExpPriority(hardSkillIndex, positionFormIndex, value, name)
    }

    componentDidMount = () => {
        var { hardSkillList, certificationList } = this.props
        if (typeof hardSkillList === 'undefined' || hardSkillList.length === 0) {
            this.props.fetchHardSkillList()
        }
        if (typeof certificationList === 'undefined' || certificationList.length === 0) {
            this.props.fetchCertificationList()
        }
    }

    onDeleteHardSkill = (hardSkillIndex, positionFormIndex) => {
        this.props.onDeleteHardSkill(hardSkillIndex, positionFormIndex)
    }

    render() {
        var { hardSkillIndex, positionFormIndex, hardSkillList, certificationList, hardSkillDetail } = this.props
        var hardSkillListConverted = convertList(hardSkillList)
        var certificationListConverted = convertList(certificationList)
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
                        value={hardSkillDetail.certiID}
                        onUpdateHardSkillCerti={this.props.onUpdateHardSkillCerti} />
                </div>

                {/* Priority */}
                <div className="col mt-15-ml-30">
                    <label className="bmd-label">
                        <h5 className="font-weight-bold">
                            Priority
                </h5>
                    </label>
                </div>
                <div className="col">
                    <div className="form-group">
                        <input type="number" name="priority" value={hardSkillDetail.priority} className="form-control" min="0" onChange={this.onUpdate} />
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