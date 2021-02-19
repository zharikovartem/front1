import { NewTaskDataType, TaskType } from '../Types/types'
import {instance} from './api'

const getToken = () => {
    if (localStorage.getItem('remember_token')) {
        instance.defaults.headers.common['X-Auth-Token'] = localStorage.getItem('remember_token')
    }
    if (sessionStorage.getItem('remember_token')) {
        instance.defaults.headers.common['X-Auth-Token'] = sessionStorage.getItem('remember_token')
    }
}


export type TaskListType = {
    Tasks: Array<TaskType>
}

export const taskAPI = {
    createNewTask(values: NewTaskDataType) {
        return instance.post<TaskListType>(`tasks`, values)
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

    getTaskList(values: getTaskListValuesType) {
        getToken()
        return instance.post<TaskListType>(`tasks/part`, values)
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

    deleteTask(taskId: number) {
        getToken()
        return instance.delete<TaskListType>(`tasks/${taskId}`).then(response => {
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

    updateTask(values: NewTaskDataType, taskId: number) {
        getToken()
        return instance.put<TaskListType>(`tasks/${taskId}`, values)
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

export type getTaskListValuesType = {
    start_date: string, 
    end_date: string
}