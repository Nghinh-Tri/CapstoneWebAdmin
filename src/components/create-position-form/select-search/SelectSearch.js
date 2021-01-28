import React, { Component } from 'react';
import Select from 'react-select'

class SelectSearchs extends Component {

    constructor(props) {
        super(props);
        this.state = {
            label: "Search...",
            value: 0
        }
    }

    componentDidMount = () => {        
        var { list,name } = this.props
        var lable = this.getLabel(list, this.state.value)
        if (this.state.value !== 0) {
            this.setState({
                label: lable
            })
        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.value !== prevState.value) {
            return { value: nextProps.value };
        }
        return null;
    }

    getLabel = (list, value) => {
        var result = null
        list.forEach(element => {
            if (element.value === value) {
                result = element.label
            }
        });
        return result
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.value !== this.props.value) {
            var { list, value } = this.props
            var lable = this.getLabel(list, value)
            if (value !== 0) {
                this.setState({
                    label: lable,
                    value: value
                })
            }
        }
    }

    onSelectPosition = event => {
        var { positionFormIndex } = this.props
        var value = event.value
        this.props.onUpdatePositionID(value, positionFormIndex)
    }

    onSelectSoftSkill = event => {
        var { positionFormIndex, softSkillIndex } = this.props
        var value = event.value
        this.props.onUpdateSoftSkillID(value, softSkillIndex, positionFormIndex)
    }

    onSelectHardSkill = event => {
        var { positionFormIndex, hardSkillIndex } = this.props
        var value = event.value
        this.props.onUpdateHardSkillID(value, hardSkillIndex, positionFormIndex)
    }

    onSelectCerti = event => {
        var { positionFormIndex, hardSkillIndex } = this.props
        var value = event.value
        this.props.onUpdateHardSkillCerti(value, hardSkillIndex, positionFormIndex)
    }

    showSelectBar = (name, list) => {
        switch (name) {
            case "positionID":
                return (
                    <Select className="select" options={list} onChange={this.onSelectPosition} value={this.state} />
                )
            case "softSkillID":
                return (
                    <Select className="select" options={list} onChange={this.onSelectSoftSkill} value={this.state} />
                )
            case "hardSkillID":
                return (
                    <Select className="select" options={list} onChange={this.onSelectHardSkill} value={this.state} />
                )
            case "certiID":
                return (
                    <Select className="select" options={list} onChange={this.onSelectCerti} value={this.state} />
                )
            default:
                break;
        }
    }

    render() {
        var { list, name } = this.props
        // console.log(this.state)
        // console.log(this.state)
        return (
            <div>
                { this.showSelectBar(name, list)}
            </div>
        );
    }
}

export default SelectSearchs;