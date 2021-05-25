import { PROJECT_REQUIREMENT } from "../../constant/index";

export const selectRequirement = (index) => {
    return { type: PROJECT_REQUIREMENT.SELECT_POSITION, index }
}