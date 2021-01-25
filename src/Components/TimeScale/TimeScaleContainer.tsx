import {connect} from 'react-redux'
import TimeScale from './TimeScale'
import {getTaskList} from './../../redux/taskReducer'
import { AppStateType } from '../../redux/store'
import { OwnTaskTimeScaleType } from './TimeScale'

export type MapPropsType = ReturnType<typeof mapStateToProps>

type DispatchPropsType = {
    getTaskList: (startDate: string, endDate: string) => void
}

export type TimeScalePropsType = MapPropsType & DispatchPropsType & OwnTaskTimeScaleType

let mapStateToProps = (state:AppStateType) => {
    return {
        taskList: state.task.taskList,
        taskSaveStatus: state.task.taskSaveStatus,
        taskListIsFetching: state.task.taskListIsFetching,
        dateInterval: state.task.dateInterval,
        errorMessage: state.task.errorMessage
    }
}

export default connect<MapPropsType, DispatchPropsType, OwnTaskTimeScaleType, AppStateType>(mapStateToProps, 
    {getTaskList}) 
    (TimeScale)


