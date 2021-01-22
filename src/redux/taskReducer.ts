import { Dispatch } from 'redux'
import { ThunkAction } from 'redux-thunk'
import { taskAPI } from '../api/api'
import { GetStateType } from '../Types/reduxTypes'
import { TaskType } from './../Types/taskTypes'
import { AppStateType } from './store'


const SET_TASK_LIST = "SET_TASK_LIST"
const SET_TASK_SAVE_STATUS = 'SET_TASK_SAVE_STATUS'

type initialStateType = {
    taskList: null | Array<TaskType>,
    taskSaveStatus: 'no' | 'inProgress' | 'success' | 'error'
}
let initialState:initialStateType = {
    taskList: null,
    taskSaveStatus: 'no'
}

const taskReducer = (state = initialState, action: TaskActionsTypes) => {
    let stateCopy = { ...state }
    switch (action.type) {
        case SET_TASK_LIST:
            stateCopy.taskList = action.taskList.Tasks
            return stateCopy

        case SET_TASK_SAVE_STATUS:
            stateCopy.taskSaveStatus = action.taskSaveStatus
            console.log('SET_TASK_SAVE_STATUS: ', action.taskSaveStatus)
            return stateCopy

        default:
            return state
    }
}

type TaskActionsTypes = SetTaskListActionType | SetTaskSaveStatusActionType

type TaskListType = {
    Tasks: Array<TaskType>
}
type SetTaskListActionType = {
    type: typeof SET_TASK_LIST,
    taskList: TaskListType
}
export const setTaskList = (taskList: TaskListType):SetTaskListActionType => ({ type: SET_TASK_LIST, taskList })
type SetTaskSaveStatusActionType = {
    type: typeof SET_TASK_SAVE_STATUS,
    taskSaveStatus: 'no' | 'inProgress' | 'success' | 'error'
}
export const setTaskSaveStatus = (taskSaveStatus: 'no' | 'inProgress' | 'success' | 'error'):SetTaskSaveStatusActionType => ({ type: SET_TASK_SAVE_STATUS, taskSaveStatus })




export type DispatchType = Dispatch<TaskActionsTypes>

export const getTaskList = (date: string) => {
    return (dispatch: DispatchType, getState: GetStateType) => {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json'},
        }
        const url = 'https://81.90.181.175/api/tasks?date=' + date
        fetch(url, requestOptions)
            .then( response => response.json() )
            .then(data => {
                // console.log('response getTaskList: ', data)
                dispatch(setTaskList(data));
            })
            .catch((e) => console.log("Can’t access  Error:.", e))
    }
}

export const getTaskListForGap = (start_date: string, end_date:string) => {
    return (dispatch: DispatchType, getState: GetStateType) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({start_date, end_date})
        }
        const url = 'https://81.90.181.175/api/tasks/part'
        fetch(url, requestOptions)
            .then( response => response.json() )
            .then(data => {
                console.log('response getTaskListForGap: ', data)
                dispatch(setTaskList(data));
            })
            .catch((e) => console.log("Can’t access  Error:.", e))
    }
}

type newTaskDataType = {
    task: string,
    user_id: string,
    taskTime: string,
    date: string
    description?: string
}
export const newTask = (data: newTaskDataType, reload:boolean = true) => {
    console.log('setTaskSaveStatus inProgress ')
    return (dispatch: DispatchType, getState: GetStateType) => {
        dispatch(setTaskSaveStatus('inProgress'))
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        }
        const url = 'https://81.90.181.175/api/tasks'
        // console.log('requestOptions: ', requestOptions)
        fetch(url, requestOptions)
            .then( response => {
                // console.log('response: ',response)
                return response.json()
            } )
            .then(data => {
                console.log('newTask response: ', data)
                console.log('reload: ', reload)
                // return data
                if (reload) {
                    console.log('dispatch(setTaskList)')
                    dispatch(setTaskList(data));
                }
                
                console.log('setTaskSaveStatus success')
                dispatch(setTaskSaveStatus('success'))
            })
            .catch((e) => {
                console.log("Can’t access  Error:.", e)
                dispatch(setTaskSaveStatus('error'))
            })
    }
}

export const test = (date: any):ThunkAction< Promise<void>, AppStateType, unknown, TaskActionsTypes> => {
    let data2 = taskAPI.test(date)
    console.log(data2)
    return async (dispatch) => {
        let data = await taskAPI.test(date)
    }
}

export const deleteTask = (data: any) => {
}

export default taskReducer
