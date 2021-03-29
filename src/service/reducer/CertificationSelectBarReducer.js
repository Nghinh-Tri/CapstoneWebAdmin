import { Type } from "../constant/index";

var initState = []

const certificationSelectBarReducer = (state = initState, action) => {
    switch (action.type) {
        case Type.FETCH_CERTIFICATION_LIST:
            if (state.length === 0)
                state = action.certiList.slice()
            return [...state];
        default:
            return [...state];
    }
}

export default certificationSelectBarReducer;