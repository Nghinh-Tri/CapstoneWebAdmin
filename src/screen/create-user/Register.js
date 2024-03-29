import { AutoComplete, Modal } from 'antd';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { compose } from 'redux';
import SelectBar from '../../component/create-position-form/select-search/SelectBar';
import { suggestAddress } from '../../service/action/user/AddressAutoFill';
import { checkSession } from '../../service/action/user/AuthenticateAction';
import * as Action from '../../service/action/user/LoginAction'
import { fetchProfileDetail, updateProfile } from '../../service/action/user/ProfileAction';
import { history } from '../../service/helper/History';
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
                { label: 'Project Manager', value: 'PM' },
                { label: 'Employee', value: 'Employee' },
            ],
            fieldError: '',
            messageError: '',
            dataSource: []
        }
    }

    componentDidMount = () => {
        this.props.checkSession()
        var { match } = this.props
        if (this.props.location.pathname !== '/employee/register') {
            this.props.fetchEmpDetail(match.params.id)
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.status !== this.props.status) {
            if (this.props.status) {
                let { userID, role, name, phone, email } = this.props.profile
                let { location } = this.props
                let empID = this.props.profile.id
                Modal.success({
                    title: this.props.location.pathname === '/employee/register' ? 'Create Employee Successfully' : 'Update Employee Successfully',
                    onOk() {
                        if (location.pathname === '/employee/register') {
                            if (role === 'Employee') {
                                localStorage.setItem('name', name)
                                localStorage.setItem('phone', phone)
                                localStorage.setItem('email', email)
                                history.push('/employee/position-assign', { empID: userID, role: role });
                            } else {
                                history.push('/employee')
                            }
                        }
                        else
                            history.push(`/employee/profile/${empID}`)
                    }
                })
            }
            else
                Modal.error({
                    title: 'Create Position Failed'
                })
        }
        else if (prevProps.profile !== this.props.profile) {
            var { profile } = this.props
            this.setState({
                fullname: profile.name,
                address: profile.address,
                phoneNumber: profile.phoneNumber,
                identityNumber: profile.identityNumber,
                role: profile.roleName,
                email: profile.email,
            })
        } else if (prevProps.addressSugget !== this.props.addressSugget) {
            this.setState({ dataSource: this.props.addressSugget })
        }
    }

    componentWillUnmount = () => {
        this.props.refreshPage()
    }

    handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'phoneNumber') {
            var phone = value
            if (/^\d*$/.test(phone.trim())) {
                this.setState({ phoneNumber: phone.trim() })
            }
        } else if (name === 'identityNumber') {
            var id = value
            if (/^\d*$/.test(id.trim())) {
                this.setState({ identityNumber: id.trim() })
            }
        }
        else {
            this.setState({ [name]: value });
        }
    }

    onSelectRole = (value) => {
        this.setState({ role: value })
    }

    onSelect = (value) => {
        this.setState({ address: value })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({ submitted: true });
        const { address, phoneNumber, userName, email, fullname, identityNumber, role } = this.state;
        if (this.props.location.pathname === '/employee/register') {
            this.props.register(
                {
                    name: fullname.trim(),
                    identityNumber: identityNumber.trim(),
                    address: address.trim(),
                    email: email.trim(),
                    phoneNumber: phoneNumber.trim(),
                    userName: userName.trim(),
                    roleName: role
                }
            );
        } else {
            var { profile } = this.props
            this.props.updateProfile(profile.id,
                {
                    name: fullname.trim(),
                    identityNumber: identityNumber.trim(),
                    address: address.trim(),
                    email: email.trim(),
                    phoneNumber: phoneNumber.trim(),
                    roleName: role
                })
        }
    }

    onInputAddress = (e) => {
        this.setState({ address: e.trim() })
        this.props.getAddressSuggestion(e.trim())
    }

    render() {
        const { address, phoneNumber, userName, fullname, email,
            identityNumber, dataSource } = this.state;
        var { error, duplicateError } = this.props
        var messageError = '', fieldError = ''
        if (typeof duplicateError !== 'undefined') {
            if (duplicateError.error !== '') {
                var list = duplicateError.error.split(':')
                messageError = list[1]
                fieldError = list[0]
            }
        }
        return (
            <div className="content">
                <div className="container-fluid">
                    <div className="card">
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
                                            <label className='bmd-label-static'>
                                                Full name <span style={{ color: 'red', fontWeight: 500 }} >*</span>
                                            </label>
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
                                            <label className='bmd-label-static'>
                                                Email <span style={{ color: 'red', fontWeight: 500 }} >*</span>
                                            </label>
                                            <input name="email" type="text" className="form-control" value={email} onChange={this.handleInputChange} />
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
                                                <label className="bmd-label-floating">
                                                    Username <span style={{ color: 'red', fontWeight: 500 }} >*</span>
                                                </label>
                                                <input name="userName" type="text" className="form-control"
                                                    value={userName} onChange={this.handleInputChange}
                                                    style={{ backgroundColor: 'white' }} />
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

                                {/* Phone Number */}
                                <div className="row">
                                    <div className="col">
                                        <div className="form-group">
                                            <label className='bmd-label-floating'>
                                                Phone Number <span style={{ color: 'red', fontWeight: 500 }} >*</span>
                                            </label>
                                            <input type="tel" name="phoneNumber" value={phoneNumber} className="form-control" onChange={this.handleInputChange} />
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
                                            <label className='bmd-label-floating'>
                                                Identity Number <span style={{ color: 'red', fontWeight: 500 }} >*</span>
                                            </label>
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
                                            <label className='bmd-label-floating'>
                                                Address <span style={{ color: 'red', fontWeight: 500 }} >*</span>
                                            </label>
                                            <AutoComplete
                                                className="form-control"
                                                name='address'
                                                dataSource={dataSource}
                                                inputValue={address}
                                                style={{ borderStyle: 'none' }}
                                                onSelect={this.onSelect}
                                                onChange={this.onInputAddress}
                                            />
                                            {/* <input type="text" name="address" className="form-control" value={address} onChange={this.handleInputChange} /> */}
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
                                        <label className='bmd-label-floating'>
                                            Role <span style={{ color: 'red', fontWeight: 500 }} >*</span>
                                        </label>
                                        <SelectBar name='role'
                                            type="role"
                                            value={this.state.role}
                                            placeholder='Select role'
                                            list={this.state.roleList}
                                            onSelectRole={this.onSelectRole} />
                                        {/* {submitted && !role &&
                                            <div className="error text-danger font-weight-bold" >Role is required</div>
                                        } */}
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
        profile: state.ProfileReducer,
        error: state.ErrorReducer,
        duplicateError: state.RegisterErrorReducer,
        addressSugget: state.SuggestAddressReducer,
        status: state.StatusReducer
    };
}

const mapDispatchToProp = dispatch => {
    return {
        register: (emp) => {
            dispatch(Action.register(emp))
        },
        checkSession: () => {
            dispatch(checkSession())
        },
        fetchEmpDetail: (empID) => {
            dispatch(fetchProfileDetail(empID))
        },
        updateProfile: (empID, emp) => {
            dispatch(updateProfile(empID, emp))
        },
        refreshPage: () => {
            dispatch(Action.refreshPage())
        },
        getAddressSuggestion: (value) => {
            dispatch(suggestAddress(value))
        }
    }
}

export default compose(withRouter, connect(mapState, mapDispatchToProp))(Register);