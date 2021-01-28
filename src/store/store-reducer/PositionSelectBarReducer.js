import * as Type from "../store-constant/index";

var initState = []

const positionSelectBarReducer = (state = initState, action)=>{
    switch (action.type) {
        case Type.FETCH_POSITION_LIST:
            state.push(
                {id:1, name:'Bussiness Analysis'},
                {id:2, name:'Developer'},
                {id:3, name:'Tester'},
                {id:4, name:'PM'},
                )
            return [...state];    
        default:
            return [...state];
    }
}

export default positionSelectBarReducer;