import { POSITION } from "../constant"

const initState = {}

const PositionReducer = (state = initState, action) => {
    switch (action.type) {
        case POSITION.FETCH_POSITION_LIST_PAGING:
            state = action.positionList
            return state
        default:
            return state
    }
}

export default PositionReducer