import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as Action from "../../service/action/ProjectAction";
import ProjectDetailTable from "../../component/project-detail/ProjectDetailTable";
import ConfirmSelectCandidate from '../../component/confirm-select-candidate/ConfirmSelectCandidate';
import { checkSession } from '../../service/action/AuthenticateAction';
import { NavLink } from 'react-router-dom';
import ProgressBar from '../../component/progress-bar/ProgressBar';
import { confirmSuggestList, fetchSelectedList } from '../../service/action/SuggestCandidateAction';
import { convertSuggestList } from '../../service/util/util';
import { Tabs } from "antd";

const TabPane = Tabs.TabPane;

class ConfirmPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      select: 1,
      project: {},
    };
  }

  componentDidMount = () => {
    this.props.checkSession();
    var { match } = this.props;
    this.props.fetchProjectDetail(match.params.id);
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.project !== prevState.project) {
      return { someState: nextProps.project };
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.project !== this.props.project) {
      if (typeof this.props.project.pageIndex === "undefined")
        this.setState({ project: this.props.project });
    }
  }

  onConfirm = () => {
    var item = convertSuggestList(this.props.candidateList);
    var candidates = { candidates: item, isAccept: true };
    this.props.onConfirm(
      candidates,
      this.state.project.projectID,
      this.state.project.projectName,
      this.state.project.pmID
    );
  };

  onClickMenu = (value) => {
    this.setState({ select: parseInt(value) });
  };

  showDetail = (select) => {
    if (select === 1)
      return (<ProjectDetailTable projectID={this.props.match.params.id} />);
    else if (select === 2)
      return (
        <ConfirmSelectCandidate candidateList={this.props.candidateList} />
      );
  };

  render() {
    var { project, select } = this.state;
    return (
      <div>
        <ProgressBar current="2" />
        <div className="card mb-4">
          <div class="card-header">
            <Tabs defaultActiveKey="1" onChange={this.onClickMenu}>
              <TabPane tab="Project Detail" key={1}></TabPane>
              <TabPane tab="List Employee" key={2}></TabPane>
            </Tabs>
          </div>
          <div class="card-body">{this.showDetail(select)}</div>
        </div>
        {/* <div className="row">
          <div className="col-auto" style={{ marginTop: 30 }}>
            <ul className="ul">
              <li className="li">
                <a
                  className={this.state.select === 1 ? "active" : ""}
                  onClick={() => this.onClickMenu(1)}
                >
                  Project Detail
                </a>
              </li>
              <li className="li">
                <a
                  className={this.state.select === 2 ? "active" : ""}
                  onClick={() => this.onClickMenu(2)}
                >
                  List Employees
                </a>
              </li>
            </ul>
          </div>

          <div className="col">
            {this.state.select === 1 ? (
              <ProjectDetailTable
                project={project}
                match={this.props.match}
              />
            ) : (
              <ConfirmSelectCandidate
                candidateList={this.props.candidateList}
              />
            )} */}

        <div className="row pull-right">
          <div className="col">
            <NavLink to={`/project/candidateList/${project.projectID}`}>
              <button
                type="button"
                className="btn btn-primary pull-right"
                style={{ width: 110, fontWeight: 600 }}
              >
                Back
              </button>
            </NavLink>
          </div>
          <div className="col">
            <button
              type="button"
              className="btn btn-primary pull-right"
              style={{ width: 110, fontWeight: 600 }}
              onClick={this.onConfirm}
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProp = state => {
    return {
        project: state.ProjectFetchReducer,
        candidateList: state.SuggestCandidateSelectedList
    }
}

const mapDispatchToProp = dispatch => {
    return {
        fetchProjectDetail: projectID => {
            dispatch(Action.fetchProjectDetail(projectID))
        },
        fetchSelectCandidate: () => {
            dispatch(fetchSelectedList())
        },
        checkSession: () => {
            dispatch(checkSession())
        },
        onConfirm: (item, projectID, projectName, pmID) => {
            dispatch(confirmSuggestList(item, projectID, projectName, pmID))
        }
    }
}

export default connect(mapStateToProp, mapDispatchToProp)(ConfirmPage);