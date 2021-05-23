import { PROFILE } from "../../constant";

const initState = 1

const SelectProfileBarReducer = (state = initState, action) => {
    switch (action.type) {
        case PROFILE.SELECT_TAB:
            state = action.tab
            return state
        case PROFILE.REFRESH:
            state = 1
            return state
        default:
            return state;
    }
}

export default SelectProfileBarReducer

