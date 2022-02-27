import { combineReducers } from "@reduxjs/toolkit";
import contactReducer from "../pages/contacts/contactSlice";

const rootReducers = {
  contact: contactReducer
}

export default combineReducers(rootReducers);
