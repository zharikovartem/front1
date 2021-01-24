import {connect} from 'react-redux'
import TimeScale from './TimeScale'
import {getTaskListForGap} from './../../redux/taskReducer'
import { AppStateType } from '../../redux/store'
import { OwnTaskTimeScaleType } from './TimeScale'

export type MapPropsType = ReturnType<typeof mapStateToProps>

type DispatchPropsType = {
    // createNewTask: (values:NewTaskDataType, reload:boolean)=> void
}

export type TimeScalePropsType = MapPropsType & DispatchPropsType & OwnTaskTimeScaleType

let mapStateToProps = (state:AppStateType) => {
    return {
        taskList: state.task.taskList,
        taskSaveStatus: state.task.taskSaveStatus,
        taskListIsFetching: state.task.taskListIsFetching,
        dateInterval: state.task.dateInterval
    }
}

export default connect<MapPropsType, DispatchPropsType, OwnTaskTimeScaleType, AppStateType>(mapStateToProps, 
    {getTaskListForGap}) 
    (TimeScale);


