import {instance} from './api'

instance.defaults.headers.common['X-Auth-Token'] = localStorage.getItem('remember_token')

export const taskListAPI = {
    getTaskList() {
        return instance.get<any>(`taskList`)
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
        return instance.post<any>(`taskList`, values)
        .then(response => {
            //console.log(response)
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
    deleteTask(taskId: number) {
        return instance.delete<any>(`taskList/${taskId}`).then(response => {
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
    updateTask() {

    }
}