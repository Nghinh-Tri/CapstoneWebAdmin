import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchLanguage } from '../../../service/action/language/LanguageSelectBarAction';
import LanguageFormContent from './language-form-content/LanguageFormContent';

class LanguageForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isMinimize: false,
            language: {
                langID: 0,
                langLevel: 0
            }
        }
    }

    componentDidMount = () => {
        this.props.onFetchLanguage()
    }

    // add level
    onAddLanguage = () => {
        this.props.onAddLanguage(this.state.language)
    }

    getLanguageListNotSelect = (language) => {
        var { languageList } = this.props
        var listNotSelect = languageList.slice(0, languageList.length)
        if (typeof language !== 'undefined') {
            for (let i = 0; i < listNotSelect.length; i++) {
                for (let k = 0; k < language.length; k++) {
                    if (listNotSelect[i].langID === language[k].langID) {
                        var clone = { ...listNotSelect[i] }
                        clone.isSelect = true
                        listNotSelect[i] = clone
                    }
                }
            }
        }

        return listNotSelect
    }

    showItems = (language) => {
        var result = null;
        var languageList = this.getLanguageListNotSelect(language)
        if (typeof language !== 'undefined') {
            result = language.map((item, languageIndex) => {
                return (
                    <LanguageFormContent key={languageIndex}
                        languageIndex={languageIndex}
                        languageList={languageList}
                        onDeleteLanguage={this.props.onDeleteLanguage}
                        item={item}
                        onUpdateLanguageID={this.props.onUpdateLanguageID}
                        onUpdateLanguageLevel={this.props.onUpdateLanguageLevel}
                    />
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
        var { language, languageError } = this.props
        var result = []
        if (typeof language !== 'undefined')
            result = language

        const showLanguage = (language) => {
            if (this.state.isMinimize)
                return ""
            else {
                return (<>
                    {this.showItems(language)}
                    {this.props.languageList.length === language.length ?
                        '' :
                        <span className="material-icons add" style={{ marginTop: 10, cursor: 'pointer' }}
                            onClick={() => this.onAddLanguage()}>add_box</span>
                    }
                </>)
            }
        }
        return (
            <div class="card mb-4">
                <div class="card-header">
                    <div className='row'>
                        <div className='col-auto'>
                            Communicate Language <span style={{ color: 'red', fontWeight: 500 }} >*</span>
                        </div>
                        <div className='col'>
                            {typeof languageError.Languages !== 'undefined' ?
                                languageError.Languages.map((element, index) => {
                                    return (<div key={index} className="error text-danger font-weight-bold">{element}</div>)
                                })
                                : ''}
                        </div>
                        <div className='col'>
                            <span className="material-icons pull-right clear" style={{ cursor: 'pointer' }} onClick={this.setMinimize} >
                                {!this.state.isMinimize ? 'minimize' : 'crop_free'}
                            </span>
                        </div>
                    </div>
                </div>
                {!this.state.isMinimize ?
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                                <thead>
                                    <tr>
                                        <th className="text-center" >Language</th>
                                        <th className="text-center" >Level</th>
                                        <th className="text-center" ></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {showLanguage(result)}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    : ''}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        languageList: state.LanguageSelectBarReducer
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchLanguage: () => {
            dispatch(fetchLanguage())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LanguageForm);