import {connect} from 'react-redux'
import TaskItem, { OwnTaskItemPropsType } from './TaskItem'
import {deleteTask} from './../../../redux/taskReducer'
import { AppStateType } from '../../../redux/store'
import {NewTaskDataType} from './../../../Types/types'

export type MapPropsType = ReturnType<typeof mapStateToProps>

type DispatchPropsType = {
    deleteTask: (taskid: number)=> void
}

export type TaskItemPropsType = MapPropsType & DispatchPropsType & OwnTaskItemPropsType

let mapStateToProps = (state:AppStateType) => {
    return {
        // taskList: state.task.taskList,
        // taskSaveStatus: state.task.taskSaveStatus,
        // errorMessage: state.task.errorMessage
    }
}

export default connect<MapPropsType, DispatchPropsType, OwnTaskItemPropsType, AppStateType>(mapStateToProps, 
    {deleteTask}) 
    (TaskItem);