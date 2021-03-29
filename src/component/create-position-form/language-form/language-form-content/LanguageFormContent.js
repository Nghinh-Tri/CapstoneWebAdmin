import React, { Component } from 'react';
import { connect } from 'react-redux';
import SelectSearch from '../../select-search/SelectSearch';
import * as Action from "../../../../service/action/LanguageSelectBarAction";
import { convertLanguageList } from "../../../../service/util/util";

class LanguageFormContent extends Component {

    componentDidMount = () => {
        this.props.fetchLanguage()
    }

    onDeleteLanguage = (languageIndex, positionFormIndex) => {
        this.props.onDeleteLanguage(languageIndex, positionFormIndex)
    }
// add level
    render() {
        var { item, languageIndex, positionFormIndex, language } = this.props
        var listConverted = convertLanguageList(language)
        return (
            <div className="row">
                <div className="col-1 mt-15-ml-30">
                    <label className="bmd-label  ">
                        <h5 className="font-weight-bold">Language</h5>
                    </label>
                </div>
                <div className="col-3">
                    <SelectSearch list={listConverted}
                        onUpdateLanguageID={this.props.onUpdateLanguageID}
                        name="language"
                        positionFormIndex={positionFormIndex}
                        languageIndex={languageIndex}
                        value={item} />
                </div>
                <div className="col-3">
                    <SelectSearch list={listConverted}
                        onUpdateLanguageLevel={this.props.onUpdateLanguageLevel}
                        name="level"
                        positionFormIndex={positionFormIndex}
                        languageIndex={languageIndex}
                        value={item} />
                </div>

                <div className="col-1 mt-15-ml-30">
                    <span className="material-icons pull-right clear" onClick={() => this.onDeleteLanguage(languageIndex, positionFormIndex)}>clear</span>
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