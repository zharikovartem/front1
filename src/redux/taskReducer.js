import { taskAPI } from '../api/api'

const SET_TASK_LIST = "SET_TASK_LIST"

let initialState = {
    taskList: null,
}

const taskReducer = (state = initialState, action) => {
    let stateCopy = { ...state }
    switch (action.type) {
        case SET_TASK_LIST:
            stateCopy.taskList = action.taskList
            return stateCopy

        default:
            return state
    }
}

export const setTaskList = (taskList) => ({ type: SET_TASK_LIST, taskList })
// export const setTest = (toDoData) => ({ type: TEST_CONSTANT, testData })
// export const setTest = (toDoData) => ({ type: TEST_CONSTANT, testData })
// export const setTest = (toDoData) => ({ type: TEST_CONSTANT, testData })

// get all items method: GET
export const getTaskList = () => {
    console.log('taskAPI', taskAPI)
    return (dispatch) => {
        taskAPI.getTaskList().then(response => {
            dispatch(setTaskList(response));
        })
    }
}

export const newTask = (data) => {
    console.log('data in reducer: ', data)
    return (dispatch) => {
        taskAPI.newTask(data).then(response => {
            // dispatch(setTaskList(response));
            console.log(response)
        })
    }
}

export const editTask = (data) => {
}

export const deleteTask = (data) => {
}

export default taskReducer
