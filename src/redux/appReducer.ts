import {getAuthUserData} from "./authReducer"
import {InferActionsTypes} from './store'

let initialState = {
    initialized: false,
    location: '/'
}

export type InitialStateType ={
    initialized: boolean,
    location: string
}

type ActionsType = InferActionsTypes<typeof actions>

const appReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'SN/APP/INITIALIZED_SUCCESS':
            return {
                ...state,
                initialized: true
            }

        case 'SN/APP/SET_LOCATION':
            return  {
                ...state,
                location: action.location
            }
        default:
            return state;
    }
}

export const actions = {
    initializedSuccess: () => ({type: 'SN/APP/INITIALIZED_SUCCESS'} as const),
    setLocation: (location: string) => ({type: 'SN/APP/SET_LOCATION', location} as const),
}

export const initializeApp = () => (dispatch: any) => {
    let promise = dispatch(getAuthUserData());
    Promise.all([promise])
        .then(() => {
            dispatch(actions.initializedSuccess());
        });
}

export const addLocation = (location: string) => (dispatch: any) => {
    dispatch(actions.setLocation(location));
}

export default appReducer;