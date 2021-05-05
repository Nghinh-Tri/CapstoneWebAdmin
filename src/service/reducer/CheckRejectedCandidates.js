import { SUGGEST_CANDIDATE, Type } from "../constant/index";

const initState = { message: '', list: [] }

const CheckRejectedCandidates = (state = initState, action) => {
    switch (action.type) {
        case SUGGEST_CANDIDATE.REJECTED_CANDIDATE:
            state.message = action.message
            state.list = [...action.list]
        default:
            return state

    }
}

export default CheckRejectedCandidates;