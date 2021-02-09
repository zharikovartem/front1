import {connect} from 'react-redux'
// import TasksTree, { OwnTasksTreePropsType } from './TasksTree'
import { AppStateType } from '../../redux/store'
import {getTaskList, createNewTaskList, deleteTaskList, updateTaskList, actions} from './../../redux/TaskListReducer'
import { isMobile } from 'react-device-detect'
import TasksTreeBrowser from './TasksTreeBrowser'
import TasksTreeMobile from './TasksTreeMobile'
import { act } from '@testing-library/react'


type MapPropsType = ReturnType<typeof mapStateToProps>

type MapDispatchPropsType = {
    getTaskList: ()=>void,
    createNewTaskList: (values: any)=>void,
    deleteTaskList: (taskId: number)=>void,
    updateTaskList: (values: any, taskId: number)=> void,
    backSelectedTasks: ()=>void,
}

type OwnTasksTreePropsType = {

}

export type TasksTreePropsType = MapPropsType & MapDispatchPropsType & OwnTasksTreePropsType

let mapStateToProps = (state:AppStateType) => {
    return {
        taskList: state.taskList.taskList,
        userId: state.auth.user?.id,
        isTaskListLoaded: state.taskList.isTaskListLoaded,
        selectedTasks: state.taskList.selectedTasks
    }
}

// const TasksTree: React.FC<TasksTreePropsType> = (props) => {
//     return {

//     }
// }

export default connect<MapPropsType, MapDispatchPropsType, OwnTasksTreePropsType, AppStateType>(mapStateToProps, 
    {getTaskList, createNewTaskList, deleteTaskList, updateTaskList, backSelectedTasks: actions.backSelectedTasks}) 
    (isMobile ? TasksTreeMobile : TasksTreeBrowser)
    

