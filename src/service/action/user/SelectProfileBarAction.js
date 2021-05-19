import { PROFILE } from "../../constant/index";

export const selectTab = (tab) => {
    return { type: PROFILE.SELECT_TAB, tab }
}

export const refeshTab = () => {
    return { type: PROFILE.REFRESH }
}