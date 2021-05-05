import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { compose } from 'redux';
import SelectBar from '../../component/create-position-form/select-search/SelectBar';
import { checkSession } from '../../service/action/AuthenticateAction';
import * as Action from '../../service/action/LoginAction'
import { fetchProfileDetail, updateProfile } from '../../service/action/ProfileAction';
import { showRole } from '../../service/util/util';
class Register extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            email: '',
            password: '',
            confirmPassword: '',
            fullname: '',
            address: '',
            phoneNumber: '',
            role: 'Employee',
            identityNumber: '',
            submitted: false,
            isValidate: true,
            roleList: [
                // { label: 'Human Resources', value: 'admin' },
                { label: 'Project Manager', value: 'PM' },
                { label: 'Employee', value: 'Employee' },
            ],
            roleListUpdate: [
                { label: 'Project Manager', value: 'PM' },
                { label: 'Employee', value: 'Employee' },
            ],
            fieldError: '',
            messageError: ''
        }
    }

    componentDidMount = () => {
        this.props.checkSession()
        var { match } = this.props
        if (this.props.location.pathname !== '/employee/register')
            this.props.fetchEmpDetail(match.params.id)
    }

    componentDidUpdate(prevProps) {
        if (prevProps.profile !== this.props.profile) {
            var { profile } = this.props
            this.setState({
                fullname: profile.name,
                address: profile.address,
                phoneNumber: profile.phoneNumber,
                identityNumber: profile.identityNumber,
                role: profile.roleName,
                email: profile.email,
            })
            console.log('aasdasdasdasdasdasdad', this.props.duplicateError)
            if (prevProps.duplicateError !== this.props.duplicateError) {
                var { duplicateError } = this.props
                console.log(duplicateError)
                if (duplicateError.error.includes(':')) {
                    var list = duplicateError.error.split(':')
                    this.setState({ messageError: list[1], fieldError: list[0], })
                } else {
                    this.setState({ messageError: '', fieldError: '', })
                }
            }
        }
    }

    componentWillReceiveProps = () => {
        var { duplicateError } = this.props
        console.log('asdasdasdadsasdadasdadsasdasdadsasdasdasdagfdgsfg', duplicateError)

    }

    handleInputChange = (e) => {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        });
        if (name === 'userName') {
            var space = value.indexOf(" ")
            if (space >= 0)
                this.setState({ isValidate: false })
            else
                this.setState({ isValidate: true })
        }
    }

    onSelectRole = (value) => {
        this.setState({ role: value })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({ submitted: true });
        const { address, phoneNumber, userName, email, fullname, password, confirmPassword, identityNumber, role } = this.state;
        if (this.props.location.pathname === '/employee/register') {
            this.props.register(
                {
                    name: fullname,
                    identityNumber: identityNumber,
                    address: address,
                    email: email,
                    phoneNumber: phoneNumber,
                    userName: userName,
                    password: password,
                    confirmPassword: confirmPassword,
                    roleName: role
                }
            );
        } else {
            var { profile } = this.props
            this.props.updateProfile(profile.id,
                {
                    name: fullname,
                    identityNumber: identityNumber,
                    address: address,
                    email: email,
                    phoneNumber: phoneNumber,
                    roleName: role
                })
        }
    }

    render() {
        const { address, phoneNumber, userName, fullname, email, password,
            confirmPassword, identityNumber, submitted, role, } = this.state;
        var { error, duplicateError } = this.props
        var messageError = '', fieldError = ''
        if (typeof duplicateError !== 'undefined') {
            if (duplicateError.error !== '') {
                var list = duplicateError.error.split(':')
                messageError = list[1]
                fieldError = list[0]
            }
        }
        console.log('asdas', messageError, fieldError)

        return (
            <div className="content">
                <div className="container-fluid">
                    <div className="card"
                        style={{
                            marginTop: "50px"
                        }}
                    >
                        <div className="card-header card-header-primary">
                            <h4 className="card-title">
                                {this.props.location.pathname !== '/employee/register' ? 'Update Profile' : 'Create New Employee'}
                            </h4>
                        </div>
                        <div className="card-body">
                            <form onSubmit={this.handleSubmit} >
                                {/* Full name */}
                                <div className="row">
                                    <div className="col">
                                        <div className="form-group">
                                            <label className={`bmd-label-${this.props.location.pathname !== '/employee/register' ? 'static' : 'floating'}`}>Full name</label>
                                            <input name="fullname" type="text" className="form-control" value={fullname} onChange={this.handleInputChange} />
                                            {typeof error.Name !== 'undefined' ?
                                                error.Name.map((element, index) => {
                                                    return (<div key={index} className="error text-danger font-weight-bold">{element}</div>)
                                                })
                                                : ''}
                                        </div>
                                    </div>
                                </div>

                                {/* Email */}
                                <div className="row">
                                    <div className="col">
                                        <div className="form-group">
                                            <label className={`bmd-label-${this.props.location.pathname !== '/employee/register' ? 'static' : 'floating'}`}>Email</label>
                                            <input name="email" type="email" placeholder="Email" className="form-control" value={email} onChange={this.handleInputChange} />
                                            {typeof error.Email !== 'undefined' ?
                                                error.Email.map((element, index) => {
                                                    return (<div key={index} className="error text-danger font-weight-bold">{element}</div>)
                                                })
                                                : ''}
                                            {fieldError.trim().includes("Email") ? (
                                                <div className="error text-danger font-weight-bold">
                                                    {messageError}
                                                </div>
                                            ) : ("")
                                            }
                                        </div>
                                    </div>
                                </div>

                                {/* Username */}
                                {this.props.location.pathname === '/employee/register' ?
                                    <div className="row">
                                        <div className="col">
                                            <div className="form-group">
                                                <label className="bmd-label-floating">Username</label>
                                                <input name="userName" type="text" className="form-control" value={userName} onChange={this.handleInputChange} />
                                                {typeof error.UserName !== 'undefined' ?
                                                    error.UserName.map((element, index) => {
                                                        return (<div key={index} className="error text-danger font-weight-bold">{element}</div>)
                                                    })
                                                    : ''}
                                                {fieldError.trim().includes("Username") ? (
                                                    <div className="error text-danger font-weight-bold">
                                                        {messageError}
                                                    </div>
                                                ) : (
                                                    ""
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    : ''}

                                {/* Password */}
                                {this.props.location.pathname === '/employee/register' ?
                                    <div className="row">
                                        <div className="col-md-4" >
                                            <div className="form-group">
                                                <label className="bmd-label-floating">Password</label>
                                                <input name="password" type="password" className="form-control" value={password} onChange={this.handleInputChange} />
                                                {typeof error.Password !== 'undefined' ?
                                                    error.Password.map((element, index) => {
                                                        return (<div key={index} className="error text-danger font-weight-bold">{element}</div>)
                                                    })
                                                    : ''}
                                            </div>
                                        </div>

                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label className="bmd-label-floating">Confirm password</label>
                                                <input name="confirmPassword" type="password" value={confirmPassword} className="form-control" onChange={this.handleInputChange} />
                                                {typeof error.ConfirmPassword !== 'undefined' ?
                                                    error.ConfirmPassword.map((element, index) => {
                                                        return (<div key={index} className="error text-danger font-weight-bold">{element}</div>)
                                                    })
                                                    : ''}
                                            </div>
                                        </div>
                                    </div>
                                    : ''}

                                {/* Phone Number */}
                                <div className="row">
                                    <div className="col">
                                        <div className="form-group">
                                            <label className={`bmd-label-${this.props.location.pathname !== '/employee/register' ? 'static' : 'floating'}`}>Phone Number</label>
                                            <input type="text" name="phoneNumber" value={phoneNumber} className="form-control" onChange={this.handleInputChange} />
                                            {typeof error.PhoneNumber !== 'undefined' ?
                                                error.PhoneNumber.map((element, index) => {
                                                    return (<div key={index} className="error text-danger font-weight-bold">{element}</div>)
                                                })
                                                : ''}
                                        </div>
                                    </div>
                                </div>

                                {/* Identity Number */}
                                <div className="row">
                                    <div className="col">
                                        <div className="form-group">
                                            <label className={`bmd-label-${this.props.location.pathname !== '/employee/register' ? 'static' : 'floating'}`}>Identity Number</label>
                                            <input name="identityNumber" type="identityNumber" placeholder="" className="form-control" value={identityNumber} onChange={this.handleInputChange} />
                                            {typeof error.IdentityNumber !== 'undefined' ?
                                                error.IdentityNumber.map((element, index) => {
                                                    return (<div key={index} className="error text-danger font-weight-bold">{element}</div>)
                                                })
                                                : ''}
                                        </div>
                                    </div>
                                </div>

                                {/* Adress */}
                                <div className="row">
                                    <div className="col">
                                        <div className="form-group">
                                            <label className={`bmd-label-${this.props.location.pathname !== '/employee/register' ? 'static' : 'floating'}`}>Adress</label>
                                            <input type="text" name="address" className="form-control" value={address} onChange={this.handleInputChange} />
                                            {typeof error.Address !== 'undefined' ?
                                                error.Address.map((element, index) => {
                                                    return (<div key={index} className="error text-danger font-weight-bold">{element}</div>)
                                                })
                                                : ''}
                                        </div>
                                    </div>
                                </div>

                                {/* Role */}
                                <div className="row">
                                    <div className="col">
                                        <label className={`bmd-label-${this.props.location.pathname !== '/employee/register' ? 'static' : 'floating'}`}>Role</label>
                                        <SelectBar name='role'
                                            type="role"
                                            value={this.state.role}
                                            placeholder='Select role'
                                            list={this.state.roleList}
                                            onSelectRole={this.onSelectRole} />
                                        {submitted && !role &&
                                            <div className="error text-danger font-weight-bold" >Role is required</div>
                                        }
                                    </div>
                                </div>
                                <button type="submit" className="btn btn-primary pull-right mt-3    ">
                                    {this.props.location.pathname !== '/employee/register' ? 'Update' : 'Create'}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapState = (state) => {
    return {
        registering: state.authentication,
        profile: state.ProfileFetchReducer,
        error: state.ErrorReducer,
        duplicateError: state.RegisterErrorReducer
    };
}

const mapDispatchToProp = dispatch => {
    return {
        register: (emp) => [
            dispatch(Action.register(emp))
        ],
        checkSession: () => {
            dispatch(checkSession())
        },
        fetchEmpDetail: (empID) => {
            dispatch(fetchProfileDetail(empID))
        },
        updateProfile: (empID, emp) => {
            dispatch(updateProfile(empID, emp))
        }
    }
}

export default compose(withRouter, connect(mapState, mapDispatchToProp))(Register);