import { combineReducers } from "redux";
import authentication from "./AuthenticateReducer";
import ProjectFetchReducer from "./ProjectFetchReducer";
import ProjectFormReducer from "./ProjectFormReducer";
// import PositionFormReducer from "./PositionFormReducer";
import CertificationSelectBarReducer from "./CertificationSelectBarReducer";
import HardSkillSelectBarReducer from "./HardSkillSelectBarReducer";
import SoftSkillSelectBarReducer from "./SoftSkillSelectBarReducer";
import PositionSelectBarReducer from "./PositionSelectBarReducer";
import LanguageSelectBarReducer from "./LanguageSelectBarReducer";
import SuggestCandidateList from "./SuggestCandidateList";
import SuggestCandidateSelect from "./SuggestCandidateSelect";
import SuggestCandidateSelectedList from "./SuggestCandidateSelectedListReducer";
import SkillReducer from "./SkillReducer";
import CertificationReducer from "./CertificationReducer";
import ProfileFetchReducer from "./ProfileFetchReducer";
import PositionAssignReducer from "./PositionAssignReducer";
import ListEmployeeReducer from "./ListEmployeeReducer";

const MainReducer = combineReducers({
    authentication,
    ProjectFetchReducer,
    ProjectFormReducer,
    CertificationSelectBarReducer,
    HardSkillSelectBarReducer,
    SoftSkillSelectBarReducer,
    PositionSelectBarReducer,
    LanguageSelectBarReducer,
    SuggestCandidateList,
    SuggestCandidateSelect,
    SuggestCandidateSelectedList,
    SkillReducer,
    CertificationReducer,
    ProfileFetchReducer,
    PositionAssignReducer,
    ListEmployeeReducer
})

export default MainReducer