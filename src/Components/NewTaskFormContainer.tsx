import {connect} from 'react-redux'
import NewTaskForm, { NewTaskFormOwnPropsType } from './NewTaskForm'
import {createNewTask} from './../redux/taskReducer'
import { AppStateType } from '../redux/store'
import {NewTaskDataType} from './../Types/types'

export type MapPropsType = ReturnType<typeof mapStateToProps>

type DispatchPropsType = {
    createNewTask: (values:NewTaskDataType, reload:boolean)=> void
}

export type NewTaskFormPropsType = MapPropsType & DispatchPropsType & NewTaskFormOwnPropsType

let mapStateToProps = (state:AppStateType) => {
    return {
        taskList: state.task.taskList,
        taskSaveStatus: state.task.taskSaveStatus,
        errorMessage: state.task.errorMessage,
        dateInterval: state.task.dateInterval
    }
}

export default connect<MapPropsType, DispatchPropsType, NewTaskFormOwnPropsType, AppStateType>(mapStateToProps, 
    {createNewTask}) 
    (NewTaskForm);


