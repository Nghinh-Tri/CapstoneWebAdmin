import React, { Component } from 'react';
import { connect } from 'react-redux';
import { checkSession } from '../../service/action/AuthenticateAction';
import { createPosition } from '../../service/action/PositionSelectBarAction';

class CreatePosition extends Component {

    constructor(props) {
        super(props);
        this.state = {
            position: '',
            description: ''
        }
    }

    componentDidMount = () => {
        this.props.checkSession()
    }

    handleChange = (e) => {
        var { name, value } = e.target;
        this.setState({ [name]: value })
    }

    onSubmit = (e) => {
        e.preventDefault()
        this.props.createPosition({ name: this.state.position, description: this.state.description })
    }

    render() {
        return (
            <div className="card">
                <div className="card-header">
                    <p style={{ fontSize: 20, fontWeight: 600, color: '#9c27b0' }}>Create Position</p>
                </div>
                <div className="card-body">
                    <form onSubmit={this.handleSubmit} >
                        <div className='row'>
                            <div className='col'>
                                <fieldset className="form-group">
                                    <label className="bmd-label-floating">Position</label>
                                    <input type="text"
                                        id="position" name="position"
                                        className="form-control"
                                        onChange={this.handleChange} />
                                </fieldset>
                            </div>
                        </div>
                        <div className="row" style={{ marginTop: 10 }}>
                            <div className='col'>
                                <fieldset className="form-group">
                                    <label className="bmd-label-floating">Description</label>
                                    <textarea col='5' type="textarea"
                                        id="description" name="description"
                                        className="form-control"
                                        onChange={this.handleChange} />
                                </fieldset>
                            </div>
                        </div>
                        <button className="btn btn-primary pull-right" onClick={this.onSubmit}>Create</button>
                    </form>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        positionList: state.PositionSelectBarReducer
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        checkSession: () => {
            dispatch(checkSession())
        },
        createPosition: (position) => {
            dispatch(createPosition(position))
        }
    }
}

export default connect(null, mapDispatchToProps)(CreatePosition);