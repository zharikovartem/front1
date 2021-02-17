import { Dispatch } from 'redux'
import { taskAPI, TaskListType } from '../api/taskApi'
import {usersAPI, UserType} from '../api/usersAPI'
import { NewTaskDataType, TaskType } from '../Types/types'
import {BaseThunkType, InferActionsTypes} from './store'
import moment from 'moment'

export type InitialStateType = {
    usersList: Array<UserType>,
}

let initialState:InitialStateType = {
    usersList: []
}

const usersReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case 'SN/USERS/SET_USERS_LIST':
            return {...state, usersList: action.usersList}

        default:
            return state
    }
}

export const actions = {
    setUsersList: (usersList: Array<UserType>) => ({ type: 'SN/USERS/SET_USERS_LIST', usersList } as const),
}

export const getUsersList = (): ThunkType => {
    return async (dispatch, getState) => {

        let response = await usersAPI.getUsersList()
        console.log(response)
    }
}

export default usersReducer

type ActionsTypes = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsTypes>
export type DispatchType = Dispatch<ActionsTypes>