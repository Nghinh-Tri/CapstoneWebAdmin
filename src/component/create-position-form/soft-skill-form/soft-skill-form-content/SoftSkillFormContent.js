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
            <div className="row" style={{marginBottom:10}}>
                <div className="col-auto" style={{ marginLeft: 30, marginTop:5 }}>
                    <label className="bmd-label  ">
                        <h5 className="font-weight-bold">Skill</h5>
                    </label>
                </div>
                <div className="col-auto">
                    <SelectBar name="softSkillID"
                        type='unique'
                        placeholder="Select soft skill"
                        list={listConverted}
                        onUpdateSoftSkillID={this.props.onUpdateSoftSkillID}
                        softSkillIndex={softSkillIndex}
                        value={typeof item.skillID !== 'undefined'? item.skillID: item} />
                </div>
                <div className="col">
                    <span className="material-icons pull-right clear" onClick={() => this.onDeleteSoftSkill(softSkillIndex)}>clear</span>
                </div>
            </div>

        );
    }
}


export default SoftSkillFormContent;