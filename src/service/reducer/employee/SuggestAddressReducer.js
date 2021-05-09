import { ADDRESS, Type } from "../../constant"

var initState = []

const SuggestAddressReducer = (state = initState, action) => {
    switch (action.type) {
        case ADDRESS.SUGGEST:
            let result = []
            action.value.forEach(element => {
                result.push(element.description)
            });
            state = [...result]
            return [...state]

        case Type.REFRESH_REGISTER_PAGE:
            state = []
            return [...state]
        default:
            return [...state]
    }
}

export default SuggestAddressReducer