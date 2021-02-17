import {instance, getToken} from './api'

export type UserType = {
    id: number,
    name: string,
    view_settings: string,
    email: string,
    status: 'admin' | 'superAdmin' | 'guest'
}
type UsersListType = Array<UserType>

export const usersAPI = {
    getUsersList() {
        getToken()
        // console.log(instance.defaults.headers.common['X-Auth-Token'])
        return instance.get<UsersListType>(`taskList`) // users
        .then(response => {
            console.log(response)
            return response.status === 200 ? response : null
        })
        .catch(err => {
            if (err.response) {
                //console.log(err.response)
                return err.response
            } else if (err.request) {
                //console.log('request', err.request)
            } else {
                //console.log('anything else: ', err)
            }
            return null
        })
    },
}