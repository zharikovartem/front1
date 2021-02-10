import {connect} from 'react-redux'
import ToDoMobile from './ToDoMobile'
import { isMobile } from 'react-device-detect'
import {getTaskList, createNewTask, updateTask, deleteTask} from '../../redux/taskReducer'
import { AppStateType } from '../../redux/store'
import ToDoBrowser from './ToDoBrowser'
import { NewTaskDataType } from '../../Types/types'

type MapPropsType = ReturnType<typeof mapStateToProps>

type MapDispatchPropsType = {
    getTaskList: (start_date: string, end_date:string)=>void,
    createNewTask: (values: NewTaskDataType, reload:boolean)=>void,
    updateTask: (values: any, taskId: number)=>void,
    deleteTask: (taskid: number, startDate: string, endDate:string)=>void,
}

export type ToDoListPropsType = MapPropsType & MapDispatchPropsType & OwnToDoListPropsType

let mapStateToProps = (state:AppStateType) => {
    return {
        taskList: state.task.taskList,
        viewSettings: state.auth.viewSettings,
        isInterval: state.task.isInterval,
        dateInterval: state.task.dateInterval,
        userId: state.auth.user?.id
    }
}

type OwnToDoListPropsType = {}

const component: any = isMobile ? ToDoMobile : ToDoBrowser

export default connect<MapPropsType, MapDispatchPropsType, OwnToDoListPropsType, AppStateType>(mapStateToProps, 
    {getTaskList, createNewTask, updateTask, deleteTask}) 
    ( component )
    

