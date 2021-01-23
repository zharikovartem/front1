import {connect} from 'react-redux'
import TimeScale from './TimeScale'
// import {createNewTask} from './../../redux/taskReducer'
import { AppStateType } from '../../redux/store'
import { OwnTaskTimeScaleType } from './TimeScale'

export type MapPropsType = ReturnType<typeof mapStateToProps>

type DispatchPropsType = {
    // createNewTask: (values:NewTaskDataType, reload:boolean)=> void
}

let mapStateToProps = (state:AppStateType) => {
    return {
        taskList: state.task.taskList,
        taskSaveStatus: state.task.taskSaveStatus,
    }
}

export default connect<MapPropsType, DispatchPropsType, OwnTaskTimeScaleType, AppStateType>(mapStateToProps, 
    {}) 
    (TimeScale);


