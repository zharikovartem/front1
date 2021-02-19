import Item from 'antd/lib/list/Item'
import { Dispatch } from 'redux'
import { usersAPI, } from '../api/usersAPI'
import { UserType } from './authReducer'
import { getToken } from '../api/api'
import { BaseThunkType, InferActionsTypes } from './store'
// import moment from 'moment'
import { actions as authActions } from './authReducer'

export type InitialStateType = {
    usersList: Array<UserType>,
}

let initialState: InitialStateType = {
    usersList: []
}

const usersReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case 'SN/USERS/UPDATE_USERS_LIST':
            let statetCopy = { ...state }
            const newUserList = statetCopy.usersList.map((item: UserType) => {
                if (item.id !== action.changedUserData.id) {
                    return item
                } else {
                    return action.changedUserData
                }
            })
            return { ...state, usersList: newUserList }

        case 'SN/USERS/SET_USERS_LIST':
            return { ...state, usersList: action.usersList }

        default:
            return state
    }
}

export const actions = {
    setUsersList: (usersList: Array<UserType>) => ({ type: 'SN/USERS/SET_USERS_LIST', usersList } as const),
    updateUserList: (changedUserData: UserType) => ({ type: 'SN/USERS/UPDATE_USERS_LIST', changedUserData } as const)
}

export const getUsersList = (): ThunkType => {
    return async (dispatch, getState) => {
        let response = await usersAPI.getUsersList()
        dispatch(actions.setUsersList(response.data.UsersList))
    }
}

export const updateUser = (values: UserType, userId: number): ThunkType => {
    console.log(userId)
    return async (dispatch, getState) => {

        let response = await usersAPI.updateUser(values, userId)
        dispatch(actions.updateUserList(response.data.changedUserData))
        const state = getState()
        if (state.auth.user && state.auth.user.id === response.data.changedUserData.id) {
            const data: UserType = response.data.changedUserData
            // @ts-ignore
            dispatch(authActions.setAuthUserData(data, null))
        }
    }
}

export default usersReducer

type ActionsTypes = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsTypes>
export type DispatchType = Dispatch<ActionsTypes>