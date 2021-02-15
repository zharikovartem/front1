import taskReducer, {actions, InitialStateType, getTaskList, createNewTask, deleteTask} from './taskReducer'
import moment from 'moment'
import {taskAPI} from './../api/taskApi'
import { APIResponseType, ResultCodesEnum } from '../api/api';
import { NewTaskDataType } from '../Types/types';

jest.mock('../api/taskAPI')
const userAPIMock = taskAPI as jest.Mocked<typeof taskAPI>;

const dispatchMock = jest.fn();
const getStateMock = jest.fn();

beforeEach(() => {
    dispatchMock.mockClear();
    getStateMock.mockClear();
    userAPIMock.getTaskList.mockClear();
    userAPIMock.createNewTask.mockClear();
    userAPIMock.deleteTask.mockClear();
})

const result: APIResponseType = {
    resultCode: ResultCodesEnum.Success,
    messages: [],
    data: {}
}

userAPIMock.getTaskList.mockReturnValue(Promise.resolve(result));
userAPIMock.createNewTask.mockReturnValue(Promise.resolve(result));
userAPIMock.deleteTask.mockReturnValue(Promise.resolve(result));



const status: "no" | "inProgress" | "success" | "error" = "no";
let state: InitialStateType = {
    taskList: null, //
    taskListIsFetching: false,//
    taskSaveStatus: status,
    errorMessage: null,
    isInterval: false,
    dateInterval: {
        startDate: moment(),
        endDate: moment()
    }
}

it ('length of Tasks should be incremented', () => {
    const taskList = { Tasks: [addTask(1), addTask(2), addTask(3)] }
    let action = actions.setTaskList(taskList)
    let newState = taskReducer(state, action)
    expect(newState.taskList?.length).toBe(3)
    if (newState.taskList !== null) {
        expect(newState.taskList[1].id).toBe(2)
    }
    
})

it ('taskList should be null', () => {
    const taskList = { Tasks: [addTask(1), addTask(2), addTask(3)] }
    let action = actions.setTaskList(taskList)
    let newState = taskReducer(state, action)
    expect(newState.taskList).not.toBeNull()
})

it ('taskList[1].id should be =2', () => {
    const taskList = { Tasks: [addTask(1), addTask(2), addTask(3)] }
    let action = actions.setTaskList(taskList)
    let newState = taskReducer(state, action)
    if (newState.taskList !== null) {
        expect(newState.taskList[1].id).toBe(2);
    }
})

it ('taskSaveStatus must changed', () => {
    let action = actions.setTaskSaveStatus("inProgress")
    let newState = taskReducer(state, action)
    expect(newState.taskSaveStatus).toBe('inProgress');
})

it ('taskListIsFetching must changed', () => {
    let action = actions.setTaskListIsFetching(true)
    let newState = taskReducer(state, action)
    expect(newState.taskListIsFetching).toBe(true);
})

it ('errorMessage must changed', () => {
    let action = actions.setErrorMessage('test message')
    let newState = taskReducer(state, action)
    expect(newState.errorMessage).toBe('test message');
})

it ('isInterval must changed', () => {
    let action = actions.setIsInterval(true, { startDate: moment('2020-01-01'), endDate: moment('2020-01-01') } )
    let newState = taskReducer(state, action)
    expect(newState.dateInterval.endDate.format('YYYY-MM-DD')).toBe('2020-01-01');
})

it ('Return state without changes if action empty', () => {
    let newState = taskReducer(state, 
        // @ts-ignore
        'EMPTY_CONST'
    )
    expect(newState === state).toBe(true);
})


test('success getTaskList thunk', async () => {
    const thunk = getTaskList('2021-01-19','2021-01-20')

    await thunk(dispatchMock, getStateMock, {})

    expect(dispatchMock).toBeCalledTimes(2)
})



test('success createNewTask thunk with reload page', async () => {
    const NewTask: NewTaskDataType = {
        name: 'test',
        user_id: 1,
        time: '00:00:00',
        date: '2021-01-19'
    }
    const thunk = createNewTask(NewTask, true)
    const taskList = { Tasks: [addTask(1), addTask(2), addTask(3)] }
    await thunk(dispatchMock, getStateMock, {})

    expect(dispatchMock).toBeCalledTimes(1)
    // expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.setTaskList(taskList) )
})

test('success createNewTask thunk with reload page', async () => {
    const thunk = deleteTask(1, '2021-01-19','2021-01-20')

    const taskList = { Tasks: [addTask(1), addTask(2), addTask(3)] }

    await thunk(dispatchMock, getStateMock, {})

    expect(dispatchMock).toBeCalledTimes(3)
})







    const addTask = (num: number, date: string = '2020-01-01', time: string = '10:10:00') => {
        const Task = {
            created_at: '2020-01-01',
            date: '2020-01-01',
            deleted_at: null,
            descriptions: null,
            id: num,
            name: 'stringName',
            order_id:  null,
            todo_id: null,
            time: '10:10:00',
            type: null,
            updated_at: null,
            user_id: null
        }
        return Task
    }