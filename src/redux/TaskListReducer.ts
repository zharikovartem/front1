import { Dispatch } from "react";
import { BaseThunkType, InferActionsTypes } from "./store";
import { taskListAPI } from './../api/taskListAPI'
import { NewTaskListType, TaskListType } from "../Types/types";


export type InitialStateType = {
    taskList: Array<TaskListType>,
    taskListIsFetching: boolean,
    isTaskListLoaded: boolean,
    selectedTasks: Array<number>
}

let initialState:InitialStateType = {
    taskList: [],
    taskListIsFetching: false,
    isTaskListLoaded: false,
    selectedTasks:[]
}

const taskListReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case 'SN/TASK_LIST/BACK_SELECTED_TASK':
            let newSelectedTasks: Array<number> = [...state.selectedTasks]
            if (newSelectedTasks.length > 0) {
                newSelectedTasks.pop()
            }              
            return { ...state, selectedTasks: newSelectedTasks }
        case 'SN/TASK_LIST/SET_SELECTED_TASK':
            return { ...state, selectedTasks: [...state.selectedTasks, action.taskId] }
        case 'SN/TASK_LIST/SET_TASK_LIST':
            return { ...state, taskList: action.taskList, isTaskListLoaded: true}

        default:
            return state
    }
}

export const actions = {
    setTaskList: (taskList: Array<any>) => ({ type: 'SN/TASK_LIST/SET_TASK_LIST', taskList } as const),
    setSelectedTasks: (taskId: number) => ({ type: 'SN/TASK_LIST/SET_SELECTED_TASK', taskId } as const),
    backSelectedTasks: () => ({type: 'SN/TASK_LIST/BACK_SELECTED_TASK'} as const),
}

export const getTaskList = (): ThunkType => {
    return async (dispatch, getState) => {
        // dispatch(actions.setTaskListIsFetching(true))

        let response = await taskListAPI.getTaskList()

        if (response !== undefined && response !== null) {
            dispatch(actions.setTaskList(response.data.Tasks))
        } else {
            // add error message
        }
        // dispatch(actions.setTaskListIsFetching(false))
    }
}

export const createNewTaskList = (values: NewTaskListType): ThunkType => {
    return async (dispatch, getState) => {
        let response = await taskListAPI.createNewTaskList(values)
        dispatch(actions.setTaskList(response.data.Tasks))
    }
}

export const deleteTaskList = (taskId: number): ThunkType => {
    return async (dispatch, getState) => {
        let response = await taskListAPI.deleteTask(taskId)
        dispatch(actions.setTaskList(response.data.Tasks))
    }
}

export const updateTaskList = (values: NewTaskListType, taskId: number): ThunkType => {
    return async (dispatch, getState) => {
        let response = await taskListAPI.updateTask(values, taskId)
        dispatch(actions.setTaskList(response.data.Tasks))
    }
}

export default taskListReducer

type ActionsTypes = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsTypes>
export type DispatchType = Dispatch<ActionsTypes>