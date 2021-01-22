import {connect} from 'react-redux'
import TimeScale from './TimeScale'
import {newTask} from './../../redux/taskReducer'

let mapStateToProps = (state:any) => {
    return {
        taskList: state.task.taskList,
        taskSaveStatus: state.task.taskSaveStatus,
    }
}

export default connect(mapStateToProps, 
    {newTask}) 
    (TimeScale);


