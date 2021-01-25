import {connect} from 'react-redux'
import ToDoList, { OwnToDoListPropsType } from './ToDoList'
import {getTaskList} from './../redux/taskReducer'
import { AppStateType } from '../redux/store'

type MapPropsType = ReturnType<typeof mapStateToProps>

type MapDispatchPropsType = {
    getTaskList: (start_date: string, end_date:string)=>void
}

export type ToDoListPropsType = MapPropsType & MapDispatchPropsType & OwnToDoListPropsType

let mapStateToProps = (state:AppStateType) => {
    return {
        taskList: state.task.taskList,
    }
}

export default connect<MapPropsType, MapDispatchPropsType, OwnToDoListPropsType, AppStateType>(mapStateToProps, 
    {getTaskList}) 
    (ToDoList)
    

