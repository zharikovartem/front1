import {Action, applyMiddleware, combineReducers, createStore} from "redux"
import thunkMiddleware, {ThunkAction} from "redux-thunk"
import appReducer from "./appReducer"
import authReducer from "./authReducer"
import taskListReducer from "./TaskListReducer"
import taskReducer from './taskReducer'


let rootReducer = combineReducers({
    task: taskReducer,
    app: appReducer,
    auth: authReducer,
    taskList: taskListReducer,
})

type rootReducerType = typeof rootReducer
export type AppStateType = ReturnType<rootReducerType>

export type InferActionsTypes<T> = T extends { [keys: string]: (...args: any[]) => infer U } ? U : never
export type BaseThunkType<A extends Action = Action, R = Promise<void>> = ThunkAction<R, AppStateType, unknown, A>

let store = createStore(rootReducer, applyMiddleware(thunkMiddleware))

// console.log('global State:', store.getState())

export default store