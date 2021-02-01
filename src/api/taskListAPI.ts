import {instance} from './api'

export const taskListAPI = {
    getTaskList() {
        return instance.get<any>(`taskList`)
        .then(response => {
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
    createNewTask() {

    },
    deleteTask() {

    },
    updateTask() {

    }
}