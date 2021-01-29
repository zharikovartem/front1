import { NewTaskDataType, TaskType } from '../Types/types'
import {instance} from './api'

export const userAPI = {
    checkUserForExistence(userName: string) {
        return instance.get<any>(`users?userName=${userName}`)
        .then(response => {
            return response.status === 200 ? response : null
        })
        .catch(err => {
            if (err.response) {
                return err.response
            } else if (err.request) {
                console.log('request', err.request)
            } else {
                console.log('anything else: ', err)
            }
            return null
        })
    }
}