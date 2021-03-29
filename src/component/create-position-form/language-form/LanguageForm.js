import React, { Component } from 'react';
import LanguageFormContent from './language-form-content/LanguageFormContent';

class LanguageForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isMinimize: false
        }
    }
// add level

    onAddLanguage = (positionFormIndex) => {
        this.props.onAddLanguage(positionFormIndex)
    }

    showItems = (language, positionFormIndex) => {
        var result = null;
        result = language.map((item, languageIndex) => {
            return (
                <LanguageFormContent key={languageIndex}
                    positionFormIndex={positionFormIndex}
                    languageIndex={languageIndex}
                    onDeleteLanguage={this.props.onDeleteLanguage}
                    item={item}
                    onUpdateLanguageID={this.props.onUpdateLanguageID}
                    onUpdateLanguageLevel={this.props.onUpdateLanguageLevel}

                />
            );
        })
        return result;
    }

    setMinimize = () => {
        this.setState({
            isMinimize: !this.state.isMinimize
        })
    }

    render() {
        var { language, positionFormIndex } = this.props

        const showLanguage = (language, positionFormIndex) => {
            if (this.state.isMinimize)
                return ""
            else {
                return (<div className="card-body">
                    {this.showItems(language, positionFormIndex)}
                    <span className="material-icons add"
                        onClick={() => this.onAddLanguage(positionFormIndex)}>add_box</span>
                </div>)
            }

        }
        return (
            <div className="card mb-50">
                <div className="card-header ">
                    <div className="row">
                        <div className="col">
                            <h5 className="font-weight-bold">Language</h5>
                        </div>
                        <div className="col pull-right">
                            <span className="material-icons pull-right clear" onClick={this.setMinimize} > {this.state.isMinimize === false ? 'minimize' : 'crop_free'}</span>
                        </div>
                    </div>

                </div>
                {showLanguage(language, positionFormIndex)}
            </div>

        );
    }
}

export default LanguageForm;