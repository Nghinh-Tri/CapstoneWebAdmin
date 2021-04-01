import { SUGGEST_CANDIDATE } from "../constant";

const initState = []

const getPositionIndex = (list, position) => {
    for (let index = 0; index < list.length; index++) {
        if (list[index].posName === position)
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
                positionItem = { posName: action.position, posID: action.posId, candidateSelect: [action.candidate] }
                state.push(positionItem)
            } else {
                var index = getPositionIndex(state, action.position)
                if (index !== -1) {
                    positionObjClone = { ...state[index] }
                    positionObjClone.candidateSelect.push(action.candidate)
                    state.splice(index, 1, positionObjClone)
                } else {
                    positionItem = { posName: action.position, posID: action.posId, candidateSelect: [action.candidate] }
                    state.push(positionItem)
                }
            }
            return [...state];

        case SUGGEST_CANDIDATE.UNSELECT_CANDIDATE:
            var positionIndex = getPositionIndex(state, action.position)
            positionObjClone = { ...state[positionIndex] }
            var candidateIndex = getCandidateIndex(positionObjClone.candidateSelect, action.candidate)
            candidateSelectClone = positionObjClone.candidateSelect.slice()
            candidateSelectClone.splice(candidateIndex, 1)
            positionObjClone.candidateSelect = candidateSelectClone
            state.splice(index, 1, positionObjClone)
            return [...state]

        case SUGGEST_CANDIDATE.FETCH_SELECTED_LIST:
            return [...state]
        case SUGGEST_CANDIDATE.CONFIRM_SUGGEST:
            state.splice(0, state.length)
            return [...state]
        default:
            return [...state];
    }
}

export default SuggestCandidateSelectedList