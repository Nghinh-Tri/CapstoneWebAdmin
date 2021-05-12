import { CERTIFICATION } from "../../constant/index";

var initState = {}

const certificationSelectBarReducer = (state = initState, action) => {
    switch (action.type) {
        case CERTIFICATION.FETCH_CERTIFICATION_PAGING:
            state = action.certiList
            state.isRefresh = action.refresh
            return state;        
        case CERTIFICATION.FETCH_CERTIFICATION_DETAIL:
            state = action.certi
            return state
        default:
            return state;
    }
}

export default certificationSelectBarReducer;