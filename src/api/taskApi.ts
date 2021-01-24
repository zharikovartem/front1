import { NewTaskDataType, TaskType } from '../Types/types'
import {instance} from './api'

export type TaskListType = {
    Tasks: Array<TaskType>
}

export const taskAPI = {
    getTaskList(date: string) {
        return instance.get<TaskListType>(`tasks?date=${date}` ).then(response => {
            return response.status === 200 ? response : null;
        })
        .catch(err => {
            if (err.response) {
                console.log('err', err.response)
                return err.response
            } else if (err.request) {
                console.log('request', err.request)
            } else {
                console.log('anything else: ', err)
            }
            return null
        })
    },

    createNewTask(values: NewTaskDataType) {
        return instance.post<TaskListType>(`tasks`, values).then(response => {
            return response.status === 200 ? response : null;
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
    },

    getTaskListForGap(values: getTaskListForGapValuesType) {
        return instance.post<TaskListType>(`tasks/part`, values).then(response => {
            return response.status === 200 ? response : null;
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

type getTaskListForGapValuesType = {
    start_date: string, 
    end_date: string
}