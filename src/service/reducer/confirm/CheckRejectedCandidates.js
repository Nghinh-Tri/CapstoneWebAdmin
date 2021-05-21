import { ADD_MORE_CANDIDATES, SUGGEST_CANDIDATE } from "../../constant/index";

const initState = { message: '', list: [] }

const CheckRejectedCandidates = (state = initState, action) => {
    switch (action.type) {
        case SUGGEST_CANDIDATE.REJECTED_CANDIDATE:
            state.message = action.message
            state.list = [...action.list]
            return state

        case ADD_MORE_CANDIDATES.FETCH_SUGGEST_LIST:
            state.message = ''
            state.list = []
            return state
        default:
            state.message = ''
            state.list = []
            return state
    }
}

export default CheckRejectedCandidates;