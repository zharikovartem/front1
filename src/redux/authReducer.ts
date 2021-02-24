import { authAPI, RegisterFormType } from "../api/authAPI";
import { SettingasInstanseType } from "../Components/ToDo/Settings/SettingsModal";
import { BaseThunkType, InferActionsTypes } from "./store"
import moment from "moment"

type InitialStateType = {
    user: UserType | null,
    remember_token: string | null,
    isAuth: boolean
    viewSettings: any
    authError: null | string
}
let initialState: InitialStateType = {
    user: null,
    remember_token: null,
    isAuth: false,
    viewSettings: {
        ToDo: {}
    },
    authError: null
}

const authReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case 'SN/AUTH/SET_AUTH_ERROR':
            return{...state, authError: action.error}
        case 'SN/AUTH/SET_SETTINGS_DATA':
            let viewSettings = {...state.viewSettings}
            
            let timeStart: string = ''
            if (moment.isMoment(action.settings.timeStart)) {
                timeStart = action.settings.timeStart.format('h:mm A')
            } else {
                timeStart = action.settings.timeStart.toTimeString().split(' ')[0]
            }
            let timeEnd: string = ''
            if (moment.isMoment(action.settings.timeEnd)) {
                timeEnd = action.settings.timeEnd.format('h:mm A')
            } else {
                timeEnd = action.settings.timeEnd.toTimeString().split(' ')[0]
            }

            viewSettings[action.settingType] = {
                ...action.settings,
                timeStart: timeStart,
                timeEnd: timeEnd
            }
            return {...state, viewSettings: viewSettings}
        case 'SN/AUTH/SET_USER_DATA':
            if (action.user !== null) {
                return { ...state, 
                            user: action.user, 
                            remember_token: action.remember_token, 
                            isAuth: true, 
                            viewSettings: JSON.parse(action.user.view_settings),
                            authError: null
                        }
            } else {
                return initialState;
            }
            
        case 'SN/AUTH/LOGOUT':
            localStorage.removeItem('remember_token')
            sessionStorage.removeItem('remember_token');
            return initialState;

        default:
            return state;
    }
}

export type UserType = {
    created_at: string
    email: string
    email_verified_at: null | string
    id: number
    name: string
    status: string
    updated_at: string,
    view_settings: string
    toDoList?: Array<any> 
}
export const actions = {
    setAuthUserData: (user: UserType | null, remember_token: string | null) => ({ type: 'SN/AUTH/SET_USER_DATA', user, remember_token } as const),
    logout: () => ({type: 'SN/AUTH/LOGOUT'} as const),
    changeSettings: (settingType: string, settings: SettingasInstanseType) => ({ type: 'SN/AUTH/SET_SETTINGS_DATA', settingType, settings } as const),
    setAuthError: (error: string) => ({type: 'SN/AUTH/SET_AUTH_ERROR', error } as const),
}

export const getAuthUserData = (): ThunkType => {
    return async (dispatch, getState) => {
        let response = await authAPI.me()

        if (response !== null) {
            if (response.data.resultCode === 0) {
                dispatch(actions.setAuthUserData(response.data.user, response.data.remember_token))
            } else {
            }
        }
    }
}

export type credsType = {
    email: string,
    password: string,
    remember: boolean
}

export const login = (data: credsType): ThunkType => {
    return async (dispatch, getState) => {
        let response = await authAPI.login(data)
        if (response) {
            if (response.status === 200) {
                dispatch(actions.setAuthUserData(response.data.user, response.data.remember_token))
            } else {
                dispatch(actions.setAuthError(response.data.message))
            }
        }
    }
}

export const register = (creds: RegisterFormType): ThunkType => {
    return async (dispatch, getState) => {
        const response = await authAPI.register(creds)
        if (response.status === 200) {
            const credsToLogin: credsType = {
                email: creds.email,
                password: creds.password,
                remember: creds.remember ? creds.remember : false
            }
            dispatch(login(credsToLogin))
        } else {
            let message: string = ''
            for (const key in response.data) {
                if (Object.prototype.hasOwnProperty.call(response.data, key)) {
                    const element = response.data[key];
                    message = message+key+': '+element[0]+';'
                }
            }
            
            dispatch(actions.setAuthError(message))
        }
        
    }
}

export default authReducer;

type ActionsTypes = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType< ActionsTypes>

