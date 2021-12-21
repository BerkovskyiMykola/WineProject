import { combineReducers } from "redux";
import auth from "./auth";
import message from "./message";
import user from "./user";
import profile from "./profile";
import barrel from "./barrel";
import measurement from "./measurement";

export default combineReducers({
    auth,
    message,
    user,
    profile,
    barrel,
    measurement
});