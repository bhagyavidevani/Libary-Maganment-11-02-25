import { combineReducers } from "redux";
import { BookReduces } from "./BookReduces";
import { AuthReduces } from "./AuthReduces";

export const rootReducer=combineReducers({
  BookReduces,
  AuthReduces
})