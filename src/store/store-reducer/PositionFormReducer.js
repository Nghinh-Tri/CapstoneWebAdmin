import { act } from "react-dom/test-utils";
import * as Type from "../store-constant";

var initState = [];

const positionReducer = (state = initState, action) => {

    var positionObj, softSkill, hardSkill = null

    switch (action.type) {

        //Position
        case Type.ADD_POSITION_REQUIRE:
            state.push(action.positionItem)
            return [...state]


        case Type.DELETE_POSITION_REQUIRE:
            state.splice(action.positionFormIndex, 1)
            return [...state]


        case Type.UPDATE_POSITION_ID:
            positionObj = { ...state[action.positionFormIndex] }
            positionObj.positionId = action.positionID
            state.splice(action.positionFormIndex, 1, positionObj)
            return [...state]


        case Type.UPDATE_POSITION_NOC:
            positionObj = { ...state[action.positionFormIndex] }
            positionObj.nOC = action.nOC
            state.splice(action.positionFormIndex, 1, positionObj)
            return [...state]

        //Soft Skill
        case Type.ADD_SOFT_SKILL_REQUIRE:
            positionObj = { ...state[action.positionFormIndex] }
            softSkill = positionObj.softSkill.slice()
            softSkill.push("")
            positionObj.softSkill = softSkill
            state.splice(action.positionFormIndex, 1, positionObj)
            return [...state]


        case Type.DELETE_SOFT_SKILL_REQUIRE:
            positionObj = { ...state[action.positionFormIndex] }
            softSkill = positionObj.softSkill.slice()
            softSkill.splice(action.softSkillIndex, 1)
            positionObj.softSkill = softSkill
            state.splice(action.positionFormIndex, 1, positionObj)
            return [...state]


        case Type.UPDATE_SOFT_SKILL:
            positionObj = { ...state[action.positionFormIndex] }
            softSkill = positionObj.softSkill.slice()
            softSkill.splice(action.softSkillIndex, 1, action.softSkillID)
            positionObj.softSkill = softSkill
            state.splice(action.positionFormIndex, 1, positionObj)
            return [...state]

        //Soft Skill
        case Type.ADD_HARD_SKILL_REQUIRE:
            positionObj = { ...state[action.positionFormIndex] }
            hardSkill = positionObj.hardSkill.slice()
            hardSkill.push(action.hardSkillItem)
            positionObj.hardSkill = hardSkill
            state.splice(action.positionFormIndex, 1, positionObj)
            return [...state]


        case Type.DELETE_HARD_SKILL_REQUIRE:
            positionObj = { ...state[action.positionFormIndex] }
            hardSkill = positionObj.hardSkill.slice()
            hardSkill.splice(action.hardSkillIndex, 1)
            positionObj.hardSkill = hardSkill
            state.splice(action.positionFormIndex, 1, positionObj)
            return [...state]


        case Type.UPDATE_HARD_SKILL_EXP_PRIORITY:
            //Clone position obj (positionObj) at index in array
            positionObj = { ...state[action.positionFormIndex] }
            //Clone list hard skill in positionObj
            hardSkill = positionObj.hardSkill.slice()
            //Clone hard skill detail Obj (hardSkillObj) at index in hard skill list 
            var hardSkillObj = hardSkill[action.hardSkillIndex]
            //Change exp, proprity value in hardSkillObj
            if (action.name === 'exp')
                hardSkillObj.exp = parseInt(action.value)
            else if (action.name === 'priority')
                hardSkillObj.priority = parseInt(action.value)
            //Replace hard skill detail Obj at index in clone of hard skill list by hardSkillObj
            hardSkill.splice(action.hardSkillIndex, 1, hardSkillObj)
            //Replace hard skill list in clone of position obj by clone of hard skill list
            positionObj.hardSkill = hardSkill
            //Replace position obj in array at index by clone of position obj
            state.splice(action.positionFormIndex, 1, positionObj)
            return [...state]


        case Type.UPDATE_HARD_SKILL_ID:
            //Clone position obj (positionObj) at index in array
            positionObj = { ...state[action.positionFormIndex] }
            //Clone list hard skill in positionObj
            hardSkill = positionObj.hardSkill.slice()
            //Clone hard skill detail Obj (hardSkillObj) at index in hard skill list 
            var hardSkillObj = { ...hardSkill[action.hardSkillIndex] }
            //Change exp, proprity value in hardSkillObj
            hardSkillObj.hardSkillID = parseInt(action.value)
            //Replace hard skill detail Obj at index in clone of hard skill list by hardSkillObj
            hardSkill.splice(action.hardSkillIndex, 1, hardSkillObj)
            //Replace hard skill list in clone of position obj by clone of hard skill list
            positionObj.hardSkill = hardSkill
            //Replace position obj in array at index by clone of position obj
            state.splice(action.positionFormIndex, 1, positionObj)            
            return [...state]

        case Type.UPDATE_HARD_SKILL_CERTI:
            //Clone position obj (positionObj) at index in array
            positionObj = { ...state[action.positionFormIndex] }
            //Clone list hard skill in positionObj
            hardSkill = positionObj.hardSkill.slice()
            //Clone hard skill detail Obj (hardSkillObj) at index in hard skill list 
            var hardSkillObj = {...hardSkill[action.hardSkillIndex]}
            //Change exp, proprity value in hardSkillObj
            hardSkillObj.certiID = parseInt(action.value)
            //Replace hard skill detail Obj at index in clone of hard skill list by hardSkillObj
            hardSkill.splice(action.hardSkillIndex, 1, hardSkillObj)
            //Replace hard skill list in clone of position obj by clone of hard skill list
            positionObj.hardSkill = hardSkill
            //Replace position obj in array at index by clone of position obj
            state.splice(action.positionFormIndex, 1, positionObj)
            return [...state]


        default:
            return [...state]
    }
}

export default positionReducer;