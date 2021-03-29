import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSoftSkill } from '../../../service/action/SoftSkillSelectBarAction';
import SoftSkillFormContent from './soft-skill-form-content/SoftSkillFormContent';

class SoftSkillForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isMinimize: false
        }
    }

    componentDidMount = () => {
        this.props.fetchSoftSkillList()
    }

    onAddSoftSkill = () => {
        this.props.onAddSoftSkill(0)
    }

    getSoftSkillListNotSelect = () => {
        var { softSkillList, softSkill } = this.props
        var listNotSelect = softSkillList.slice(0, softSkillList.length)
        for (let i = 0; i < listNotSelect.length; i++) {
            for (let k = 0; k < softSkill.length; k++) {
                if (listNotSelect[i].skillID === softSkill[k]) {
                    var clone = { ...listNotSelect[i] }
                    clone.isSelect = true
                    listNotSelect[i] = clone
                }
            }
        }
        return listNotSelect
    }

    showItems = (softSkill,) => {
        var result = null;
        var softSkillList = this.getSoftSkillListNotSelect()
        if (typeof softSkill !== 'undefined') {
            result = softSkill.map((item, softSkillIndex) => {
                return (
                    <SoftSkillFormContent key={softSkillIndex}
                        softSkillIndex={softSkillIndex}
                        onDeleteSoftSkill={this.props.onDeleteSoftSkill}
                        item={item}
                        softSkillList={softSkillList}
                        onUpdateSoftSkillID={this.props.onUpdateSoftSkillID} />
                );
            })
        }
        return result;
    }

    setMinimize = () => {
        this.setState({
            isMinimize: !this.state.isMinimize
        })
    }

    render() {
        var { softSkill } = this.props

        const showSoftSkill = (softSkill) => {
            if (this.state.isMinimize)
                return ""
            else {
                return (<div className="card-body">
                    {this.showItems(softSkill)}
                    <span className="material-icons add"
                        onClick={this.onAddSoftSkill}>add_box</span>
                </div>)
            }

        }
        return (
            <div className="card mb-50">
                <div className="card-header ">
                    <div className="row">
                        <div className="col">
                            <h5 className="font-weight-bold">Soft Skill</h5>
                        </div>
                        <div className="col pull-right">
                            <span className="material-icons pull-right clear" onClick={this.setMinimize} > {this.state.isMinimize === false ? 'minimize' : 'crop_free'}</span>
                        </div>
                    </div>

                </div>
                {showSoftSkill(softSkill)}
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
            dispatch(fetchSoftSkill())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProp)(SoftSkillForm);