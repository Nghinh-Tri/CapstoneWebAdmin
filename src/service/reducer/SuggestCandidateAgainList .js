import { ADD_MORE_CANDIDATES, SUGGEST_CANDIDATE } from "../constant/index";
import { sortSuggestListByFieldMatch, sortSuggestListByHardSkillMatch, sortSuggestListByLanguageMatch, sortSuggestListByOverallMatch, sortSuggestListBySoftSkillMatch, sortSuggestListByTypeMatch } from "../util/util";
const initState = []

const SuggestCandidateAgainList = (state = initState, action) => {
    switch (action.type) {
        case ADD_MORE_CANDIDATES.FETCH_SUGGEST_LIST:
            if (Array.isArray(action.list)) {
                state = action.list
                if (state.length > 0) {
                    state.forEach(element => {
                        var clone = [...element.matchDetail]
                        sortSuggestListByOverallMatch(clone)
                        element.matchDetail = clone
                    });
                }
            }
            return [...state]
        case ADD_MORE_CANDIDATES.SORT_LIST:
            state.forEach(element => {
                var clone = [...element.matchDetail]
                if (action.value === 'language') {
                    sortSuggestListByLanguageMatch(clone)
                }
                if (action.value === 'softSkill') {
                    sortSuggestListBySoftSkillMatch(clone)
                }
                if (action.value === 'hardSkill') {
                    sortSuggestListByHardSkillMatch(clone)
                }
                if (action.value === 'overall') {
                    sortSuggestListByOverallMatch(clone)
                }
                if (action.value === 'type') {
                    sortSuggestListByTypeMatch(clone)
                }
                if (action.value === 'field') {
                    sortSuggestListByFieldMatch(clone)
                }
                element.matchDetail = clone
            });
            return [...state]

        case SUGGEST_CANDIDATE.CONFIRM_SUGGEST:
            state = []
            return [...state]  

        case ADD_MORE_CANDIDATES.CANCEL_SUGGEST:
            state = []
            return [...state]
        default:
            return [...state]
    }
}

export default SuggestCandidateAgainList