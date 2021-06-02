import { Type } from "../../constant";

var initState = {}

const profileFormReducer = (state = initState, action) => {
    switch (action.type) {
        case Type.FETCH_PROFILE:
            state = action.resultObj
            console.log(state)
            state.isRefresh = action.refresh
            return state       
        case Type.REGISTER_SUCCESS:
            state = action.resultObj
            return state
        default:
            return state;
    }
}

export default profileFormReducer;