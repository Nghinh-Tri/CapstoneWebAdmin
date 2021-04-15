import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as Action from '../../service/action/ListEmployeeAction'
import SelectBar from "../../component/select-search/SelectBar";
import ListEmployeeContent from './ListEmployeeContent';
import { addMoreCandidate } from '../../service/action/PositionAction';
import { history } from '../../service/helper/History';


class ListEmployee extends Component {

    constructor(props) {
        super(props);
        this.state = {
            page: 1,
            positionList: [],
            positionSelect: 0,
            count: 0
        }
    }

    componentDidMount = () => {
        this.props.fetchListEmployee(this.props.projectID, 1)
    }

    componentWillReceiveProps = () => {
        var { listEmployee } = this.props
        var { positionSelect, count } = this.state
        var temp = []
        listEmployee.forEach(element => {
            var position = { label: element.posName, value: element.posID }
            if (count === 0) {
                count++
                positionSelect = element.posID
            }
            temp.push(position)
        });
        this.setState({ positionList: temp, positionSelect: positionSelect, count: count })
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
            return (<div className='row justify-content-center'>
                <h4 style={{ fontStyle: 'italic', color: 'gray' }} >No data</h4>
            </div>)
        }
        return result
    }

    onSelectPos = (value) => {
        this.setState({ positionSelect: value })
    }

    onHandle = () => {
        history.push(`/project/confirm-candidate/${this.props.projectID}`)
    }

    render() {
        var { listEmployee } = this.props
        var postList = []
        if (this.state.positionList.length >= 1)
            postList = this.state.positionList
        return (
            <div class="card mb-4">
                <div class="card-header">
                    <i class="fas fa-table mr-1"></i>
                List Employee
            </div>
                <form class="d-none d-md-inline-block form-inline ml-auto mr-0 mr-md-3 my-2 my-md-0" >
                    <div className='col-auto' style={{ marginTop: 20 }}>
                        <SelectBar type='special'
                            name='positionSelect'
                            list={postList}
                            value={this.state.positionSelect}
                            onSelectPos={this.onSelectPos} />
                    </div>

                </form>
                <div class="card-body">
                    <div class="table-responsive">
                        <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                            <thead>
                                <th className="font-weight-bold">Name</th>
                                <th className="font-weight-bold">Position</th>
                                <th className="font-weight-bold">Email</th>
                                <th className="font-weight-bold">Phone</th>
                                <th width={120} className="font-weight-bold text-center">Date In</th>
                            </thead>
                            {listEmployee.length > 0 ?
                                <tbody>
                                    {this.showEmployee(listEmployee)}
                                </tbody>
                                : ''}
                        </table>
                    </div>
                    {listEmployee.length > 0 ? '' : <div className='row justify-content-center' style={{ width: 'auto' }} >
                        <h4 style={{ fontStyle: 'italic', color: 'gray' }} >No data</h4>
                    </div>}
                    {listEmployee.length > 0 ?
                        typeof listEmployee.find(i => i.employees.find(k => k.dateIn === null)) !== 'undefined' ?
                            <button type="submit" className="btn btn-primary pull-right" onClick={this.onHandle} style={{ fontWeight: 700 }} >
                                Confirm Candidates
                        </button>
                            : ''
                        : ''
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
        },
        pushToCreatePosition: () => {
            dispatch(addMoreCandidate())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProp)(ListEmployee);