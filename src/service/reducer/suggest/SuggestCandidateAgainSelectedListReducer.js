import { store } from "react-notifications-component";
import { ADD_MORE_CANDIDATES, Type } from "../../constant";
import { history } from "../../helper/History";
import { sortSuggestListByOverallMatch } from "../../util/util";

const initState = []

const getPositionIndex = (list, position) => {
    for (let index = 0; index < list.length; index++) {
        if (list[index].position === position)
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

const checkReachLimit = (list, limit, position) => {
    var result = false
    list.forEach(element => {
        if (element.position.trim() === position.trim()) {
            if (element.candidateSelect.length === limit)
                result = true
        }
    });
    return result
}

const SuggestCandidateAgainSelectedListReducer = (state = initState, action) => {
    var positionObjClone, candidateSelectClone, positionItem = null
    switch (action.type) {
        case ADD_MORE_CANDIDATES.SELECT_CANDIDATE:
            if (state.length === 0) {
                var clone = { ...action.candidate }
                clone.check = true
                positionItem = { position: action.candidateList.position, posId: action.candidateList.posId, candidateSelect: [action.candidate], selectAll: false }
                if (positionItem.candidateSelect.length === action.candidateList.matchDetail.length)
                    positionItem.selectAll = true
                state.push(positionItem)
            } else {
                var isReachLimit = checkReachLimit(state, action.limit, action.candidateList.position)
                if (isReachLimit) {
                    store.addNotification({
                        message: `You have selected enough candidate for this position`,
                        type: "danger",
                        insert: "top",
                        container: "top-center",
                        animationIn: ["animated", "fadeIn"],
                        animationOut: ["animated", "fadeOut"],
                        dismiss: {
                            duration: 5000,
                            onScreen: false
                        }
                    })
                } else {
                    let index = getPositionIndex(state, action.candidateList.position)
                    if (index !== -1) {
                        positionObjClone = { ...state[index] }
                        let clone = { ...action.candidate }
                        clone.check = true
                        positionObjClone.candidateSelect.push(action.candidate)
                        if (positionObjClone.candidateSelect.length === action.candidateList.matchDetail.length)
                            positionObjClone.selectAll = true
                        state.splice(index, 1, positionObjClone)
                    } else {
                        positionItem = { position: action.candidateList.position, posId: action.candidateList.posId, candidateSelect: [action.candidate], selectAll: false }
                        if (positionItem.candidateSelect.lengthfCheckCandiadtes === action.candidateList.matchDetail.length)
                            positionItem.selectAll = true
                        state.push(positionItem)
                    }
                }
            }
            return [...state];

        case ADD_MORE_CANDIDATES.SELECT_ALL_CANDIDATE:
            if (action.candidateList.matchDetail.length > 0) {
                if (state.length > 0) {
                    let index = getPositionIndex(state, action.position)
                    if (index !== -1) {
                        positionObjClone = { ...state[index] }
                        positionObjClone.candidateSelect = [...action.candidateList.matchDetail]
                        state.splice(index, 1, positionObjClone)
                    } else {
                        state = []
                        positionItem = { position: action.candidateList.position, posId: action.candidateList.posId, candidateSelect: [...action.candidateList.matchDetail], selectAll: true }
                        state.push(positionItem)
                    }
                } else {
                    positionItem = { position: action.candidateList.position, posId: action.candidateList.posId, candidateSelect: [...action.candidateList.matchDetail], selectAll: true }
                    state.push(positionItem)
                }
            }
            return [...state]

        case ADD_MORE_CANDIDATES.UNSELECT_ALL_CANDIDATE:
            let index = getPositionIndex(state, action.position)
            state.splice(index, 1)
            return [...state]

        case ADD_MORE_CANDIDATES.UNSELECT_CANDIDATE:
            var positionIndex = getPositionIndex(state, action.position)
            positionObjClone = { ...state[positionIndex] }
            var candidateIndex = getCandidateIndex(positionObjClone.candidateSelect, action.candidate)
            candidateSelectClone = positionObjClone.candidateSelect.slice()
            candidateSelectClone.splice(candidateIndex, 1)
            positionObjClone.candidateSelect = candidateSelectClone
            positionObjClone.selectAll = false
            if (positionObjClone.candidateSelect.length === 0)
                state.splice(positionIndex, 1)
            else
                state.splice(positionIndex, 1, positionObjClone)
            return [...state]

        case ADD_MORE_CANDIDATES.FETCH_SELECTED_LIST:
            if (state.length > 0) {
                state.forEach(element => {
                    var clone = [...element.candidateSelect]
                    sortSuggestListByOverallMatch(clone)
                    element.candidateSelect = clone
                });
            }
            return [...state]

        // case SUGGEST_CANDIDATE.CONFIRM_SUGGEST:
        //     state.splice(0, state.length)
        //     return [...state]

        case ADD_MORE_CANDIDATES.CANCEL_SUGGEST:
            state.splice(0, state.length)
            localStorage.removeItem('projectId')
            localStorage.removeItem('projectType')
            localStorage.removeItem('projectField')
            localStorage.removeItem('projectName')
            localStorage.removeItem('positionRequire')
            localStorage.removeItem('pmID')
            history.push(`/project/detail/${action.projectID}`)
            return [...state]

        case Type.FETCH_LIST_EMPLOYEE:
            state = []
            return [...state]
        default:
            return [...state];
    }
}

export default SuggestCandidateAgainSelectedListReducer