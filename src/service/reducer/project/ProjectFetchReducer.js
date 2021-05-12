import { Type } from "../../constant";

var initState = {}

const projectFormReducer = (state = initState, action) => {
    switch (action.type) {
        case Type.FETCH_PROJECT:
            state = action.resultObj
            state.isRefresh = action.refresh
            return state

        default:
            return state;
    }
}

export default projectFormReducer;