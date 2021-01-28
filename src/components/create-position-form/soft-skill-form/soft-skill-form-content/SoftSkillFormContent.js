import React, { Component } from 'react';
import { connect } from 'react-redux';
import SelectSearch from '../../select-search/SelectSearch';
import * as Action from "../../../../store/store-action/SoftSkillSelectBarAction";
import { convertList } from "../../../../util";

class SoftSkillFormContent extends Component {

    componentDidMount = () => {
        var { softSkillList } = this.props
        if (typeof softSkillList === 'undefined' || softSkillList.length === 0) {
            this.props.fetchSoftSkillList()
        }
    }

    onDeleteSoftSkill = (softSkillIndex, positionFormIndex) => {
        this.props.onDeleteSoftSkill(softSkillIndex, positionFormIndex)
    }

    render() {
        var { item, softSkillIndex, positionFormIndex, softSkillList } = this.props        
        var listConverted = convertList(softSkillList)
        return (
            <div className="row">
                <div className="col-1 mt-15-ml-30">
                    <label className="bmd-label  ">
                        <h5 className="font-weight-bold">Skill</h5>
                    </label>
                </div>
                <div className="col-3">
                    <SelectSearch list={listConverted}
                        onUpdateSoftSkillID={this.props.onUpdateSoftSkillID}
                        name="softSkillID"
                        positionFormIndex={positionFormIndex}
                        softSkillIndex={softSkillIndex}
                        value={item} />
                </div>
                <div className="col-1 mt-15-ml-30">
                    <span className="material-icons pull-right clear" onClick={() => this.onDeleteSoftSkill(softSkillIndex, positionFormIndex)}>clear</span>
                </div>
            </div>

        );
    }
}

const mapStateToProps = (state) => {
    return {
        softSkillList: state.SoftSkillSelectBarReducer
    }
}

const mapDispatchToProp = (dispatch, props) => {
    return {
        fetchSoftSkillList: () => {
            dispatch(Action.fetchSoftSkill())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProp)(SoftSkillFormContent);