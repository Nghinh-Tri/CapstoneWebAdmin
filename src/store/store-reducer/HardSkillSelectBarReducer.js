import * as Type from "../store-constant/index";

var initState = []

const hardSkillSelectBarReducer = (state = initState, action)=>{
    switch (action.type) {
        case Type.FETCH_HARD_SKILL_LIST:
            state.push(
                {id:1, name:'C#'},
                {id:2, name:'Java'},
                {id:3, name:'Python'},
                )
            return [...state];    
        default:
            return [...state];
    }
}

export default hardSkillSelectBarReducer;