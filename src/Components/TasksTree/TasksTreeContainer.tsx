import {connect} from 'react-redux'
import TasksTree, { OwnTasksTreePropsType } from './TasksTree'
import { AppStateType } from '../../redux/store'
import {getTaskList} from './../../redux/TaskListReducer'


type MapPropsType = ReturnType<typeof mapStateToProps>

type MapDispatchPropsType = {
    getTaskList: ()=>void
}

export type TasksTreePropsType = MapPropsType & MapDispatchPropsType & OwnTasksTreePropsType

let mapStateToProps = (state:AppStateType) => {
    return {
        taskList: state.taskList.taskList,
    }
}

export default connect<MapPropsType, MapDispatchPropsType, OwnTasksTreePropsType, AppStateType>(mapStateToProps, 
    {getTaskList}) 
    (TasksTree)
    

