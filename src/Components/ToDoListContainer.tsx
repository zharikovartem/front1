import {connect} from 'react-redux'
import ToDoList from './ToDoList'
import {getTaskList, getTaskListForGap, test} from './../redux/taskReducer'
import { AppStateType } from '../redux/store'
import { TaskType } from './../Types/taskTypes'

type MapStatePropsType = {
    taskList: Array<TaskType>|null
}

type MapDispatchPropsType = {
    getTaskList: (date: string)=>void,
    getTaskListForGap: (start_date: string, end_date:string)=>void
    test: (date: string)=>void
}

type OwnPropsType = {
    
}

export type ToDoListPropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType

let mapStateToProps = (state:AppStateType):MapStatePropsType => {
    return {
        taskList: state.task.taskList
    }
}

export default connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>(mapStateToProps, 
    {getTaskList, getTaskListForGap, test}) 
    (ToDoList);
    

