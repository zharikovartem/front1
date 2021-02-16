import {connect} from 'react-redux'
import { AppStateType } from '../../redux/store'
import {getTaskList, createNewTaskList, deleteTaskList, updateTaskList, actions} from './../../redux/TaskListReducer'
import {createNewTask as createNewToDo} from './../../redux/taskReducer'
import { isMobile } from 'react-device-detect'
import TasksTreeBrowser from './TasksTreeBrowser'
import TasksTreeMobile from './TasksTreeMobile'
import { NewTaskDataType, NewTaskListType } from '../../Types/types'


type MapPropsType = ReturnType<typeof mapStateToProps>

type MapDispatchPropsType = {
    getTaskList: ()=>void,
    createNewTaskList: (values: NewTaskListType)=>void,
    deleteTaskList: (taskId: number)=>void,
    updateTaskList: (values: NewTaskListType, taskId: number)=> void,
    backSelectedTasks: ()=>void,
    createNewToDo: (values: NewTaskDataType, reload?:boolean)=> void,
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

export default connect<MapPropsType, MapDispatchPropsType, OwnTasksTreePropsType, AppStateType>(mapStateToProps, 
    {getTaskList, createNewTaskList, deleteTaskList, updateTaskList, backSelectedTasks: actions.backSelectedTasks, createNewToDo}) 
    (isMobile ? TasksTreeMobile : TasksTreeBrowser)
    
type TaskTreeTypesItemType = {
    name: string,
    label?: string,
    value: string | number | null,
    isSubform: boolean,
    childTypes?: Array<TaskTreeTypesItemType> 
    component?: string,
    type?: string,
    validate?: string,
    hasFeedback?: true,

}
type TaskTreeTypesType = Array<TaskTreeTypesItemType>

export const taskTreeTypes: TaskTreeTypesType = [
    {
        name: 'Простая задача',
        value: 1,
        isSubform: false,
        childTypes: []
    },
    {
        name: 'Звонок',
        value: 2,
        isSubform: true,
        childTypes: [
            {
                label: 'телефонный номер',
                value: null,
                name: 'phone_number',
                component: 'AntInput',
                type: "text",
                validate: 'validateRequired',
                hasFeedback: true,
                isSubform: false,
            },
            {
                label: 'Имя абонента',
                value: null,
                name: 'lead_name',
                component: 'AntInput',
                type: "text",
                validate: 'validateRequired',
                hasFeedback: true,
                isSubform: false,
            }
        ]
    },
    {
        name: 'Проект',
        value: 3,
        isSubform: true,
        childTypes: []
    }
]
