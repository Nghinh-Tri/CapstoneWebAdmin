import * as Type from "../store-constant/index";

var initState = []

const certificationSelectBarReducer = (state = initState, action)=>{
    switch (action.type) {
        case Type.FETCH_CERTIFICATION_LIST:
            state.push(
                {id:1, name:'Certi 1'},
                {id:2, name:'Certi 2'},
                {id:3, name:'Certi 3'},
                )
            return [...state];    
        default:
            return [...state];
    }
}

export default certificationSelectBarReducer;