import {connect} from 'react-redux'
// import TasksTree, { OwnTasksTreePropsType } from './TasksTree'
import { AppStateType } from '../../redux/store'
import {getTaskList, createNewTaskList} from './../../redux/TaskListReducer'
import { isMobile } from 'react-device-detect'
import TasksTreeBrowser from './TasksTreeBrowser'
import TasksTreeMobile from './TasksTreeMobile'


type MapPropsType = ReturnType<typeof mapStateToProps>

type MapDispatchPropsType = {
    getTaskList: ()=>void,
    createNewTaskList: (values: any)=>void,
}

type OwnTasksTreePropsType = {

}

export type TasksTreePropsType = MapPropsType & MapDispatchPropsType & OwnTasksTreePropsType

let mapStateToProps = (state:AppStateType) => {
    return {
        taskList: state.taskList.taskList,
        userId: state.auth.user?.id,
        isTaskListLoaded: state.taskList.isTaskListLoaded
    }
}

// const TasksTree: React.FC<TasksTreePropsType> = (props) => {
//     return {

//     }
// }

export default connect<MapPropsType, MapDispatchPropsType, OwnTasksTreePropsType, AppStateType>(mapStateToProps, 
    {getTaskList, createNewTaskList}) 
    (isMobile ? TasksTreeMobile : TasksTreeBrowser)
    

