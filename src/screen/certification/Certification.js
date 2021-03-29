import React, { Component } from 'react';
import { connect } from 'react-redux';
import { checkSession } from '../../service/action/AuthenticateAction';
import { fetchCertificationPaging } from '../../service/action/CertificationSelectBarAction';
import { history } from '../../service/helper/History';

class Certification extends Component {

    componentDidMount = () => {
        this.props.checkSession()
        this.props.fetchCertifications(1)
    }

    onShowListCertifications = (list) => {
        var result = null
        if (list.length > 0) {
            result = list.map((item, index) => {
                return (
                    <tr key={index}>
                        <th className="text-center">{index + 1}</th>
                        <th className="">{item.certificationName}</th>
                        <th className="">{item.skillName}</th>
                        <th className="">{item.certiLevel}</th>
                        <th className="text-primary"><a className="text-primary" style={{ cursor: 'pointer' }}>Delete</a></th>
                    </tr>
                )
            })
        }
        return result
    }

    onHandle = () => {
        history.push('/certification/create')
    }

    onNext = () => {
        var { certiList } = this.props
        if (certiList.pageIndex < certiList.pageCount)
            this.props.fetchCertifications(certiList.pageIndex + 1)
    }

    onPrevios = () => {
        var { certiList } = this.props
        if (certiList.pageIndex > 1)
            this.props.fetchCertifications(certiList.pageIndex - 1)
    }

    render() {
        var { certiList } = this.props
        var result = { items: [], pageIndex: 0, pageCount: 0 }
        if (typeof certiList.items !== 'undefined' && certiList !== null)
            result = certiList
        return (
            <div className="container-fluid">
                <button type="button" className="btn btn-primary"
                    style={{ fontWeight: 700, borderRadius: 5, marginLeft: 10, }}
                    onClick={this.onHandle}
                >
                    <i className="material-icons mr-5">add_box</i>
                        Create New Skills
                </button>
                <div className="row">
                    <div className="card mb-80">
                        <div className="row">
                            <div className="card-body">
                                <table className="table">
                                    <thead className="text-primary">
                                        <tr>
                                            <th className="font-weight-bold text-center">No</th>
                                            <th className="font-weight-bold" style={{ marginLeft: 20 }}>Certification</th>
                                            <th className="font-weight-bold" style={{ marginLeft: 20 }}>Skill</th>
                                            <th className="font-weight-bold" style={{ marginLeft: 20 }}>Level</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.onShowListCertifications(result.items)}
                                    </tbody>
                                </table>
                                <div className="row align-items-center">
                                    <div className="col">
                                        <button type="button"
                                            style={{ fontWeight: 700, width: 120 }}
                                            className="btn btn-primary pull-right" onClick={this.onPrevios}>
                                            Previous
                                            </button>
                                    </div>
                                    <div className="col-auto">
                                        <div className="text-center" style={{ fontSize: 20, fontWeight: 700, color: '#9c27b0' }}>
                                            {result.pageIndex} - {result.pageCount}
                                        </div>
                                    </div>
                                    <div className="col">
                                        <button type="button"
                                            style={{ fontWeight: 700, width: 120 }}
                                            className="btn btn-primary" onClick={this.onNext}>
                                            Next
                                            </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        certiList: state.CertificationReducer
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchCertifications: (pageIndex) => {
            dispatch(fetchCertificationPaging(pageIndex))
        },
        checkSession: () => {
            dispatch(checkSession())
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Certification);