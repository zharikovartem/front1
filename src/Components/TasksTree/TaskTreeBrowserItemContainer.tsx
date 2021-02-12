import {connect} from 'react-redux'
import TaskTreeBrowserItem, { OwnTaskTreeBrowserItemType } from './TaskTreeBrowserItem'
import { AppStateType } from '../../redux/store'
import {getTaskList, createNewTaskList, deleteTaskList, updateTaskList, actions} from './../../redux/TaskListReducer'
import { isMobile } from 'react-device-detect'
// import TasksTreeBrowser from './TasksTreeBrowser'
import TasksTreeMobile from './TasksTreeMobile'


type MapPropsType = ReturnType<typeof mapStateToProps>

type MapDispatchPropsType = {
    getTaskList: ()=>void,
    createNewTaskList: (values: any)=>void,
    deleteTaskList: (taskId: number)=>void,
    updateTaskList: (values: any, taskId: number)=> void,
    // backSelectedTasks: ()=>void,
}

type OwnTasksTreePropsType = {

}

export type TaskTreeBrowserItemType = MapPropsType & MapDispatchPropsType & OwnTaskTreeBrowserItemType

let mapStateToProps = (state:AppStateType) => {
    return {
        taskList: state.taskList.taskList,
        userId: state.auth.user?.id,
        isTaskListLoaded: state.taskList.isTaskListLoaded,
        selectedTasks: state.taskList.selectedTasks
    }
}

export default connect<MapPropsType, MapDispatchPropsType, OwnTaskTreeBrowserItemType, AppStateType>(mapStateToProps, 
    {getTaskList, createNewTaskList, deleteTaskList, updateTaskList}) 
    (TaskTreeBrowserItem)
    

