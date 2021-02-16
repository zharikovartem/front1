import {connect} from 'react-redux'
import TaskTreeBrowserItem, { OwnTaskTreeBrowserItemType } from './TaskTreeBrowserItem'
import { AppStateType } from '../../redux/store'
import {getTaskList, createNewTaskList, deleteTaskList, updateTaskList} from './../../redux/TaskListReducer'
import { NewTaskListType } from '../../Types/types'


type MapPropsType = ReturnType<typeof mapStateToProps>

type MapDispatchPropsType = {
    getTaskList: ()=>void,
    createNewTaskList: (values: NewTaskListType)=>void,
    deleteTaskList: (taskId: number)=>void,
    updateTaskList: (values: NewTaskListType, taskId: number)=> void,
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
    

