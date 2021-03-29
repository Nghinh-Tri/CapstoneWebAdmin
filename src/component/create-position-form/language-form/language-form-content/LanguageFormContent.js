import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as Action from "../../../../service/action/LanguageSelectBarAction";
import { convertLanguageList } from "../../../../service/util/util";
import SelectBar from '../../select-search/SelectBar';

class LanguageFormContent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            level: [
                { label: 10, value: 10 },
                { label: 9, value: 9 },
                { label: 8, value: 8 },
                { label: 7, value: 7 },
                { label: 6, value: 6 },
                { label: 5, value: 5 },
                { label: 4, value: 4 },
                { label: 3, value: 3 },
                { label: 2, value: 2 },
                { label: 1, value: 1 },
            ]
        }
    }


    componentDidMount = () => {
        this.props.fetchLanguage()
    }

    onDeleteLanguage = (languageIndex) => {
        this.props.onDeleteLanguage(languageIndex)
    }
    // add level
    render() {
        var { item, languageIndex, language, languageList } = this.props
        var listConverted = convertLanguageList(languageList)
        return (
            <div className="row">
                <div className="col-auto" style={{ marginLeft: 30 }}>
                    <label className="bmd-label  ">
                        <h5 className="font-weight-bold">Language</h5>
                    </label>
                </div>
                <div className="col-3">
                    <SelectBar list={listConverted}
                        onUpdateLanguageID={this.props.onUpdateLanguageID}
                        name="language"
                        languageIndex={languageIndex}
                        value={item.langID} />
                </div>
                <div className="col-auto">
                    <label className="bmd-label  ">
                        <h5 className="font-weight-bold">Language Level</h5>
                    </label>
                </div>
                <div className="col-3">
                    <SelectBar list={this.state.level}
                        onUpdateLanguageLevel={this.props.onUpdateLanguageLevel}
                        name="languageLevel"
                        languageIndex={languageIndex}
                        value={item.langLevel} />
                </div>

                <div className="col-auto">
                    <span className="material-icons pull-right clear" onClick={() => this.onDeleteLanguage(languageIndex)}>clear</span>
                </div>
            </div>

        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.LanguageSelectBarReducer
    }
}

const mapDispatchToProp = (dispatch, props) => {
    return {
        fetchLanguage: () => {
            dispatch(Action.fetchLanguage())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProp)(LanguageFormContent);