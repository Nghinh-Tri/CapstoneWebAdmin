import React, { Component } from 'react';
import { connect } from 'react-redux';
import { checkSession } from '../../service/action/AuthenticateAction';
import * as Action from '../../service/action/LoginAction'
class Register extends Component {

    constructor(props) {
        super(props);
        // this.props.logout();

        this.state = {
            userName: '',
            email: '',
            password: '',
            confirmPassword: '',
            fullname: '',
            address: '',
            phoneNumber: '',
            doB: '',
            identityNumber: '',
            submitted: false
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount = () => {
        this.props.checkSession()
    }

    handleInputChange = (e) => {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({ submitted: true });
        const { address, phoneNumber, doB, userName, email, fullname, password, confirmPassword, identityNumber } = this.state;
        if (email && password) {
            this.props.register(address, phoneNumber, doB, userName, fullname, email, password, confirmPassword, identityNumber);
        }
    }
    render() {
        const { address, phoneNumber, doB, userName, fullname, email, password, confirmPassword, identityNumber, submitted } = this.state;

        return (
            <div className="content">
                <div className="container-fluid">
                    <div className="row">
                            <div className="card">
                                <div className="card-header card-header-primary">
                                    <h4 className="card-title">Create Emp</h4>
                                    <p className="card-category">EMP create account</p>
                                </div>
                                <div className="card-body">
                                    <form onSubmit={this.handleSubmit} >
                                        <div className="row">
                                            <div className="col-md-3">
                                                <div className="form-group">
                                                    <label className="bmd-label-floating">Full name</label>
                                                    <input
                                                        name="fullname"
                                                        type="text"
                                                        className="form-control"
                                                        value={fullname}
                                                        onChange={this.handleInputChange}
                                                    />
                                                    {submitted && !fullname &&
                                                        <div className="help-block error">Full name is required</div>
                                                    }
                                                </div>
                                            </div>

                                            <div className="col-md-3">
                                                <div className="form-group">
                                                    <label className="bmd-label-floating">Username</label>
                                                    <input
                                                        name="userName"
                                                        type="text"
                                                        className="form-control"
                                                        value={userName}
                                                        onChange={this.handleInputChange}
                                                    />
                                                    {submitted && !userName &&
                                                        <div className="help-block error">Username is required</div>
                                                    }
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="form-group">
                                                    <label className="bmd-label-floating">Email address</label>
                                                    <input
                                                        name="email"
                                                        type="email"
                                                        placeholder="Email"
                                                        className="form-control"
                                                        value={email}
                                                        onChange={this.handleInputChange}
                                                    />
                                                    {submitted && !email &&
                                                        <div className="help-block error">Email is required</div>
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label className="bmd-label-floating">Identity Number</label>
                                                    <input
                                                        name="identityNumber"
                                                        type="identityNumber"
                                                        placeholder=""
                                                        className="form-control"
                                                        value={identityNumber}
                                                        onChange={this.handleInputChange}
                                                    />
                                                    {submitted && !identityNumber &&
                                                        <div className="help-block error">Identity Number is required</div>
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label className="bmd-label-floating">Password</label>
                                                    <input
                                                        name="password"
                                                        type="password"
                                                        className="form-control"
                                                        value={password}
                                                        onChange={this.handleInputChange}
                                                    />
                                                    {submitted && !password &&
                                                        <div className="help-block error">Password is required</div>
                                                    }
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label className="bmd-label-floating">Confirm password</label>
                                                    <input
                                                        name="confirmPassword"
                                                        type="password"
                                                        value={confirmPassword}
                                                        className="form-control"
                                                        onChange={this.handleInputChange}

                                                    />
                                                    {submitted && !confirmPassword &&
                                                        <div className="help-block error">Confirm password is required</div>
                                                    }
                                                </div>
                                            </div>
                                        </div>


                                        <div className="row">
                                            <div className="col-md-6">
                                                <label className="bmd-label">Date of Birth</label>
                                                <div className="form-group">
                                                    <input
                                                        type="date"
                                                        name="doB"
                                                        className="form-control"
                                                        value={doB}
                                                        onChange={this.handleInputChange}
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-md-12">
                                                <div className="form-group">
                                                    <label className="bmd-label-floating">Adress</label>
                                                    <input
                                                        type="text"
                                                        name="address"
                                                        className="form-control"
                                                        value={address}
                                                        onChange={this.handleInputChange}
                                                    />
                                                    {submitted && !address &&
                                                        <div className="help-block error">Address is required</div>
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-12">
                                                <div className="form-group">
                                                    <label className="bmd-label-floating">Phone Number</label>
                                                    <input
                                                        type="text"
                                                        name="phoneNumber"
                                                        value={phoneNumber}
                                                        className="form-control"
                                                        onChange={this.handleInputChange}
                                                    />
                                                    {submitted && !phoneNumber &&
                                                        <div className="help-block error">Phone is required</div>
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                        <button type="submit" className="btn btn-primary pull-right">Create Emp</button>
                                        <div className="clearfix" />
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
            </div>
        );
    }
}

const mapState = (state) => {
    return { registering: state.authentication };
}

const mapDispatchToProp = dispatch => {
    return {
        register: (address, phoneNumber, doB, userName, fullname, email, password, confirmPassword, identityNumber) => [
            dispatch(Action.register(address, phoneNumber, doB, userName, fullname, email, password, confirmPassword, identityNumber))
        ],
        checkSession: () => {
            dispatch(checkSession())
        }
    }
}


export default connect(mapState, mapDispatchToProp)(Register);