import {getAuthUserData} from "./authReducer"
import {InferActionsTypes} from './store';

let initialState = {
    initialized: false
}

export type InitialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof actions>

const appReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'SN/APP/INITIALIZED_SUCCESS':
            console.log('INITIALIZED_SUCCESS: true')
            return {
                ...state,
                initialized: true
            }
        default:
            return state;
    }
}

export const actions = {
    initializedSuccess: () => ({type: 'SN/APP/INITIALIZED_SUCCESS'} as const)
}

export const initializeApp = () => (dispatch: any) => {
    let promise = dispatch(getAuthUserData());

    Promise.all([promise])
        .then(() => {
            console.log('dispatch(actions.initializedSuccess());')
            dispatch(actions.initializedSuccess());
        });
}


export default appReducer;