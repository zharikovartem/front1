import { UserType } from '../redux/authReducer'
import {instance, getToken} from './api'

type UsersListType = Array<UserType>

export const usersAPI = {
    getUsersList() {
        getToken()
        return instance.get<UsersListType>(`account`) // users
        .then(response => {
            return response.status === 200 ? response : null
        })
        .catch(err => {
            if (err.response) {
                return err.response
            } else if (err.request) {
            } else {
            }
            return null
        })
    },
    updateUser(values: UserType, userId: number) {
        getToken()
        return instance.put<UserType>(`account/${userId}`, values)
        .then(response => {
            return response.status === 200 ? response : null
        })
        .catch(err => {
            if (err.response) {
                return err.response
            } else if (err.request) {
            } else {
            }
            return null
        })
    }
}