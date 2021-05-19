import { combineReducers } from "redux";
import authentication from "./employee/AuthenticateReducer";
import ProjectFetchReducer from "./project/ProjectFetchReducer";
import CertificationSelectBarReducer from "./certificate/CertificationSelectBarReducer";
import HardSkillSelectBarReducer from "./skill/HardSkillSelectBarReducer";
import SoftSkillSelectBarReducer from "./skill/SoftSkillSelectBarReducer";
import PositionSelectBarReducer from "./position/PositionSelectBarReducer";
import LanguageSelectBarReducer from "./language/LanguageSelectBarReducer";
import SuggestCandidateList from "./confirm/SuggestCandidateList";
import SuggestCandidateSelect from "./confirm/SuggestCandidateSelect";
import SuggestCandidateSelectedList from "./confirm/SuggestCandidateSelectedListReducer";
import SkillReducer from "./skill/SkillReducer";
import CertificationReducer from "./certificate/CertificationReducer";
import ProfileFetchReducer from "./employee/ProfileFetchReducer";
import PositionAssignReducer from "./position/PositionAssignReducer";
import ListEmployeeReducer from "./employee/ListEmployeeReducer";
import PositionReducer from "./position/PositionReducer";
import PositionFormReducer from "./position/PositionFormReducer";
import DataStatisticsReducer from "./statistic/DataStatisticsReducer";
import PositionRequireReducer from "./position/PositionRequireReducer";
import ProjectTypeReducer from "./project/ProjectTypeReducer";
import ProjectFieldReducer from "./project/ProjectFieldReducer";
import PreviosRequrieReducer from "./project/PreviosRequrieReducer";
import SuggestCandidateAgainSelectedListReducer from "./suggest/SuggestCandidateAgainSelectedListReducer";
import ProjectDetailFetchReducer from "./project/ProjectDetailFetchReducer";
import SuggestCandidateAgainSelect from "./suggest/SuggestCandidateAgainSelect";
import SuggestCandidateAgainList from "./suggest/SuggestCandidateAgainList ";
import SuitableProjectReducer from "./project/SuitableProjectReducer";
import ErrorReducer from "./error/ErrorReducer";
import JoinedProjectReducer from "./project/JoinedProjectReducer";
import SkillInPosition from "./skill/SkillInPositionReducer";
import CandidateResultReducer from "./project/CandidateResultReducer";
import CheckRejectedCandidates from "./confirm/CheckRejectedCandidates";
import RegisterErrorReducer from "./error/RegisterErrorReducer";
import SuggestAddressReducer from "./employee/SuggestAddressReducer";
import PagingSuggestListReducer from "./suggest/PagingSuggestListReducer";
import ChangeStatusErrorReducer from "./error/ChangeStatusErrorReducer";
import StatusReducer from "./status/StatusReducer";

const MainReducer = combineReducers({
    authentication,//use
    ProjectFetchReducer,//use    
    CertificationSelectBarReducer,//use
    HardSkillSelectBarReducer,//use
    SoftSkillSelectBarReducer,//use
    PositionSelectBarReducer,//use
    LanguageSelectBarReducer,//use
    SuggestCandidateList,
    SuggestCandidateSelect,
    SuggestCandidateSelectedList,
    SkillReducer,
    CertificationReducer,
    ProfileFetchReducer,
    PositionAssignReducer,
    ListEmployeeReducer,//use
    PositionReducer,//use
    PositionFormReducer,//use
    DataStatisticsReducer,
    PositionRequireReducer,
    ProjectTypeReducer,
    ProjectFieldReducer,
    PreviosRequrieReducer,
    SuggestCandidateAgainSelectedListReducer,
    ProjectDetailFetchReducer,
    SuggestCandidateAgainSelect,
    SuggestCandidateAgainList,
    SuitableProjectReducer,
    ErrorReducer,
    JoinedProjectReducer,
    SkillInPosition,
    CandidateResultReducer,
    CheckRejectedCandidates,
    RegisterErrorReducer,
    SuggestAddressReducer,
    PagingSuggestListReducer,
    ChangeStatusErrorReducer,
    StatusReducer
})

export default MainReducer