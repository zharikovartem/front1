import { authAPI } from "../api/authAPI";
import { BaseThunkType, InferActionsTypes } from "./store"
// import {FormAction} from 'redux-form/lib/actions';

type InitialStateType = {
    user: UserType | null,
    remember_token: string | null,
    isAuth: boolean
}
let initialState: InitialStateType = {
    // userId: null as (number | null),
    // email: null as string | null,
    // login: null as string | null,
    // isAuth: false,
    // captchaUrl: null as string | null// if null, then captcha is not required
    user: null,
    remember_token: null,
    isAuth: false
}

const authReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case 'SN/AUTH/SET_USER_DATA':
            if (action.user !== null) {
                console.log('1')
                return { ...state, user: action.user, remember_token: action.remember_token, isAuth: true}
            } else {
                return initialState;
            }
            
        case 'SN/AUTH/LOGOUT':
            localStorage.removeItem('remember_token');
            return initialState;

        default:
            return state;
    }
}

export type UserType = {
    created_at: string
    email: string
    email_verified_at: null | any
    id: number
    name: string
    status: string
    updated_at: string
}
export const actions = {
    setAuthUserData: (user: UserType | null, remember_token: string | null) => ({ type: 'SN/AUTH/SET_USER_DATA', user, remember_token } as const),
    logout: () => ({type: 'SN/AUTH/LOGOUT'} as const),
}

// export const getAuthUserData = (): ThunkType => async (dispatch) => {
//     let response = await authAPI.me()
//     //console.log('getAuthUserData', response)
// }

export const getAuthUserData = (): ThunkType => {
    return async (dispatch, getState) => {
        let response = await authAPI.me()

        if (response !== null) {
            if (response.data.resultCode === 0) {
                dispatch(actions.setAuthUserData(response.data.user, response.data.remember_token))
            } else {
                //console.log(response.data.messages[0])
            }
        }
    }
}

export type credsType = {
    email: string,
    password: string,
    rememberMe: boolean
}

export const login = (data: credsType): ThunkType => {
    return async (dispatch, getState) => {
        let response = await authAPI.login(data)
        if (response) {
            console.log(response)
            if (response.status === 200) {
                console.log('200')
                dispatch(actions.setAuthUserData(response.data.user, response.data.remember_token))
            }
        }
    }
}

// export const logout = (): ThunkType => {
//     return async (dispatch, getState) => {
//         let response = await authAPI.logout()
//     }
// }

export default authReducer;

// export type InitialStateType = typeof initialState;
type ActionsTypes = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType< ActionsTypes>

