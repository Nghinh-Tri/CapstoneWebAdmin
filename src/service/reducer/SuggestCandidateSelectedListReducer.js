import { SUGGEST_CANDIDATE } from "../constant";
import { sortSuggestListByOverallMatch } from "../util/util";

const initState = []

const getPositionIndex = (listCandidate, posID) => {
    var result = -1
    for (let i = 0; i < listCandidate.length; i++) {
        if (listCandidate[i].posID === posID) {
            result = i
        }
    }
    return result
}

const getCandidateIndex = (listCandidate, empID) => {
    var result = -1
    for (let i = 0; i < listCandidate.length; i++) {
        if (listCandidate[i].empID === empID)
            result = i
    }
    return result
}

const SuggestCandidateSelectedList = (state = initState, action) => {
    var positionIndex, positionClone, employeesClone, employeeIndex, empClone = null
    switch (action.type) {

        case SUGGEST_CANDIDATE.FETCH_SUGGEST_LIST:
            state = action.list
            console.log('state', state)
            return [...state]

        case SUGGEST_CANDIDATE.SELECT_CANDIDATE:
            positionIndex = getPositionIndex(state, action.posID)
            positionClone = { ...state[positionIndex] }
            employeesClone = [...positionClone.employees]
            employeeIndex = getCandidateIndex(employeesClone, action.candidate.empID)
            empClone = { ...employeesClone[employeeIndex] }
            empClone.check = action.check
            employeesClone.splice(employeeIndex, 1, empClone)
            positionClone.employees = employeesClone
            state.splice(positionIndex, 1, positionClone)
            return [...state];

        case SUGGEST_CANDIDATE.NOTE_REJECTING_REASON:
            positionIndex = getPositionIndex(state, action.posID)
            positionClone = { ...state[positionIndex] }
            employeesClone = [...positionClone.employees]
            employeeIndex = getCandidateIndex(employeesClone, action.candidate.empID)
            empClone = { ...employeesClone[employeeIndex] }
            if (typeof empClone.check === 'undefined' || !empClone.check)
                empClone.note = action.value
            employeesClone.splice(employeeIndex, 1, empClone)
            positionClone.employees = employeesClone
            state.splice(positionIndex, 1, positionClone)
            return [...state];

        case SUGGEST_CANDIDATE.SELECT_ALL_CANDIDATE:
            // if (action.candidateList.employees.length > 0) {
            //     if (state.length > 0) {
            //         var index = getPositionIndex(state, action.candidateList.posName)
            //         console.log('index', index)

            //         if (index !== -1) {
            //             positionObjClone = { ...state[index] }
            //             positionObjClone.candidateSelect = [...action.candidateList.employees]
            //             state.splice(index, 1, positionObjClone)
            //         } else {
            //             positionItem = { posName: action.candidateList.posName, posId: action.candidateList.posID, candidateSelect: [...action.candidateList.employees], selectAll: true }
            //             state.push(positionItem)
            //         }
            //     } else {
            //         positionItem = { posName: action.candidateList.posName, posId: action.candidateList.posID, candidateSelect: [...action.candidateList.employees], selectAll: true }
            //         state.push(positionItem)
            //     }
            // }
            return [...state]

        case SUGGEST_CANDIDATE.UNSELECT_ALL_CANDIDATE:
            // var index = getPositionIndex(state, action.position)
            // state.splice(index, 1)
            return [...state]

        case SUGGEST_CANDIDATE.FETCH_SELECTED_LIST:
            if (state.length > 0) {
                state.forEach(element => {
                    var clone = [...element.candidateSelect]
                    sortSuggestListByOverallMatch(clone)
                    element.candidateSelect = clone
                });
            }
            return [...state]

        case SUGGEST_CANDIDATE.CONFIRM_SUGGEST:
            state.splice(0, state.length)
            return [...state]
        default:

            return [...state];
    }
}

export default SuggestCandidateSelectedList