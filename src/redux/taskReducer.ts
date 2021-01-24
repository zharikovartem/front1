import { Dispatch } from 'redux'
import { taskAPI, TaskListType } from '../api/taskApi'
import { NewTaskDataType, TaskType } from '../Types/types'
import { sortTaskArrayByParams } from '../utils/array-helpers'
import {BaseThunkType, InferActionsTypes} from './store'

type initialStateType = {
    taskList: null | Array<TaskType>,
    taskListIsFetching: boolean,
    taskSaveStatus: 'no' | 'inProgress' | 'success' | 'error'
    errorMessage: null | string
}

let initialState:initialStateType = {
    taskList: null,
    taskListIsFetching: false,
    taskSaveStatus: 'no',
    errorMessage: null
}

const taskReducer = (state = initialState, action: ActionsTypes): initialStateType => {
    let stateCopy = { ...state }
    switch (action.type) {
        case 'SN/TASK/SET_TASK_LIST':
            return {...state, taskList: action.taskList.Tasks.sort(sortTaskArrayByParams('time')).sort(sortTaskArrayByParams('date'))}

        case 'SN/TASK/SET_TASK_SAVE_STATUS':
            return {...state, taskSaveStatus: action.taskSaveStatus}

        case 'SN/TASK/SET_ERROR_MESSAGE':
            return {...state, errorMessage: action.message}

        case 'SN/TASK/SET_TASK_LIST_IS_FETCHING':
            return {...state, taskListIsFetching: action.isFetchingValue}

        default:
            return state
    }
}

export const actions = {
    setTaskList: (taskList: TaskListType) => ({ type: 'SN/TASK/SET_TASK_LIST', taskList } as const),
    setTaskSaveStatus: (taskSaveStatus: 'no' | 'inProgress' | 'success' | 'error') => ({ type: 'SN/TASK/SET_TASK_SAVE_STATUS', taskSaveStatus } as const),
    setErrorMessage: (message: string | null) => ({type: 'SN/TASK/SET_ERROR_MESSAGE', message} as const),
    setTaskListIsFetching: (isFetchingValue: boolean) => ({type: 'SN/TASK/SET_TASK_LIST_IS_FETCHING', isFetchingValue} as const)
}

export const getTaskList = (date: string): ThunkType => {
    return async (dispatch, getState) => {
        dispatch(actions.setTaskListIsFetching(true))
        console.log('setTaskListIsFetching true')
        let response = await taskAPI.getTaskList(date)
        if (response !== null) {
            dispatch(actions.setTaskList(response.data))
            dispatch(actions.setTaskListIsFetching(false))
            console.log('setTaskListIsFetching false')
        } else {
            // add error message
        }
    }
}
export const createNewTask = (values: NewTaskDataType, reload:boolean = true): ThunkType => {
    return async (dispatch, getState) => {
        dispatch(actions.setTaskSaveStatus('inProgress'))

        let taskList = await taskAPI.createNewTask(values)

        if (taskList.status === 200) {
            if (reload) {
                dispatch(actions.setTaskList(taskList.data));
            }
            dispatch(actions.setTaskSaveStatus('success'))
            dispatch(actions.setTaskSaveStatus('no'))
        } else {
            dispatch(actions.setErrorMessage(taskList.data.message))
            dispatch(actions.setTaskSaveStatus('error'))
            dispatch(actions.setTaskSaveStatus('no'))
            dispatch( actions.setErrorMessage(null) )
        }
    }
}

export const getTaskListForGap = (start_date: string, end_date:string): ThunkType => {
    return async (dispatch, getState) => {
        dispatch(actions.setTaskListIsFetching(true))

        let response = await taskAPI.getTaskListForGap({start_date, end_date})
        if (response !== null) {
            dispatch(actions.setTaskList(response.data))
        } else {
            // add error message
        }
        dispatch(actions.setTaskListIsFetching(false))
    }
}

export default taskReducer

type ActionsTypes = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsTypes>
export type DispatchType = Dispatch<ActionsTypes>
