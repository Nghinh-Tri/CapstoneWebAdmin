import './App.css';
import React, { Component } from 'react';
import Layout from './Layout/Layout';
// import SignIn from './screens//sign-in/SignIn';

class App extends Component {
    render() {
        return (
            <div>
                <Layout />
                {/* <SignIn/> */}
            </div>
        );
    }
}

export default App;