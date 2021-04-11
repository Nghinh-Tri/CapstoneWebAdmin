import { Type } from "../constant/index";

var initState = []

const ProjectFieldTypeReducer = (state = initState, action) => {
    switch (action.type) {
        case Type.FETCH_PROJECT_TYPE:
            if (state.length === 0)
                state = action.projectType.slice()
            return [...state];
        case Type.FETCH_PROJECT_FIELD:
            if (state.length === 0)
                state = action.projectField.slice()
            return [...state];
        default:
            return [...state];
    }
}

export default ProjectFieldTypeReducer;