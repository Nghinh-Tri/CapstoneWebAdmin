import { SUGGEST_CANDIDATE } from "../constant/index";
const initState = []

const SuggestCandidateList = (state = initState, action) => {
    switch (action.type) {
        case SUGGEST_CANDIDATE.FETCH_SUGGEST_LIST:
            state = action.list
            return [...state]
        default:
            return [...state]
    }
}

export default SuggestCandidateList