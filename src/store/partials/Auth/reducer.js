import actions from "../actionTypes";
import { typeOfOsers } from "./typeUsers";

const initState = {
    email: "",
    password: "",
    status: typeOfOsers.GUEST
}


export const authReducer = (state = initState, action) => {
    switch(action.type){
        case actions.SIGN_UP:
            return {
                ...state,
                email: action.payload.email,
                password: action.payload.password,
                status: action.payload.status
            }
        case actions.SIGN_IN:
            console.log(action.payload)
            return {
                ...state,
                email: action.payload.email,
                password: action.payload.password,
                status: action.payload.status
            }
        case actions.SIGN_OUT:
            return {
                ...action.payload
            }
        default:
            return state
    }
}