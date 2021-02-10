import { TaskListType } from '../Types/types'
import {instance} from './api'


if (localStorage.getItem('remember_token')) {
    instance.defaults.headers.common['X-Auth-Token'] = localStorage.getItem('remember_token')
}
if (sessionStorage.getItem('remember_token')) {
    instance.defaults.headers.common['X-Auth-Token'] = sessionStorage.getItem('remember_token')
}

export const taskListAPI = {
    getTaskList() {
        return instance.get<TaskListType>(`taskList`)
        .then(response => {
            //console.log(response)
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
    createNewTaskList(values: any) {
        return instance.post<TaskListType>(`taskList`, values)
        .then(response => {
            //console.log(response)
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
    deleteTask(taskId: number) {
        return instance.delete<TaskListType>(`taskList/${taskId}`).then(response => {
            return response.status === 200 ? response : null
        })
        .catch(err => {
            if (err.response) {
                return err.response
            } else if (err.request) {
                //console.log('request', err.request)
            } else {
                //console.log('anything else: ', err)
            }
            return null
        })
    },
    updateTask(values: any, taskId: number) {
        return instance.put<TaskListType>(`taskList/${taskId}`, values)
        .then(response => {
            //console.log(response)
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
    }
}
//descriptions
//descriptions