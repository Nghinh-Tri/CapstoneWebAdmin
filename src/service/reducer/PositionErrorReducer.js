import { ERROR, POSITION, Type } from "../constant/index";

var initState = {}

const PositionErrorReducer = (state = initState, action) => {
    switch (action.type) {
        case POSITION.CREATE_FAIL:
            state = action.error
            return { ...state }
        case POSITION.CREATE_SUCCESS:
            state = {}
            return state
        default:
            return state;
    }
}

export default PositionErrorReducer;