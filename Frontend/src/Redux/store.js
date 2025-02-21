import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import thunk from 'redux-thunk';
import { reducer as SprintReducer } from "./SprintReducer/reducer";
import { reducer as AuthReducer } from "./AuthReducer/reducer";
import { reducer as TaskReducer } from "./TaskReducer/reducer";

const rootReducer = combineReducers({ SprintReducer, AuthReducer, TaskReducer });

const store = legacy_createStore(rootReducer,applyMiddleware(thunk))


export { store }