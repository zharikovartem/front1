import { Dispatch } from 'redux'
import { taskAPI, TaskListType } from '../api/taskApi'
import { NewTaskDataType, TaskType } from '../Types/types'
import { sortTaskArrayByParams } from '../utils/array-helpers'
import {BaseThunkType, InferActionsTypes} from './store'
import moment from 'moment'

type initialStateType = {
    taskList: null | Array<TaskType>,
    taskListIsFetching: boolean,
    taskSaveStatus: 'no' | 'inProgress' | 'success' | 'error'
    errorMessage: null | string,
    isInterval: boolean,
    dateInterval: {
        startDate: moment.Moment,
        endDate: moment.Moment
    }
}

let initialState:initialStateType = {
    taskList: null,
    taskListIsFetching: false,
    taskSaveStatus: 'no',
    errorMessage: null,
    isInterval: false,
    dateInterval: {
        startDate: moment(),
        endDate: moment()
    }
}

const taskReducer = (state = initialState, action: ActionsTypes): initialStateType => {
    
    switch (action.type) {
        case 'SN/TASK/SET_TASK_LIST':
            return {...state, taskList: action.taskList.Tasks.sort(sortTaskArrayByParams('time')).sort(sortTaskArrayByParams('date'))}

        case 'SN/TASK/SET_TASK_SAVE_STATUS':
            return {...state, taskSaveStatus: action.taskSaveStatus}

        case 'SN/TASK/SET_ERROR_MESSAGE':
            return {...state, errorMessage: action.message}

        case 'SN/TASK/SET_TASK_LIST_IS_FETCHING':
            return {...state, taskListIsFetching: action.isFetchingValue}

        case 'SN/TASK/SET_IS_INTERVAL':
            const dateInterval = {
                startDate: action.date.startDate,
                endDate: action.date.endDate
            }

            // console.log('in Reducer: ',dateInterval.startDate.format('DD'),'-',dateInterval.endDate.format('DD'))
            // // console.log({...state, isInterval: action.isInterval, dateInterval })
            return {...state, isInterval: action.isInterval, dateInterval }

        default:
            return state
    }
}

export const actions = {
    setTaskList: (taskList: TaskListType) => ({ type: 'SN/TASK/SET_TASK_LIST', taskList } as const),
    setTaskSaveStatus: (taskSaveStatus: 'no' | 'inProgress' | 'success' | 'error') => ({ type: 'SN/TASK/SET_TASK_SAVE_STATUS', taskSaveStatus } as const),
    setErrorMessage: (message: string | null) => ({type: 'SN/TASK/SET_ERROR_MESSAGE', message} as const),
    setTaskListIsFetching: (isFetchingValue: boolean) => ({type: 'SN/TASK/SET_TASK_LIST_IS_FETCHING', isFetchingValue} as const),
    setIsInterval: (isInterval: boolean, date: {startDate: moment.Moment, endDate: moment.Moment}) => ({type: 'SN/TASK/SET_IS_INTERVAL', isInterval, date} as const)
}

export const createNewTask = (values: NewTaskDataType, reload:boolean = true): ThunkType => {
    return async (dispatch, getState) => {
        dispatch(actions.setTaskSaveStatus('inProgress'))

        let response = await taskAPI.createNewTask(values)

        if (response.status === 200) {
            if (reload) {
                // dispatch(actions.setTaskList(response.data));
                const state = getState()
                const startDate = state.task.dateInterval.startDate.format('YYYY-MM-DD')
                const endDate = state.task.dateInterval.endDate.format('YYYY-MM-DD')
                dispatch(getTaskList(startDate, endDate));
            }
            dispatch(actions.setTaskSaveStatus('success'))
            dispatch(actions.setTaskSaveStatus('no'))
        } else {
            dispatch(actions.setErrorMessage(response.data.message))
            dispatch(actions.setTaskSaveStatus('error'))
            dispatch(actions.setTaskSaveStatus('no'))
            dispatch( actions.setErrorMessage(null) )
        }
    }
}

export const getTaskList = (startDate: string, endDate:string): ThunkType => {
    // console.log('getTaskList', startDate, '-', endDate)
    return async (dispatch, getState) => {
        dispatch(actions.setTaskListIsFetching(true))

        const values = {start_date: startDate, end_date: endDate}
        let response = await taskAPI.getTaskList(values)
        // console.log(response)
        if (response !== null) {
            dispatch(actions.setTaskList(response.data))
        } else {
            // add error message
        }
        dispatch(actions.setTaskListIsFetching(false))
    }
}

export const deleteTask = (taskid: number, startDate: string, endDate:string): ThunkType => {
    return async (dispatch, getState) => {
        let response = await taskAPI.deleteTask(taskid)
        // console.log(response)
        if (response !== null) {
            dispatch(actions.setErrorMessage('Task deletion was successful'))
            dispatch(getTaskList(startDate, endDate))
            dispatch( actions.setErrorMessage(null) )
        }
    }
}

export default taskReducer

type ActionsTypes = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsTypes>
export type DispatchType = Dispatch<ActionsTypes>
