import React, { Component } from 'react';
import { connect } from 'react-redux';
import { changePassword, refreshPage } from '../../service/action/user/LoginAction';

class ChangePassword extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentPass: '',
            newPass: '',
            confirmPass: ''
        }
    }

    handleChange = (e) => {
        var { name, value } = e.target
        this.setState({ [name]: value })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        this.props.changePass({
            currentPassword: this.state.currentPass,
            newPassword: this.state.newPass,
            confirmPassword: this.state.confirmPass
        })
    }

    componentWillUnmount() {
        this.props.refreshPage()
    }

    render() {
        var { error } = this.props
        return (
            <div class="container">
                <div class="row justify-content-center">
                    <div class="col-lg-5">
                        <div class="card shadow-lg border-0 rounded-lg mt-5">
                            <div class="card-header"><h4 class="card-title ">Change Password</h4></div>
                            <div class="card-body">
                                <form onSubmit={this.handleSubmit}>
                                    <div class="form-group">
                                        <label class="small mb-1" for="inputEmailAddress">Current Password</label>
                                        <input class="form-control py-4" type="password"
                                            id="email" name="currentPass"
                                            className="form-control"
                                            onChange={this.handleChange} />
                                        {typeof error.CurrentPassword !== 'undefined' ?
                                            error.CurrentPassword.map((element, index) => {
                                                return (<div key={index} className="error text-danger font-weight-bold">{element}</div>)
                                            })
                                            : ''}
                                    </div>
                                    <div class="form-group">
                                        <label class="small mb-1" for="inputPassword">New Password</label>
                                        <input class="form-control py-4" type="password"
                                            id="password" name="newPass"
                                            className="form-control"
                                            onChange={this.handleChange} />
                                        {typeof error.NewPassword !== 'undefined' ?
                                            error.NewPassword.map((element, index) => {
                                                return (<div key={index} className="error text-danger font-weight-bold">{element}</div>)
                                            })
                                            : ''}
                                    </div>
                                    <div class="form-group">
                                        <label class="small mb-1" for="inputPassword">Confirm</label>
                                        <input class="form-control py-4" type="password"
                                            id="password" name="confirmPass"
                                            className="form-control"
                                            onChange={this.handleChange} />
                                        {typeof error.ConfirmPassword !== 'undefined' ?
                                            error.ConfirmPassword.map((element, index) => {
                                                return (<div key={index} className="error text-danger font-weight-bold">{element}</div>)
                                            })
                                            : ''}
                                    </div>
                                    <div class="form-group d-flex align-items-center justify-content-between mt-4 mb-0">
                                        <button type='submit' class="btn btn-primary">Change</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProp = (state) => {
    return {
        error: state.ErrorReducer
    }
}

const mapDispatchToProp = (dispatch) => {
    return {
        changePass: (password) => {
            dispatch(changePassword(password))
        },
        refreshPage: () => {
            dispatch(refreshPage())
        }
    }
}

export default connect(mapStateToProp, mapDispatchToProp)(ChangePassword);