import {Action, applyMiddleware, combineReducers, createStore} from "redux"
import thunkMiddleware, {ThunkAction} from "redux-thunk"
import appReducer from "./appReducer"
import authReducer from "./authReducer"
import taskListReducer from "./TaskListReducer"
import taskReducer from './taskReducer'
import usersReducer from "./usersReducer"


let rootReducer = combineReducers({
    task: taskReducer,
    app: appReducer,
    auth: authReducer,
    taskList: taskListReducer,
    users: usersReducer
})

type rootReducerType = typeof rootReducer
export type AppStateType = ReturnType<rootReducerType>

export type InferActionsTypes<T> = T extends { [keys: string]: (...args: any[]) => infer U } ? U : never
export type BaseThunkType<A extends Action = Action, R = Promise<void>> = ThunkAction<R, AppStateType, unknown, A>

let store = createStore(rootReducer, applyMiddleware(thunkMiddleware))

export default store