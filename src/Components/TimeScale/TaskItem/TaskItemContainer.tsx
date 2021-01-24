import {connect} from 'react-redux'
import TaskItem, { OwnTaskItemPropsType } from './TaskItem'
import {deleteTask, getTaskListForGap} from './../../../redux/taskReducer'
import {AppStateType} from '../../../redux/store'
import {NewTaskDataType} from './../../../Types/types'

export type MapPropsType = ReturnType<typeof mapStateToProps>

type DispatchPropsType = {
    deleteTask: (taskid: number, startDate: string, endDate: string) => void
    getTaskListForGap: (startDate: string, endDate: string) => void
}

export type TaskItemPropsType = MapPropsType & DispatchPropsType & OwnTaskItemPropsType

let mapStateToProps = (state:AppStateType) => {
    return {
        dateInterval: state.task.dateInterval,
        // taskSaveStatus: state.task.taskSaveStatus,
        // errorMessage: state.task.errorMessage
    }
}

export default connect<MapPropsType, DispatchPropsType, OwnTaskItemPropsType, AppStateType>(mapStateToProps, 
    {deleteTask, getTaskListForGap}) 
    (TaskItem);