import { authAPI } from "../api/authAPI";
import { BaseThunkType, InferActionsTypes } from "./store"
// import {FormAction} from 'redux-form/lib/actions';


let initialState = {
    userId: null as (number | null),
    email: null as string | null,
    login: null as string | null,
    isAuth: false,
    captchaUrl: null as string | null// if null, then captcha is not required
}

const authReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case 'SN/auth/SET_USER_DATA':
        // case 'SN/auth/GET_CAPTCHA_URL_SUCCESS':
        //     return {
        //         ...state,
        //         ...action.payload
        //     }
        default:
            return state;
    }
}

export const actions = {
    setAuthUserData: (userId: number | null, email: string | null, login: string | null, isAuth: boolean) => ({
        type: 'SN/auth/SET_USER_DATA', payload: {userId, email, login, isAuth}
    } as const),
    // getCaptchaUrlSuccess: (captchaUrl: string) => ({
    //     type: 'SN/auth/GET_CAPTCHA_URL_SUCCESS', payload: {captchaUrl}
    // } as const)
}

// export const getAuthUserData = (): ThunkType => async (dispatch) => {
//     let response = await authAPI.me()
//     console.log('getAuthUserData', response)
// }

export const getAuthUserData = (): ThunkType => {
    return async (dispatch, getState) => {
        let response = await authAPI.me()

        if (response !== null) {
            if (response.data.resultCode === 0) {
                dispatch(actions.setAuthUserData(null, null, null, false))
            } else {
                console.log(response.data.messages[0])
            }
        }
    }
}

export default authReducer;

export type InitialStateType = typeof initialState;
type ActionsTypes = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType< ActionsTypes>

