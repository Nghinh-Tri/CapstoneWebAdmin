import React, { Component } from 'react';
import ProjectBrief from '../../components/project-brief/ProjectBrief';

class Project extends Component {
    constructor(props) {
        super(props);
        this.state = {
            project1: {
                name: 'Project Name',
                description: 'Project Description',
                staff: [
                    {
                        id: '1',
                        name: 'ABC',
                        position: 'BA',
                        dateIn: '01-12-2021',
                        dateOut: '-',
                    },
                    {
                        id: '2',
                        name: 'ABCD',
                        position: 'DEV',
                        dateIn: '01-12-2021',
                        dateOut: '-',
                    },
                    {
                        id: '3',
                        name: 'ABCDE',
                        position: 'TESTER',
                        dateIn: '01-12-2021',
                        dateOut: '-',
                    }
                ],
                status: 'Finish' //Pending, On-going, Finish 
            },
            project2: {
                name: 'Project Name',
                description: 'Project Description',
                staff: [
                    {
                        id: '1',
                        name: 'ABC',
                        position: 'BA',
                        dateIn: '01-12-2021',
                        dateOut: '-',
                    },
                    {
                        id: '2',
                        name: 'ABCD',
                        position: 'DEV',
                        dateIn: '01-12-2021',
                        dateOut: '-',
                    },
                    {
                        id: '3',
                        name: 'ABCDE',
                        position: 'TESTER',
                        dateIn: '01-12-2021',
                        dateOut: '-',
                    }
                ],
                status: 'Pending' //Pending, On-going, Finish 
            },
            project3: {
                name: 'Project Name',
                description: 'Project Description',
                staff: [
                    {
                        id: '1',
                        name: 'ABC',
                        position: 'BA',
                        dateIn: '01-12-2021',
                        dateOut: '-',
                    },
                    {
                        id: '2',
                        name: 'ABCD',
                        position: 'DEV',
                        dateIn: '01-12-2021',
                        dateOut: '-',
                    },
                    {
                        id: '3',
                        name: 'ABCDE',
                        position: 'TESTER',
                        dateIn: '01-12-2021',
                        dateOut: '-',
                    }
                ],
                status: 'On-going' //Pending, On-going, Finish 
            }
        }
    }
    render() {
        return (
            <div className="container-fluid">
                <button type="button" className="btn btn-primary btn-lg">
                    <i className="material-icons mr-5">add_box</i>
                    Create Project
                </button>
                <div className="row">
                    <ProjectBrief/>
                    <ProjectBrief/>
                </div>
            </div>

        );
    }
}

export default Project;