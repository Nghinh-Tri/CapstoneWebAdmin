import React, { Component } from 'react';
import { connect } from 'react-redux';
import ProjectDetailTable from '../../component/project-detail/ProjectDetailTable';
import { checkSession } from '../../service/action/AuthenticateAction';
import { fetchProjectDetail } from '../../service/action/ProjectAction';
import { history } from '../../service/helper/History';
import ListEmployee from './ListEmployee';

class ProjectDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            select: 1,
            project: {}
        }
    }

    componentDidMount = () => {
        this.props.checkSession()
        var { match } = this.props
        this.props.fetchProjectDetail(match.params.id)
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.project !== prevState.project) {
            return { someState: nextProps.project };
        }
        return null;
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.project !== this.props.project) {
            if (typeof this.props.project.pageIndex === 'undefined')
                this.setState({ project: this.props.project })
        }
    }

    onClickMenu = (value) => {
        console.log(value)
        this.setState({ select: value })
    }

    onBack = () => {
        history.push('/project')
    }

    render() {
        var { project } = this.state
        return (
            <div>
                <div className='row'>
                    <div className='col-auto' style={{ marginTop: 30 }}>
                        <ul className='ul'>
                            <li className='li'>
                                <a className={this.state.select === 1 ? 'active' : ''} onClick={() => this.onClickMenu(1)}>Project Detail</a>
                            </li>
                            <li className='li' >
                                <a className={this.state.select === 2 ? 'active' : ''} onClick={() => this.onClickMenu(2)} >Employee List</a>
                            </li>
                        </ul>
                    </div>

                    <div className='col'>
                        {this.state.select === 1 ?
                            <ProjectDetailTable project={project} match={this.props.match} />
                            :
                            <ListEmployee project={project} />
                        }
                    </div>
                </div>
                <div className='row pull-right'>
                    <button type="submit" className="btn btn-primary " style={{ fontWeight: 700, marginTop: -15, marginRight: 25 }} onClick={this.onBack} >Back</button>
                </div>
            </div>
        );
    }
}
const mapStateToProp = state => {
    return {
        project: state.ProjectFetchReducer
    }
}

const mapDispatchToProp = (dispatch) => {
    return {
        fetchProjectDetail: (projectID) => {
            dispatch(fetchProjectDetail(projectID))
        },
        checkSession: () => {
            dispatch(checkSession())
        }
    }
}
export default connect(mapStateToProp, mapDispatchToProp)(ProjectDetail);