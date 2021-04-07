import React, { Component } from 'react';
import { connect } from 'react-redux';
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
            role: '',
            identityNumber: '',
            submitted: false,
            isValidate: true,
            roleList: [
                { label: 'Administrator', value: 'admin' },
                { label: 'Project Manager', value: 'PM' },
                { label: 'Employee', value: 'Employee' },
            ],
            roleListUpdate: [
                { label: 'Project Manager', value: 'PM' },
                { label: 'Employee', value: 'Employee' },
            ]
        }
    }

    componentDidMount = () => {
        this.props.checkSession()
        var { match } = this.props
        if (typeof match !== 'undefined')
            this.props.fetchEmpDetail(match.params.id)
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.profile !== prevState.profile) {
            return { someState: nextProps.profile };
        }
        return null;
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
        }
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
        this.setState({
            role: value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({ submitted: true });
        const { address, phoneNumber, userName, email, fullname, password, confirmPassword, identityNumber, role } = this.state;
        if (typeof this.props.match === 'undefined') {
            if (email && password) {
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
            }
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
        const { address, phoneNumber, userName, fullname, email, password, confirmPassword, identityNumber, submitted, role } = this.state;

        return (
            <div className="content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="card">
                            <div className="card-header card-header-primary">
                                <h4 className="card-title">
                                    {typeof this.props.match !== 'undefined' ? 'Update Certificate' : 'Create Certificate'}
                                </h4>
                            </div>
                            <div className="card-body">
                                <form onSubmit={this.handleSubmit} >
                                    {/* Full name */}
                                    <div className="row">
                                        <div className="col-1" style={{ marginTop: 15 }}>
                                            <label className="bmd-label-floating">Full name : </label>
                                        </div>
                                        <div className="col">
                                            <div className="form-group">
                                                <label className={`bmd-label-${typeof this.props.match !== 'undefined' ? 'static' : 'floating'}`}>Full name</label>
                                                <input name="fullname" type="text" className="form-control" value={fullname} onChange={this.handleInputChange} />
                                                {submitted && !fullname &&
                                                    <div className="error text-danger font-weight-bold">Full name is required</div>
                                                }
                                            </div>
                                        </div>
                                    </div>

                                    {/* Email */}
                                    <div className="row">
                                        <div className="col-1" style={{ marginTop: 15 }}>
                                            <label className="bmd-label-floating">Email : </label>
                                        </div>
                                        <div className="col">
                                            <div className="form-group">
                                                <label className={`bmd-label-${typeof this.props.match !== 'undefined' ? 'static' : 'floating'}`}>Email</label>
                                                <input name="email" type="email" placeholder="Email" className="form-control" value={email} onChange={this.handleInputChange} />
                                                {submitted && !email &&
                                                    <div className="error text-danger font-weight-bold">Email is required</div>
                                                }
                                            </div>
                                        </div>
                                    </div>

                                    {/* Username */}
                                    {typeof this.props.match === 'undefined' ?
                                        <div className="row">
                                            <div className="col-1" style={{ marginTop: 15 }}>
                                                <label className="bmd-label-floating">Username : </label>
                                            </div>
                                            <div className="col">
                                                <div className="form-group">
                                                    <label className="bmd-label-floating">Username</label>
                                                    <input name="userName" type="text" className="form-control" value={userName} onChange={this.handleInputChange} />
                                                    {submitted && !userName &&
                                                        <div className="error text-danger font-weight-bold">Username is required</div>
                                                    }
                                                    {
                                                        !this.state.isValidate ?
                                                            <div className="error text-danger font-weight-bold">Username must not have space</div> : ''
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                        : ''}

                                    {/* Password */}
                                    {typeof this.props.match === 'undefined' ?
                                        <div className="row">
                                            <div className="col-1" style={{ marginTop: 15 }}>
                                                <label className="bmd-label-floating">Password : </label>
                                            </div>
                                            <div className="col-md-4" >
                                                <div className="form-group">
                                                    <label className="bmd-label-floating">Password</label>
                                                    <input name="password" type="password" className="form-control" value={password} onChange={this.handleInputChange} />
                                                    {submitted && !password &&
                                                        <div className="error text-danger font-weight-bold">Password is required</div>
                                                    }
                                                </div>
                                            </div>
                                            <div className="col-auto" style={{ marginTop: 15 }}>
                                                <label className="bmd-label-floating">Confirm Password : </label>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="form-group">
                                                    <label className="bmd-label-floating">Confirm password</label>
                                                    <input name="confirmPassword" type="password" value={confirmPassword} className="form-control" onChange={this.handleInputChange} />
                                                    {submitted && !confirmPassword &&
                                                        <div className="error text-danger font-weight-bold">Confirm password is required</div>
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                        : ''}

                                    {/* Phone Number */}
                                    <div className="row">
                                        <div className="col-1" style={{ marginTop: 15 }}>
                                            <label className="bmd-label-floating">Phone : </label>
                                        </div>
                                        <div className="col">
                                            <div className="form-group">
                                                <label className={`bmd-label-${typeof this.props.match !== 'undefined' ? 'static' : 'floating'}`}>Phone Number</label>
                                                <input type="text" name="phoneNumber" value={phoneNumber} className="form-control" onChange={this.handleInputChange} />
                                                {submitted && !phoneNumber &&
                                                    <div className="error text-danger font-weight-bold">Phone is required</div>
                                                }
                                            </div>
                                        </div>
                                    </div>

                                    {/* Identity Number */}
                                    <div className="row">
                                        <div className="col-1" style={{ marginTop: 15 }}>
                                            <label className="bmd-label-floating">ID No : </label>
                                        </div>
                                        <div className="col">
                                            <div className="form-group">
                                                <label className={`bmd-label-${typeof this.props.match !== 'undefined' ? 'static' : 'floating'}`}>Identity Number</label>
                                                <input name="identityNumber" type="identityNumber" placeholder="" className="form-control" value={identityNumber} onChange={this.handleInputChange} />
                                                {submitted && !identityNumber &&
                                                    <div className="error text-danger font-weight-bold">Identity Number is required</div>
                                                }
                                            </div>
                                        </div>
                                    </div>

                                    {/* Adress */}
                                    <div className="row">
                                        <div className="col-1" style={{ marginTop: 15 }}>
                                            <label className="bmd-label-floating">Address : </label>
                                        </div>
                                        <div className="col">
                                            <div className="form-group">
                                                <label className={`bmd-label-${typeof this.props.match !== 'undefined' ? 'static' : 'floating'}`}>Adress</label>
                                                <input type="text" name="address" className="form-control" value={address} onChange={this.handleInputChange} />
                                                {submitted && !address &&
                                                    <div className="error text-danger font-weight-bold" >Address is required</div>
                                                }
                                            </div>
                                        </div>
                                    </div>

                                    {/* Role */}
                                    <div className="row">
                                        <div className="col-1" style={{ marginTop: 5 }}>
                                            <label className="bmd-label-floating">Role : </label>
                                        </div>
                                        {role !== 'PM' ?
                                            <div className="col">
                                                <SelectBar name='role'
                                                    type="role"
                                                    value={role}
                                                    placeholder='Select role'
                                                    list={role === '' ? this.state.roleList : this.state.roleListUpdate}
                                                    onSelectRole={this.onSelectRole} />
                                                {submitted && !role &&
                                                    <div className="error text-danger font-weight-bold" >Role is required</div>
                                                }
                                            </div>
                                            :
                                            <div className="col" style={{marginTop:5}}>
                                                <label className="bmd-label">
                                                    <h5 style={{fontWeight:350,fontSize:15}}>{showRole(role)}</h5>
                                                </label>
                                            </div>
                                        }
                                    </div>

                                    <button type="submit" className="btn btn-primary pull-right">
                                        {typeof this.props.match !== 'undefined' ? 'Update' : 'Create'}
                                    </button>
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
    return {
        registering: state.authentication,
        profile: state.ProfileFetchReducer
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

export default connect(mapState, mapDispatchToProp)(Register);