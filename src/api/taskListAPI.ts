import { TaskListType } from '../Types/types'
import {getToken, instance} from './api'
import {NewTaskListType} from './../Types/types'

export const taskListAPI = {
    getTaskList() {
        getToken()
        return instance.get<TaskListType>(`taskList`)
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
    createNewTaskList(values: NewTaskListType) {
        return instance.post<TaskListType>(`taskList`, values)
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
        return instance.delete<TaskListType>(`taskList/${taskId}`).then(response => {
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
    updateTask(values: NewTaskListType, taskId: number) {
        return instance.put<TaskListType>(`taskList/${taskId}`, values)
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
