import { Button } from 'antd';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as Action from '../../service/action/user/LoginAction'

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            submitted: false,
        };
    }

    componentDidMount() {
        const user = localStorage.getItem('token') // your saved token in localstorage
        if (user && user !== 'undefined') {            // check for not undefined
            this.props.history.push('/')               // now you can redirect your desired route
        }
    }  

    handleChange = (e) => {
        var { name, value } = e.target;
        this.setState({ [name]: value })
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({ submitted: true });
        const { email, password } = this.state;
        this.props.login(email, password);
    }

    render() {
        var { error } = this.props
        return (
            <div id="layoutAuthentication">
                <div id="layoutAuthentication_content">
                    <main>
                        <div className="container">
                            <div className="row justify-content-center">
                                <div className="col-lg-5">
                                    <div className="card shadow-lg border-0 rounded-lg mt-5">
                                        <div className="card-header"><h3 class="text-center font-weight-light my-4">Login to Human Resources</h3></div>
                                        <div className="card-body">
                                            <form>
                                                <div className="form-group">
                                                    <label className="small mb-1" for="inputEmailAddress">Email</label>
                                                    <input className="form-control py-4" type="text"
                                                        id="email" name="email"
                                                        className="form-control"
                                                        onChange={this.handleChange} />
                                                    {typeof error.Email !== 'undefined' ?
                                                        error.Email.map((element, index) => {
                                                            return (<div key={index} className="error text-danger font-weight-bold">{element}</div>)
                                                        })
                                                        : ''}
                                                </div>
                                                <div className="form-group">
                                                    <label className="small mb-1" for="inputPassword">Password</label>
                                                    <input className="form-control py-4" type="password"
                                                        id="password" name="password"
                                                        className="form-control"
                                                        onChange={this.handleChange} />
                                                    {typeof error.Password !== 'undefined' ?
                                                        error.Password.map((element, index) => {
                                                            return (<div key={index} className="error text-danger font-weight-bold">{element}</div>)
                                                        })
                                                        : ''}
                                                </div>
                                                <div className="form-group d-flex align-items-center justify-content-between mt-4 mb-0">
                                                    <Button type='primary' loading={this.props.loading} onClick={this.handleSubmit}>Login</Button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        );
    }
}

const mapState = (state) => {
    return {
        loading: state.authentication,
        error: state.ErrorReducer
    };
}

const mapDispatchToProp = dispatch => {
    return {
        login: (username, password) => {
            dispatch(Action.login(username, password))
        }
    }
}

export default connect(mapState, mapDispatchToProp)(Login);