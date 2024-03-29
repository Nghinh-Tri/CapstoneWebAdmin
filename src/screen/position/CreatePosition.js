import TextArea from 'antd/lib/input/TextArea';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { checkSession } from '../../service/action/user/AuthenticateAction';
import { createPosition, fetchPostionDetail, refreshPage, updatePosition } from '../../service/action/position/PositionSelectBarAction';
import { Modal } from 'antd';
import { history } from '../../service/helper/History';

class CreatePosition extends Component {

    constructor(props) {
        super(props);
        this.state = {
            posID: '',
            position: '',
            description: '',
            status: true,
        }
    }

    componentDidMount = () => {
        this.props.checkSession()
        var { match } = this.props
        if (typeof match !== 'undefined') {
            this.props.fetchPositionDetail(match.params.id)
        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.position !== prevState.position) {
            return { someState: nextProps.position };
        }
        return null;
    }

    componentDidUpdate(prevProps) {
        if (prevProps.position !== this.props.position) {
            var { position } = this.props
            this.setState({
                posID: position.posID,
                position: position.name,
                description: position.description,
                status: position.status
            })
        } else if (prevProps.status !== this.props.status) {
            if (this.props.status)
                Modal.success({
                    title: typeof this.props.match === 'undefined' ? 'Create Position Successfully' : 'Update Position Successfully',
                    onOk() { history.push('/position') }
                })
            else
                Modal.error({
                    title: typeof this.props.match === 'undefined' ? 'Create Position Failed' : 'Update Position Failed'
                })
        }
    }

    componentWillUnmount = () => {
        this.props.refreshPage()
    }

    handleChange = (e) => {
        var { name, value } = e.target;
        this.setState({ [name]: value })
    }

    onSubmit = (e) => {
        e.preventDefault()
        if (typeof this.props.match === 'undefined')
            this.props.onCreatePosition({ name: this.state.position.trim(), description: this.state.description.trim() })
        else
            this.props.updatePosition(this.state.posID, { name: this.state.position.trim(), description: this.state.description.trim() })
    }

    render() {
        var { position, description, } = this.state
        var { error } = this.props
        return (
            <div className="card" style={{ marginTop: "50px", }}>
                <div className="card-header card-header-primary">
                    <h4 className="card-title">
                        {typeof this.props.match !== "undefined" ? "Update Position" : "Create Position"}
                    </h4>
                </div>

                <div className="card-body">
                    <form onSubmit={this.handleSubmit}>
                        <div className="row">
                            <div className="col">
                                <fieldset className="form-group">
                                    <label className="bmd-label-floating">
                                        Position <span style={{ color: 'red', fontWeight: 500 }} >*</span>
                                    </label>
                                    <input type="text" id="position" name="position" className="form-control" value={position} onChange={this.handleChange} />
                                    {typeof error.Name !== "undefined"
                                        ? error.Name.map((element, index) => {
                                            return (
                                                <div key={index} className="error text-danger font-weight-bold">
                                                    {element}
                                                </div>
                                            );
                                        })
                                        : ""}
                                </fieldset>
                            </div>
                        </div>
                        <div className="row" style={{ marginTop: 10 }}>
                            <div className="col">
                                <fieldset className="form-group">
                                    <label className="bmd-label-floating">
                                        Description <span style={{ color: 'red', fontWeight: 500 }} >*</span>
                                    </label>
                                    <TextArea
                                        type="textarea"
                                        id="description"
                                        name="description"
                                        className="form-control"
                                        value={description}
                                        autoSize={{ minRows: 5, maxRows: 20 }}
                                        onChange={this.handleChange}
                                    />
                                    {typeof error.Description !== "undefined"
                                        ? error.Description.map((element, index) => {
                                            return (
                                                <div key={index} className="error text-danger font-weight-bold">
                                                    {element}
                                                </div>
                                            );
                                        })
                                        : ""}
                                </fieldset>
                            </div>
                        </div>
                        <button className="btn btn-primary pull-right" onClick={this.onSubmit}>
                            {typeof this.props.match !== "undefined" ? "Update" : "Create"}
                        </button>
                    </form>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        error: state.ErrorReducer,
        position: state.PositionFormReducer,
        status: state.StatusReducer
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        checkSession: () => {
            dispatch(checkSession())
        },
        onCreatePosition: (position) => {
            dispatch(createPosition(position))
        },
        fetchPositionDetail: posID => {
            dispatch(fetchPostionDetail(posID))
        },
        updatePosition: (posID, position) => {
            dispatch(updatePosition(posID, position))
        },
        refreshPage: () => {
            dispatch(refreshPage())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreatePosition);