import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from "redux-thunk";
import taskReducer from './taskReducer';


let redusers = combineReducers({
    task: taskReducer
});

let store = createStore(redusers, applyMiddleware(thunkMiddleware));

export default store;