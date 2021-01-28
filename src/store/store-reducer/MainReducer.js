import { combineReducers } from "redux";
import PositionFormReducer from "./PositionFormReducer";
import PositionSelectBarReducer from "./PositionSelectBarReducer";
import SoftSkillSelectBarReducer from "./SoftSkillSelectBarReducer";
import HardSkillSelectBarReducer from "./HardSkillSelectBarReducer";
import CertificationSelectBarReducer from "./CertificationSelectBarReducer";

const MainReducer = combineReducers({
    PositionFormReducer,
    PositionSelectBarReducer,
    SoftSkillSelectBarReducer, 
    HardSkillSelectBarReducer,
    CertificationSelectBarReducer
});

export default MainReducer;