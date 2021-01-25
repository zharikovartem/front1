import { NewTaskDataType, TaskType } from '../Types/types'
import {instance} from './api'

export type TaskListType = {
    Tasks: Array<TaskType>
}

export const taskAPI = {
    createNewTask(values: NewTaskDataType) {
        return instance.post<TaskListType>(`tasks`, values).then(response => {
            return response.status === 200 ? response : null;
        })
        .catch(err => {
            if (err.response) {
                return err.response
            } else if (err.request) {
                // console.log('request', err.request)
            } else {
                // console.log('anything else: ', err)
            }
            return null
        })
    },

    getTaskList(values: getTaskListValuesType) {
        // console.log('getTaskList API', values)
        return instance.post<TaskListType>(`tasks/part`, values).then(response => {
            // console.log('response', response)
            return response.status === 200 ? response : null;
        })
        .catch(err => {
            if (err.response) {
                // console.log('err')
                return err.response
            } else if (err.request) {
                // console.log('request', err.request)
            } else {
                // console.log('anything else: ', err)
            }
            return null
        })
    },

    deleteTask(taskId: number) {
        return instance.delete<TaskListType>(`tasks/${taskId}`).then(response => {
            return response.status === 200 ? response : null;
        })
    }
}

export type getTaskListValuesType = {
    start_date: string, 
    end_date: string
}