import {connect} from 'react-redux'
import TaskItem, { OwnTaskItemPropsType } from './TaskItem'
import {deleteTask, getTaskList, updateTask} from './../../../redux/taskReducer'
import {AppStateType} from '../../../redux/store'

export type MapPropsType = ReturnType<typeof mapStateToProps>

type DispatchPropsType = {
    deleteTask: (taskid: number, startDate: string, endDate: string) => void
    getTaskList: (startDate: string, endDate: string) => void,
    updateTask: (values: any, taskId: number) => void,
}

export type TaskItemPropsType = MapPropsType & DispatchPropsType & OwnTaskItemPropsType

let mapStateToProps = (state:AppStateType) => {
    return {
        dateInterval: state.task.dateInterval,
    }
}

export default connect<MapPropsType, DispatchPropsType, OwnTaskItemPropsType, AppStateType>(mapStateToProps, 
    {deleteTask, getTaskList, updateTask}) 
    (TaskItem)