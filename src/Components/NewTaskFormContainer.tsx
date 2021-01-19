import {connect} from 'react-redux'
import NewTaskForm from './NewTaskForm'
import {newTask} from './../redux/taskReducer'

let mapStateToProps = (state:any) => {
    return {
        taskList: state.task.taskList
    }
}

export default connect(mapStateToProps, 
    {newTask}) 
    (NewTaskForm);


