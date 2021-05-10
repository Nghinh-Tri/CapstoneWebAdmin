import { ADD_MORE_CANDIDATES, SUGGEST_CANDIDATE, Type } from "../../constant";

const initState = 0

const SuggestCandidateAgainSelect = (state = initState, action) => {
    switch (action.type) {
        case SUGGEST_CANDIDATE.SET_SELECT_POSITION:
            state = action.index
            return state

        case Type.FETCH_LIST_EMPLOYEE:
            state = 0
            return state

        case SUGGEST_CANDIDATE.CONFIRM_SUGGEST:
            state = 0
            return state

        case ADD_MORE_CANDIDATES.CANCEL_SUGGEST:
            state = 0
            return state

        default:
            return state;
    }
}

export default SuggestCandidateAgainSelect