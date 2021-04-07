import { SUGGEST_CANDIDATE } from "../constant";
import { sortSuggestListByOverallMatch } from "../util/util";

const initState = []

const getPositionIndex = (list, position) => {
    for (let index = 0; index < list.length; index++) {
        console.log('aaaa', list[index].posName, position)
        if (list[index].posName.trim() === position.trim())
            return index
    }
    return -1
}

const getCandidateIndex = (candidateList, candidate) => {
    for (let index = 0; index < candidateList.length; index++) {
        if (candidateList[index].empID === candidate.empID)
            return index
    }
    return -1
}

const SuggestCandidateSelectedList = (state = initState, action) => {
    var positionObjClone, candidateSelectClone, positionItem = null
    switch (action.type) {
        case SUGGEST_CANDIDATE.SELECT_CANDIDATE:
            if (state.length === 0) {
                positionItem = { posName: action.candidateList.posName, posId: action.candidateList.posID, candidateSelect: [action.candidate], selectAll: false }
                if (positionItem.candidateSelect.length === action.candidateList.employees.length)
                    positionItem.selectAll = true
                state.push(positionItem)
            } else {
                var index = getPositionIndex(state, action.candidateList.posName)
                if (index !== -1) {
                    positionObjClone = { ...state[index] }
                    positionObjClone.candidateSelect.push(action.candidate)
                    if (positionObjClone.candidateSelect.length === action.candidateList.employees.length)
                        positionObjClone.selectAll = true
                    state.splice(index, 1, positionObjClone)
                } else {
                    positionItem = { posName: action.candidateList.posName, posId: action.candidateList.posID, candidateSelect: [action.candidate], selectAll: false }
                    if (positionItem.candidateSelect.length === action.candidateList.employees.length)
                        positionItem.selectAll = true
                    state.push(positionItem)
                }
            }
            return [...state];

        case SUGGEST_CANDIDATE.SELECT_ALL_CANDIDATE:
            if (action.candidateList.employees.length > 0) {
                if (state.length > 0) {
                    var index = getPositionIndex(state, action.candidateList.posName)
                    console.log('index', index)

                    if (index !== -1) {
                        positionObjClone = { ...state[index] }
                        positionObjClone.candidateSelect = [...action.candidateList.employees]
                        state.splice(index, 1, positionObjClone)
                    } else {
                        positionItem = { posName: action.candidateList.posName, posId: action.candidateList.posID, candidateSelect: [...action.candidateList.employees], selectAll: true }
                        state.push(positionItem)
                    }
                } else {
                    positionItem = { posName: action.candidateList.posName, posId: action.candidateList.posID, candidateSelect: [...action.candidateList.employees], selectAll: true }
                    state.push(positionItem)
                }
            }
            return [...state]

        case SUGGEST_CANDIDATE.UNSELECT_ALL_CANDIDATE:
            var index = getPositionIndex(state, action.position)
            state.splice(index, 1)
            return [...state]

        case SUGGEST_CANDIDATE.UNSELECT_CANDIDATE:
            var positionIndex = getPositionIndex(state, action.position)
            console.log('positionIndex', positionIndex)
            positionObjClone = { ...state[positionIndex] }
            var candidateIndex = getCandidateIndex(positionObjClone.candidateSelect, action.candidate)
            candidateSelectClone = positionObjClone.candidateSelect.slice()
            candidateSelectClone.splice(candidateIndex, 1)
            positionObjClone.candidateSelect = candidateSelectClone
            positionObjClone.selectAll = false
            if (positionObjClone.candidateSelect.length === 0)
                state.splice(positionIndex, 1)
            else
                state.splice(index, 1, positionObjClone)
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