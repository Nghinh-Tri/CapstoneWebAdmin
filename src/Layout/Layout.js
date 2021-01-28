import React, { Component } from 'react';
import NavBar from '../components/nav-bar/NavBar';
import Navigation from '../components/navigation/Navigation';
import CreatePosition from '../screens/create-position/CreatePosition';
import CreateProject from '../screens/create-project/CreateProject';
import Dashboard from '../screens/dashboard/Dashboard';
import ProjectDetail from '../screens/project-detail/ProjectDetail';
import Project from '../screens/project/Project';
import SuggestCandidate from '../screens/suggest-candidate/SuggestCandidate';

class Layout extends Component {

    render() {
        return (
            <div className="wrapper ">
                <Navigation />
                <div className="main-panel">
                    <NavBar />
                    <div className="content">
                        {/* <Dashboard /> */}
                        {/* <Project /> */}
                        {/* <CreateProject/> */}
                        <CreatePosition/>
                        {/* <SuggestCandidate /> */}
                        {/* <ProjectDetail/> */}
                    </div>
                </div>
            </div>
        );
    }
}

export default Layout;