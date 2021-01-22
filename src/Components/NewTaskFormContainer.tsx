import {connect} from 'react-redux'
import NewTaskForm from './NewTaskForm'
import {newTask} from './../redux/taskReducer'
import { AppStateType } from '../redux/store'

let mapStateToProps = (state:AppStateType) => {
    return {
        // taskList: getTaskSelector()
        taskList: state.task.taskList,
        taskSaveStatus: state.task.taskSaveStatus,
    }
}

export default connect(mapStateToProps, 
    {newTask}) 
    (NewTaskForm);


