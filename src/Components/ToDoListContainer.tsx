import {connect} from 'react-redux'
import ToDoList from './ToDoList'
import {getTaskList} from './../redux/taskReducer'

let mapStateToProps = (state:any) => {
    return {
        taskList: state.task.taskList
    }
}

export default connect(mapStateToProps, 
    {getTaskList}) 
    (ToDoList);
    

