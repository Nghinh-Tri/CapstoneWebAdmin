import { SUGGEST_CANDIDATE, Type } from "../constant/index";
const initState = []

const SuggestCandidateList = (state = initState, action) => {
    switch (action.type) {
        case SUGGEST_CANDIDATE.FETCH_SUGGEST_LIST:
            if (Array.isArray(action.list))
                state = action.list
            return [...state]

        case Type.FETCH_LIST_EMPLOYEE:
            state = []
            return [...state]
        default:
            return [...state]
    }
}

export default SuggestCandidateList