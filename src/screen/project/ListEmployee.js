import React, { Component } from 'react';
import { connect } from 'react-redux';
import ListEmployeeContent from "./ListEmployeeContent";
import * as Action from "../../service/action/ListEmployeeAction";
import { history } from '../../service/helper/History';
import SelectBar from "../../component/create-position-form/select-search/SelectBar";

class ListEmployee extends Component {

    constructor(props) {
        super(props);
        this.state = {
            page: 1,
            positionList: [
                { label: 'All', value: 0 }
            ],
            positionSelect: 0
        }
    }

    componentDidMount = () => {
        this.props.fetchListEmployee(this.props.project.projectID, this.state.page)
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.listEmployee !== prevState.listEmployee) {
            return { someState: nextProps.listEmployee };
        }
        return null;
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.listEmployee !== this.props.listEmployee) {
            var { listEmployee } = this.props
            listEmployee.forEach(element => {
                var position = { label: element.posName, value: element.posID }
                this.setState(prev => ({
                    positionList: [...prev.positionList, position]
                }))
            });
        }
    }

    showEmployee = (list) => {
        var result = null
        if (list.length > 0) {
            result = list.map((item, index) => {
                if (this.state.positionSelect === 0) {
                    return (<ListEmployeeContent key={index} item={item} />)
                } else if (this.state.positionSelect === item.posID) {
                    return (<ListEmployeeContent key={index} item={item} />)
                }
            })
        } else {
            return (<h4 className="text-center" style={{ fontStyle: 'italic', color: 'gray' }} >No data</h4>)
        }
        return result
    }

    onHandle = () => {
        localStorage.setItem('projectId', this.props.project.projectID)
        history.push("/project/create-position", { isUpdate: true })
        localStorage.setItem('projectType', this.props.project.typeID)
        this.props.pushToCreatePosition()
    }

    onSelectPos = (value) => {
        this.setState({ positionSelect: value })
    }

    render() {
        var { listEmployee } = this.props
        var postList = []
        if (this.state.positionList.length > 1)
            postList = this.state.positionList
        return (
            <div className="card">
                <div className="card-header card-header-primary">
                    <h4 className="card-title">Employee List</h4>
                </div>
                <div className="card-body">
                    {listEmployee.length > 0 ?
                        <React.Fragment>
                            <div className='row' style={{ marginLeft: 10 }} >
                                <div className='col-auto'>
                                    <h4 className="font-weight-bold" style={{ marginTop: 5 }}>Position</h4>
                                </div>
                                <div className='col'>
                                    <SelectBar type='special'
                                        name='positionSelect'
                                        list={postList}
                                        value={this.state.positionSelect}
                                        onSelectPos={this.onSelectPos} />
                                </div>
                            </div>
                            {this.showEmployee(listEmployee)}
                        </React.Fragment>
                        : <h4 className="text-center" style={{ fontStyle: 'italic', color: 'gray' }} >No data</h4>
                    }
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        listEmployee: state.ListEmployeeReducer
    }
}

const mapDispatchToProp = dispatch => {
    return {
        fetchListEmployee: (projectID, page) => {
            dispatch(Action.fetchListEmployee(projectID, page))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProp)(ListEmployee);