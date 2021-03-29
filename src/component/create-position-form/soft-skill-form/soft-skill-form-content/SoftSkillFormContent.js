import React, { Component } from 'react';
import { connect } from 'react-redux';
import SelectBar from '../../select-search/SelectBar';
import * as Action from "../../../../service/action/SoftSkillSelectBarAction";
import { convertSkillList } from "../../../../service/util/util";

class SoftSkillFormContent extends Component {  

    onDeleteSoftSkill = (softSkillIndex) => {
        this.props.onDeleteSoftSkill(softSkillIndex)
    }

    render() {
        var { item, softSkillIndex, softSkillList } = this.props
        var listConverted = convertSkillList(softSkillList)
        return (
            <div className="row">
                <div className="col-1 mt-15-ml-30">
                    <label className="bmd-label  ">
                        <h5 className="font-weight-bold">Skill</h5>
                    </label>
                </div>
                <div className="col-3">
                    <SelectBar list={listConverted}
                        onUpdateSoftSkillID={this.props.onUpdateSoftSkillID}
                        name="softSkillID"
                        softSkillIndex={softSkillIndex}
                        value={item} />
                </div>
                <div className="col-1 mt-15-ml-30">
                    <span className="material-icons pull-right clear" onClick={() => this.onDeleteSoftSkill(softSkillIndex)}>clear</span>
                </div>
            </div>

        );
    }}


export default SoftSkillFormContent;