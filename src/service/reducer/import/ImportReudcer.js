import { PROFILE } from "../../constant";

const initState = false

const ImportReducer = (state = initState, action) => {
    switch (action.type) {
        case PROFILE.IMPORT_REQUEST:
            return true;
        case PROFILE.IMPORT:
            return false;
        case PROFILE.IMPORT_FALSE:
            return false
        default:
            return false;
    }
}

export default ImportReducer