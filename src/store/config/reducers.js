import {combineReducers} from "redux";
import { authReducer } from "../partials/Auth/reducer";
import { predictPrice } from "../partials/culculator/reducer";

export const appReducer = combineReducers({
    predict: predictPrice,
    auth: authReducer,
}); 