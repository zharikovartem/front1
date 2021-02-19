import {createSelector} from 'reselect'
import {AppStateType} from './store'

const UsersItemsSelector = (state: AppStateType) => state.users.usersList

export const getUsersListSelector = createSelector(UsersItemsSelector,
    (users) => {
        return users
    }
)