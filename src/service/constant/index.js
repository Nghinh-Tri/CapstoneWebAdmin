export const Type = {
    LOGIN_REQUEST: 'USERS_LOGIN_REQUEST',
    LOGIN_SUCCESS: 'USERS_LOGIN_SUCCESS',
    LOGIN_FAILURE: 'USERS_LOGIN_FAILURE',

    REGISTER_REQUEST: 'USERS_REGISTER_REQUEST',
    REGISTER_SUCCESS: 'USERS_REGISTER_SUCCESS',
    REGISTER_FAILURE: 'USERS_REGISTER_FAILURE',
    REFRESH_REGISTER_PAGE: 'REFRESH_REGISTER_PAGE',

    PROFILE_PAGE: 'PROFILE_PAGE',
    GENERATE_PROFILE: 'GENERATE_PROFILE',
    FETCH_PROFILE: 'FETCH_PROFIL',
    FETCH_PROFILE_DETAIL: 'FETCH_PROFILE_DETAIL',
    FETCH_POSITION_PROFILE_DETAIL: 'FETCH_POSITION_PROFILE_DETAIL',
    FETCH_POSITION_PROFILE_UDPATE_DETAIL: 'FETCH_POSITION_PROFILE_UDPATE_DETAIL',
    UPDATE_PROFILE: 'UPDATE_PROFILE',
    UPDATE_PROFILE_FAIL: 'UPDATE_PROFILE_FAIL',
    CREATE_USER: 'CREATE_USER',

    GET_PREV_REQUIRE: 'GET_PREV_REQUIRE',

    ADD_MORE_CANDIDATE: 'ADD_MORE_CANDIDATE',

    LOGOUT: 'USERS_LOGOUT',

    GETALL_REQUEST: 'USERS_GETALL_REQUEST',
    GETALL_SUCCESS: 'USERS_GETALL_SUCCESS',
    GETALL_FAILURE: 'USERS_GETALL_FAILURE',

    ADD_POSITION_REQUIRE: "ADD_POSITION_REQUIRE",
    DELETE_POSITION_REQUIRE: "DELETE_POSITION_REQUIRE",
    UPDATE_POSITION_ID: "UPDATE_POSITION_ID",
    SELECT_POS_LEVEL: "SELECT_POS_LEVEL",

    ADD_LANGUAGE_REQUIRE: "ADD_LANGUAGE_REQUIRE",
    DELETE_LANGUAGE_REQUIRE: "DELETE_LANGUAGE_REQUIRE",
    UPDATE_LANGUAGE_ID: "UPDATE_LANGUAGE_ID",
    UPDATE_LANGUAGE_PRIORITY: "UPDATE_LANGUAGE_PRIORITY",

    ADD_SOFT_SKILL_REQUIRE: "ADD_SOFT_SKILL_REQUIRE",
    DELETE_SOFT_SKILL_REQUIRE: "DELETE_SOFT_SKILL_REQUIRE",
    UPDATE_SOFT_SKILL: "UPDATE_SOFT_SKILL",

    ADD_HARD_SKILL_REQUIRE: "ADD_HARD_SKILL_REQUIRE",
    DELETE_HARD_SKILL_REQUIRE: "DELETE_HARD_SKILL_REQUIRE",
    UPDATE_HARD_SKILL_LEVEL: "UPDATE_HARD_SKILL_LEVEL",
    UPDATE_HARD_SKILL_PRIORITY: "UPDATE_HARD_SKILL_PRIORITY",
    UPDATE_HARD_SKILL_ID: "UPDATE_HARD_SKILL_ID",
    UPDATE_HARD_SKILL_CERTI: "UPDATE_HARD_SKILL_CERTI",

    FETCH_POSITION_LIST: "FETCH_POSITION_LIST",
    FETCH_PROJECT_TYPE: "FETCH_PROJECT_TYPE",
    FETCH_PROJECT_FIELD: "FETCH_PROJECT_FIELD",
    FETCH_SOFT_SKILL_LIST: "FETCH_SOFT_SKILL_LIST",
    FETCH_HARD_SKILL_LIST: "FETCH_HARD_SKILL_LIST",
    FETCH_CERTIFICATION_LIST: "FETCH_CERTIFICATION_LIST",
    FETCH_LANGUAGE_LIST: "FETCH_LANGUAGE_LIST",

    GENERATE_PROJECT: "GENERATE_PROJECT",
    CREATE_PROJECT: "CREATE_PROJECT",
    DECLINE_PROJECT: "DECLINE_PROJECT",
    UPDATE_PROJECT_DETAIL: "UPDATE_PROJECT_DETAIL",
    UPDATE_PROJECT: "UPDATE_PROJECT",
    FETCH_PROJECT: "FETCH_PROJECT",
    FETCH_JOINED_PROJECTS: "FETCH_JOINED_PROJECTS",
    FETCH_POSITION_REQUIRE: "FETCH_POSITION_REQUIRE",
    FETCH_CANDIDATES_RESULT: "FETCH_CANDIDATES_RESULT",
    FETCH_PROJECT_DETAIL: "FETCH_PROJECT_DETAIL",
    FETCH_LIST_EMPLOYEE: 'FETCH_LIST_EMPLOYEE',
    REFRESH_CANDIDATE_RESULT: 'REFRESH_CANDIDATE_RESULT',

    CREATE_POSITION: "CREATE_POSITION",
    CREATE_POSITION_FAIL: "CREATE_POSITION_FAIL",

    AWAITING_STATISTICS: "AWAITING_STATISTICS",
    SKILL_IN_POSITION_STATISTICS: "SKILL_IN_POSITION_STATISTICS",
};

export const alertConstants = {
    SUCCESS: 'ALERT_SUCCESS',
    ERROR: 'ALERT_ERROR',
    CLEAR: 'ALERT_CLEAR'
};

export const SUGGEST_CANDIDATE = {
    SET_SELECT_POSITION: 'SET_SELECT_POSITION',
    SELECT_CANDIDATE: 'SELECT_CANDIDATE',
    NOTE_REJECTING_REASON: 'NOTE_REJECTING_REASON',
    SELECT_ALL_CANDIDATE: 'SELECT_ALL_CANDIDATE',
    UNSELECT_ALL_CANDIDATE: 'UNSELECT_ALL_CANDIDATE',
    FETCH_SELECTED_LIST: 'FETCH_SELECTED_LIST',
    FETCH_SUGGEST_LIST: 'FETCH_SUGGEST_LIST',
    SORT_LIST: 'SORT_LIST',
    CONFIRM_SUGGEST: 'CONFIRM_SUGGEST',
    REJECTED_CANDIDATE: 'REJECTED_CANDIDATE'
}

export const ADD_MORE_CANDIDATES = {
    SET_SELECT_POSITION: 'ADD_MORE_CANDIDATES_SET_SELECT_POSITION',
    SELECT_CANDIDATE: 'ADD_MORE_CANDIDATES_SELECT_CANDIDATE',
    SELECT_ALL_CANDIDATE: 'ADD_MORE_CANDIDATES_SELECT_ALL_CANDIDATE',
    UNSELECT_CANDIDATE: 'ADD_MORE_CANDIDATES_UNSELECT_CANDIDATE',
    UNSELECT_ALL_CANDIDATE: 'ADD_MORE_CANDIDATES_UNSELECT_ALL_CANDIDATE',
    FETCH_SELECTED_LIST: 'ADD_MORE_CANDIDATES_FETCH_SELECTED_LIST',
    FETCH_SUGGEST_LIST: 'ADD_MORE_CANDIDATES_FETCH_SUGGEST_LIST',
    SORT_LIST: 'ADD_MORE_CANDIDATES_SORT_LIST',
    CONFIRM_SUGGEST: 'ADD_MORE_CANDIDATES_CONFIRM_SUGGEST',
    CONFIRM_SUGGEST_FAIL: 'ADD_MORE_CANDIDATES_CONFIRM_SUGGEST_FAIL',
    CANCEL_SUGGEST: 'CANCEL_SUGGEST',
    PAGING_SUGGEST_LIST: 'PAGING_SUGGEST_LIST'
}


export const SESSION = {
    SESSION_TIME_OUT: 'SESSION_TIME_OUT',
    SESSION_ALLOW: 'SESSION_ALLOW'
}

export const POSITION = {
    FETCH_POSITION_LIST_PAGING: "FETCH_POSITION_LIST_PAGING",
    FETCH_POSITION_DETAIL: "FETCH_POSITION_DETAIL",
    CREATE_SUCCESS: 'CREATE_SUCCESS',
    CREATE_FAIL: 'CREATE_FAIL',
    UDPATE_SUCCESS: 'UDPATE_SUCCESS',
    REFRESH_PAGE: 'REFRESH_POSITION_PAGE',
    CHANGE_STATUS_FAIL: 'CHANGE_POSITION_STATUS_FAIL',
    CHANGE_STATUS: 'CHANGE_POSITION_STATUS',
}

export const SKILL = {
    FETCH_ALL_SKILL: 'FETCH_ALL_SKILL',
    FETCH_SKILL_DETAIL: 'FETCH_SKILL_DETAIL',
    FETCH_ALL_SKILL_FAIL: 'FETCH_ALL_SKILL_FAIL',
    GENERATE_SKILL: 'GENERATE_SKILL',
    UPDATE_SKILL: 'UPDATE_SKILL',
    UPDATE_SKILL_NAME: 'UPDATE_SKILL_NAME',
    UPDATE_SKILL_TYPE: 'UPDATE_SKILL_TYPE',
    CREATE_SKILL: 'CREATE_SKILL',
    CREATE_SKILL_FAIL: 'CREATE_SKILL_FAIL',
    CHANGE_SKILL_STATUS: 'CHANGE_SKILL_STATUS',
    CHANGE_STATUS_FAIL: 'CHANGE_SKILL_STATUS_FAIL',

    ADD_HARD_SKILL_OPTION: 'ADD_HARD_SKILL_OPTION',
    DELETE_HARD_SKILL_OPTION: 'DELETE_HARD_SKILL_OPTION',
    SELECT_PROJECT_TYPE: 'SELECT_PROJECT_TYPE',
    SELECT_PROJECT_FIELD: 'SELECT_PROJECT_FIELD',
    SELECT_POSITION: 'SELECT_POSITION',
    REFRESH_PAGE: 'REFRESH_SKILL_PAGE'
}

export const CERTIFICATION = {
    FETCH_CERTIFICATION_PAGING: 'FETCH_CERTIFICATION_PAGING',
    FETCH_CERTIFICATION_DETAIL: 'FETCH_CERTIFICATION_DETAIL',
    GENERATE_CERTIFICATION: 'GENERATE_CERTIFICATION',
    UPDATE_CERTIFICATION_NAME: 'UPDATE_CERTIFICATION_NAME',
    UPDATE_SKILL: 'UPDATE_SKILL',
    UPDATE_LEVEL: 'UPDATE_LEVEL',
    UPDATE_CERTIFICATION: 'UPDATE_CERTIFICATION',
    CREATE_CERTIFICATION: 'CREATE_CERTIFICATION',
    CREATE_FAIL: 'CREATE_FAIL',
    REFRESH_PAGE: 'REFRESH_CERTIFICATE_PAGE',
    CHANGE_STATUS_FAIL: 'CHANGE_CERTIFICATE_STATUS_FAIL',
    CHANGE_CERTIFICATION_STATUS: 'CHANGE_CERTIFICATION_STATUS',
}

export const POSITION_ASSIGN = {
    GENERATE_POSTION_ASSIGN: 'GENERATE_POSTION_ASSIGN',

    UPDATE_POS_ID: 'UPDATE_POS_ID',
    UPDATE_POS_LEVEL: 'UPDATE_POS_LEVEL',

    ADD_LANGUAGE: 'ADD_LANGUAGE',
    DELETE_LANGUAGE: 'DELETE_LANGUAGE',
    UPDATE_LANGUAGE_ID: 'UPDATE_LANGUAGE_ID',
    UPDATE_LANGUAGE_LEVEL: 'UPDATE_LANGUAGE_LEVEL',

    ADD_SOFT_SKILL: 'ADD_SOFT_SKILL',
    DELETE_SOFT_SKILL: 'DELETE_SOFT_SKILL',
    UPDATE_SOFT_SKILL_ID: 'UPDATE_SOFT_SKILL_ID',

    ADD_HARD_SKILL: 'ADD_HARD_SKILL',
    DELETE_HARD_SKILL: 'DELETE_HARD_SKILL',
    UPDATE_HARD_SKILL_ID: 'UPDATE_HARD_SKILL_ID',
    UPDATE_HARD_SKILL_LEVEL: 'UPDATE_HARD_SKILL_LEVEL',

    ADD_CERTIFICATE: 'ADD_CERTIFICATE',
    DELETE_CERTIFICATE: 'DELETE_CERTIFICATE',
    UPDATE_CERTIFICATE_ID: 'UPDATE_CERTIFICATE_ID',
    UPDATE_CERTIFICATE_DATE: 'UPDATE_CERTIFICATE_DATE',

    ASSIGN_POSITION: 'ASSIGN_POSITION',
    ASSIGN_POSITION_FAIL: 'ASSIGN_POSITION_FAIL',
    UPDATE_POSITION_DETAIL: 'UPDATE_POSITION_DETAIL',
    UPDATE_POSITION_DETAIL: 'UPDATE_POSITION_DETAIL',
    REFRESH_PAGE: 'REFRESH_ASSIGN_SKILL_PAGE'

}

export const FIREBASE = {
    RECIEVE_MESSAGE: 'RECIEVE_MESSAGE'
}

export const SUITABLE_PROJECT = {
    FETCH_SUITABLE_LIST: 'FETCH_SUITABLE_LIST'
}

export const ERROR = {
    LOGIN_ERROR: 'LOGIN_ERROR',
    REGISTER_ERROR: 'REGISTER_ERROR',
    DUPLICATE_ERROR: 'DUPLICATE_ERROR'
}

export const ADDRESS = {
    SUGGEST: 'SUGGEST'
}