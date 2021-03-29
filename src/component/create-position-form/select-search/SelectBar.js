import { Select } from 'antd';
import { Option } from 'antd/lib/mentions';
import React, { Component } from 'react';

class SelectBar extends Component {

    onSelectHardSkill = (value) => {
        var { positionFormIndex, hardSkillIndex } = this.props
        this.props.onUpdateHardSkillID(value, hardSkillIndex, positionFormIndex)
    }

    onSelectPosition = (value) => {
        var { positionFormIndex } = this.props
        this.props.onUpdatePositionID(value, positionFormIndex)
    }

    onSelectSoftSkill = (value) => {
        var { positionFormIndex, softSkillIndex } = this.props
        this.props.onUpdateSoftSkillID(value, softSkillIndex, positionFormIndex)
    }

    onSelectLanguage = (value) => {
        var { positionFormIndex, languageIndex } = this.props
        this.props.onUpdateLanguageID(value, languageIndex, positionFormIndex)
    }

    onSelectLanguagePriority = (value) => {
        var { positionFormIndex, languageIndex } = this.props
        this.props.onUpdateLanguagePriority(value, languageIndex, positionFormIndex)
    }

    onSelectHardSkillPriority = (value) => {
        var { positionFormIndex, hardSkillIndex } = this.props
        this.props.onUpdateHardSkillPriority(value, hardSkillIndex, positionFormIndex)
    }

    onSelectCertificateLevel = (value) => {
        this.props.onUpdateCerti(value)
    }

    onSelectLanguageLevel = (value) => {
        var { positionFormIndex, languageIndex } = this.props
        this.props.onUpdateHardSkillCerti(value, languageIndex, positionFormIndex)
    }

    onSelectSkillType = (value) => {
        this.props.onSelectSkillType(value)
    }

    showDefaultOption = () => {
        var { list } = this.props
        var list = this.getUnSelectedList(list)
        var result = null
        result = list.map((item, index) => {
            return (<Option key={index} value={item.value}>{item.label}</Option>)
        })
        return result
    }

    showSelectedOption = () => {
        var { list, value } = this.props
        var list = this.getSelectedList(value, list)

        var result = null
        result = list.map((item, index) => {
            return (<Option key={index} value={item.value}>{item.label}</Option>)
        })
        return result
    }

    showPosition = () => {
        var { value } = this.props
        if (value === 0) {
            return (
                <Select
                    showSearch
                    style={{ width: 200 }}
                    className="softSkill"
                    placeholder="Select a position"
                    onSelect={this.onSelectPosition}
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                >
                    {this.showDefaultOption()}
                </Select>)
        } else {
            return (
                <Select value={value}
                    style={{ width: 200 }}
                    className="softSkill"
                    showSearch
                    placeholder="Select a position"
                    onSelect={this.onSelectPosition}
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                >
                    {this.showSelectedOption()}
                </Select>)
        }
    }

    showHardSkill = () => {
        var { value } = this.props
        if (value === 0) {
            return (
                <Select
                    showSearch
                    style={{ width: 150 }}
                    placeholder="Select a hard skill"
                    onSelect={this.onSelectHardSkill}
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                >
                    {this.showDefaultOption()}
                </Select>)
        } else {
            return (
                <Select value={value}
                    style={{ width: 150 }}
                    showSearch
                    placeholder="Select a hard skill"
                    onSelect={this.onSelectHardSkill}
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                >
                    {this.showSelectedOption()}
                </Select>)
        }
    }

    showSoftSkill = () => {
        var { value } = this.props
        if (value === 0) {
            return (
                <Select
                    showSearch
                    style={{ width: 200 }}
                    className="softSkill"
                    placeholder="Select a soft skill"
                    onSelect={this.onSelectSoftSkill}
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                >
                    {this.showDefaultOption()}
                </Select>)
        } else {
            return (
                <Select value={value}
                    showSearch
                    style={{ width: 200 }}
                    className="softSkill"
                    placeholder="Select a soft skill"
                    onSelect={this.onSelectSoftSkill}
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                >
                    {this.showSelectedOption()}
                </Select>)
        }
    }

    showLanguage = () => {
        var { value } = this.props
        if (value === 0) {
            return (
                <Select
                    showSearch
                    style={{ width: 200 }}
                    className="softSkill"
                    placeholder="Select a language"
                    onSelect={this.onSelectLanguage}
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                >
                    {this.showDefaultOption()}
                </Select>)
        } else {
            return (
                <Select value={value}
                    showSearch
                    style={{ width: 200 }}
                    className="softSkill"
                    placeholder="Select a language"
                    onSelect={this.onSelectLanguage}
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                >
                    {this.showSelectedOption()}
                </Select>)
        }
    }

    showPriorityOption = () => {
        var { list } = this.props
        var result = null
        result = list.map((item, index) => {
            return (<Option key={index} value={item.value}>{item.label}</Option>)
        })
        return result
    }

    showLanguagePriority = () => {
        var { value } = this.props
        if (value === 0) {
            return (
                <Select
                    showSearch
                    style={{ width: 200 }}
                    className="softSkill"
                    placeholder="Select priority"
                    onSelect={this.onSelectLanguagePriority}
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                >
                    {this.showPriorityOption()}
                </Select>)
        } else {
            return (
                <Select value={value}
                    showSearch
                    style={{ width: 200 }}
                    className="softSkill"
                    placeholder="Select priority"
                    onSelect={this.onSelectLanguagePriority}
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                >
                    {this.showPriorityOption()}
                </Select>)
        }
    }

    showHardSkillPriority = () => {
        var { value } = this.props
        if (value === 0) {
            return (
                <Select
                    style={{ width: 140 }}
                    showSearch
                    placeholder="Select priority"
                    onSelect={this.onSelectHardSkillPriority}
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                >
                    {this.showPriorityOption()}
                </Select>)
        } else {
            return (
                <Select value={value}
                    style={{ width: 140 }}

                    showSearch
                    placeholder="Select priority"
                    onSelect={this.onSelectHardSkillPriority}
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                >
                    {this.showPriorityOption()}
                </Select>)
        }
    }

    showCertificateLevel = () => {
        var { value } = this.props
        if (value === -1) {
            return (
                <Select
                    style={{ width: 180 }}
                    showSearch
                    placeholder="Select certificate level"
                    onSelect={this.onSelectCertificateLevel}
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                >
                    {this.showPriorityOption()}
                </Select>)
        } else {
            return (
                <Select value={value}
                    style={{ width: 180 }}
                    showSearch
                    placeholder="Select priority"
                    onSelect={this.onSelectCertificateLevel}
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                >
                    {this.showPriorityOption()}
                </Select>)
        }
    }

    showLangLevel = () => {
        var { value } = this.props
        if (value === -1) {
            return (
                <Select
                    style={{ width: 180 }}
                    showSearch
                    placeholder="Select language level"
                    onSelect={this.onSelectLanguageLevelLevel}
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                >
                    {this.showPriorityOption()}
                </Select>)
        } else {
            return (
                <Select value={value}
                    style={{ width: 180 }}
                    showSearch
                    placeholder="Select priority"
                    onSelect={this.onSelectLanguageLevel}
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                >
                    {this.showPriorityOption()}
                </Select>)
        }
    }

    showSkillType = () => {
        var { value } = this.props
        if (value === -1) {
            return (
                <Select
                    style={{ width: 250 }}
                    showSearch
                    placeholder="Select Skill type"
                    onSelect={this.onSelectSkillType}
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                >
                    <Option value='0'>Hard Skill</Option>
                    <Option value='1'>Soft Skill</Option>
                </Select>)
        } else {
            return (
                <Select value={value}
                    style={{ width: 250 }}
                    showSearch
                    placeholder="Select Skill type"
                    onSelect={this.onSelectSkillType}
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                >
                    <Option value='0'>Hard Skill</Option>
                    <Option value='1'>Soft Skill</Option>
                </Select>)
        }
    }

    onSelectSkill = (value) => {
        this.props.onSelectSkill(value)
    }

    showHardSkillList = () => {
        var { value } = this.props
        if (value === 0) {
            return (
                <Select
                    style={{ width: 180 }}
                    showSearch
                    placeholder="Select skill"
                    onSelect={this.onSelectSkill}
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                >
                    {this.showPriorityOption()}
                </Select>)
        } else {
            return (
                <Select value={value}
                    style={{ width: 180 }}
                    showSearch
                    placeholder="Select skill"
                    onSelect={this.onSelectSkill}
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                >
                    {this.showPriorityOption()}
                </Select>)
        }
    }

    showSelect = () => {
        var { name } = this.props
        switch (name) {
            case 'positionID':
                return this.showPosition()
            case 'language':
                return this.showLanguage()
            case 'languagePriority':
                return this.showLanguagePriority()
            case 'softSkillID':
                return this.showSoftSkill()
            case 'hardSkill':
                return this.showHardSkill()
            case 'hardSkillPriority':
                return this.showHardSkillPriority()
            case 'certiLevel':
                return this.showCertificateLevel()
            case 'skillType':
                return this.showSkillType()
            case 'hardSkillList':
                return this.showHardSkillList()
            default:
                break;
        }
    }

    getUnSelectedList = (list) => {
        var result = []
        for (let index = 0; index < list.length; index++) {
            if (list[index].isSelect === false)
                result.push(list[index])
        }
        return result
    }

    getSelectedList = (value, list) => {
        var result = []
        for (let index = 0; index < list.length; index++) {
            if (list[index].isSelect === false || list[index].value === value)
                result.push(list[index])
        }
        return result
    }

    render() {
        return (
            <div>
                { this.showSelect()}
            </div>
        );
    }
}

export default SelectBar;