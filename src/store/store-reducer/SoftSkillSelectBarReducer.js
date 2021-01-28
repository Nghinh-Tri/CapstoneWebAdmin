import * as Type from "../store-constant/index";

var initState = []

const softSkillSelectBarReducer = (state = initState, action)=>{
    switch (action.type) {
        case Type.FETCH_SOFT_SKILL_LIST:
            state.push(
                {id:1, name:'Communication'},
                {id:2, name:'Courtesy'},
                {id:3, name:'Flexibility'},
                )
            return [...state];    
        default:
            return [...state];
    }
}

export default softSkillSelectBarReducer;