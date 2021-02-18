import { Dispatch } from 'redux'
import {usersAPI, UserType} from '../api/usersAPI'
import {BaseThunkType, InferActionsTypes} from './store'
// import moment from 'moment'

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
        dispatch(actions.setUsersList(response.data.UsersList))
    }
}

export const updateUser = (values: UserType, userId: number): ThunkType => {
    console.log(userId)
    return async (dispatch, getState) => {

        let response = await usersAPI.updateUser(values, userId)
        console.log(response)
        // dispatch(actions.setUsersList(response.data.UsersList))
    }
}

export default usersReducer

type ActionsTypes = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsTypes>
export type DispatchType = Dispatch<ActionsTypes>