// import { taskAPI } from '../api/api'

const SET_TASK_LIST = "SET_TASK_LIST"

let initialState = {
    taskList: null,
}

const taskReducer = (state = initialState, action: any) => {
    let stateCopy = { ...state }
    switch (action.type) {
        case SET_TASK_LIST:
            stateCopy.taskList = action.taskList
            console.log('taskList: ', action.taskList)
            return stateCopy

        default:
            return state
    }
}

export const setTaskList = (taskList: any) => ({ type: SET_TASK_LIST, taskList })
// export const setTest = (toDoData) => ({ type: TEST_CONSTANT, testData })
// export const setTest = (toDoData) => ({ type: TEST_CONSTANT, testData })
// export const setTest = (toDoData) => ({ type: TEST_CONSTANT, testData })

export const getTaskList = (date: any) => {
    return (dispatch: any) => {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json'},
        }
        const url = 'https://81.90.181.175/api/tasks?date=' + date
        fetch(url, requestOptions)
            .then( response => response.json() )
            .then(data => {
                console.log('response: ', data)
                // return data
                dispatch(setTaskList(data));
            })
            .catch((e) => console.log("Can’t access  Error:.", e))
    }
}

export const newTask = (data: any) => {
    // console.log('data in reducer: ', data)
    // return (dispatch: any) => {
    //     taskAPI.newTask(data).then( (response: any) => {
    //         // dispatch(setTaskList(response));
    //         console.log(response)
    //     })
    // }
}

export const editTask = (data: any) => {
}

export const deleteTask = (data: any) => {
}

export default taskReducer
