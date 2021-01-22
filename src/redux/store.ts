import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from "redux-thunk";
import taskReducer from './taskReducer';


let rootReducer = combineReducers({
    task: taskReducer
});

type rootReducerType = typeof rootReducer
export type AppStateType = ReturnType<rootReducerType>

let store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

export default store;