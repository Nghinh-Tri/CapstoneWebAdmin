import React, { Component } from 'react';

class SuitableProjectDetail extends Component {

    addEmployee = (posID, projectID, requireID) => {
        console.log(posID, projectID, requireID)
    }

    showContent = (items, projectInfo) => {
        var result = null
        result = items.map((item, index) => {
            return (
                <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.position}</td>
                    <td className='text-center' >{item.languageMatch.toFixed(2)} / 10</td>
                    <td className='text-center' >{item.softSkillMatch.toFixed(2)} / 10</td>
                    <td className='text-center' >{item.hardSkillMatch.toFixed(2)} / 10</td>
                    <td className='text-center' >{item.overallMatch.toFixed(2)} / 10</td>
                    <td className='text-center text-primary'>
                        <a onClick={() => this.addEmployee(item.posId, projectInfo.projectID, projectInfo.requiredPositions[index].requiredPosID)}>Add</a>
                    </td>
                </tr>
            )
        })
        return result
    }

    render() {
        var { item } = this.props
        return (
            <React.Fragment>
                {item.matchInEachPos.length > 0 ?
                    <div class="table-responsive">
                        <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                            <thead>
                                <tr>
                                    <th className="font-weight-bold text-center" width={40}>No</th>
                                    <th className="font-weight-bold" width={200}>Position</th>
                                    <th className="font-weight-bold text-center" width={140}>Match Language</th>
                                    <th className="font-weight-bold text-center" width={140}>Match Soft Skill</th>
                                    <th className="font-weight-bold text-center" width={140}>Match Hard Skill</th>
                                    <th className="font-weight-bold text-center" width={140}>Overall Match</th>
                                    <th className="font-weight-bold text-center" width={50}>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.showContent(item.matchInEachPos, item.projectInfo)}
                            </tbody>
                        </table>
                    </div>
                    : ''}
            </React.Fragment>
        );
    }
}

export default SuitableProjectDetail;