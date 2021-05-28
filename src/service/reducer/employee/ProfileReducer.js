import { Type } from "../../constant";

var initState = {}

const ProfileReducer = (state = initState, action) => {
    switch (action.type) {
        case Type.FETCH_PROFILE_DETAIL:
            state = action.resultObj
            return state
        default:
            return state;
    }
}

export default ProfileReducer;