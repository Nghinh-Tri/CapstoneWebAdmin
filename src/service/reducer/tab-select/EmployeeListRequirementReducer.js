import { PROJECT_REQUIREMENT } from "../../constant";

const initState = 0

const EmployeeListRequirementReducer = (state = initState, action) => {
    switch (action.type) {
        case PROJECT_REQUIREMENT.SELECT_POSITION:
            state = action.index
            return state
        default:
            return state;
    }
}

export default EmployeeListRequirementReducer