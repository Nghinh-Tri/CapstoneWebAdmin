import React, { Component } from 'react';

class PositionTable extends Component {

    componentDidMount = () => {

    }

    render() {
        return (
            <div className="card">
                <div className="card-header card-header-primary">
                    <h4 className="card-title">Position Detail</h4>
                </div>
                <div className="card-body">

                    {/* Name */}
                    <div className="row">
                        <div className="col-auto">
                            <label className="bmd-label">
                                <h4 style={{ fontWeight: 700 }}>Position : </h4>
                            </label>
                        </div>
                        <div className="col" style={{ marginLeft: -20 }}>
                            <label className="bmd-label">
                                <h4>Back-end</h4>
                            </label>
                        </div>
                        <div className='col-auto' style={{ marginLeft: 85, fontWeight: 600 }}>

                            <h4>Level :</h4>
                        </div>
                        <div className="col" style={{ marginLeft: -20 }} >
                            <label className="bmd-label">
                                <h4 style={{ fontWeight: 500 }}>Fresher</h4>
                            </label>
                        </div>
                    </div>

                    {/* Language */}
                    <div className="row">
                        <div className="col-auto">
                            <label className="bmd-label">
                                <h4 style={{ fontWeight: 700 }}>Languages : </h4>
                            </label>
                        </div>
                    </div>
                    {/* List Language */}
                    <ul>
                        <li style={{ fontSize: 18, marginLeft: 30, marginBottom: 20 }}>
                            <div className='row'>
                                <div className='col' style={{ fontWeight: 600 }}>English</div>
                                <div className='col-auto' style={{ marginLeft: 100, fontWeight: 600, }}>Level : </div>
                                <div className='col' style={{ fontWeight: 400, marginLeft: -20 }}>1</div>
                            </div>
                        </li>
                    </ul>

                    {/* Soft Skill */}
                    <div className="row">
                        <div className="col-auto">
                            <label className="bmd-label">
                                <h4 style={{ fontWeight: 700 }}>Soft Skills : </h4>
                            </label>
                        </div>
                        <div className="col" style={{ marginLeft: 100, marginTop: -15, width: 250 }}>
                            {/* <Input className="form-group" value={profile.name} disabled="true" style={{ color: "black", cursor: 'default', fontWeight: 700, fontSize: 18, border: 'none', backgroundColor: 'white' }} /> */}
                        </div>
                    </div>
                    {/* List Sost skills */}
                    <ul>
                        <li style={{ fontSize: 18, marginLeft: 30, marginBottom: 20 }}>
                            <div className='row'>
                                <div className='col' style={{ fontWeight: 600 }}>English</div>
                            </div>
                        </li>
                    </ul>

                    {/* Hard Skill */}
                    <div className="row">
                        <div className="col-auto">
                            <label className="bmd-label">
                                <h4 className="" style={{ fontWeight: 700 }}>Hard Skills : </h4>
                            </label>
                        </div>
                        <div className="col" style={{ marginLeft: 100, marginTop: -15, width: 250 }}>
                            {/* <Input className="form-group" value={profile.name} disabled="true" style={{ color: "black", cursor: 'default', fontWeight: 700, fontSize: 18, border: 'none', backgroundColor: 'white' }} /> */}
                        </div>
                    </div>
                    {/* List Hard Skills */}
                    <ul>
                        <li style={{ fontSize: 18, marginLeft: 30, marginBottom: 20 }}>
                            <div className='row' >
                                <div className='col' style={{ fontWeight: 600 }}>Java</div>
                                <div className='col-auto' style={{ marginLeft: 100, fontWeight: 600 }}>Level : </div>
                                <div className='col' style={{ fontWeight: 400, marginLeft: -20 }}>Basic Knowledge</div>
                            </div>
                            {/* List Certi */}
                            <div className='row' style={{boxShadow: '0 5px 5px 0 rgb(0 0 0 / 20%)'}}>
                                <div className='col' style={{ fontSize: 16, marginLeft: 30, marginBottom: 20, marginTop: 20 }}>
                                    <ul>
                                        <li >
                                            <div className='row'>
                                                <div className='col-3' style={{ fontWeight: 400 }} >MicroMasters® Program in Artificial Intelligence by Columbia University</div>
                                                <div className='col-auto' style={{ marginLeft: 30, fontWeight: 400 }}>Level : </div>
                                                <div className='col-auto' style={{ marginLeft: -20, fontWeight: 350 }}>1</div>
                                                <div className='col-auto' style={{ marginLeft: 30, fontWeight: 400 }}>Taken Date : </div>
                                                <div className='col-auto' style={{ marginLeft: -20, fontWeight: 350 }}>20-03-2015</div>
                                                <div className='col-auto' style={{ marginLeft: 30, fontWeight: 400 }}>Expired Date : </div>
                                                <div className='col' style={{ fontWeight: 350 }}>-</div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
}

export default PositionTable;