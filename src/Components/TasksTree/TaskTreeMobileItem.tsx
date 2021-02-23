import { SwipeAction, List } from 'antd-mobile'
import React from 'react'
import { useDispatch } from 'react-redux'
import { NewTaskListType, TaskListType } from '../../Types/types'
import { NewTimeByString } from '../../utils/Date/NewDeteByString'
import { actions } from '../../redux/TaskListReducer'
import { InitialDrewerDataType, InitialValuesType } from './TasksTreeMobile'

const Item = List.Item


const time_to_complete = NewTimeByString()

export type OwnTaskTreeItemsType = {
    taskItem: TaskListType,
    deleteTaskList: (taskId: number) => void,
    showDrawer: () => void,
    setDrawerData: (drawerData: InitialDrewerDataType) => void,
    initialFormValues: InitialValuesType,
    setInitialFormValues: (initialFormValues: InitialValuesType) => void
    updateTaskList: (values: NewTaskListType, taskId: number) => void,
}
export const TaskTreeItemMobile: React.FC<OwnTaskTreeItemsType> = (props) => {
    const dispatch = useDispatch()

    const onSubTask = () => {
        props.setDrawerData({
            header: 'SubTask for: "' + props.taskItem.name + '"',
            taskId: false
        })

        props.setInitialFormValues({
            ...props.initialFormValues,
            name: '',
            time_to_complete: time_to_complete,
            descriptions: '',
            parent_id: Number(props.taskItem.id),
            // task_type: 0
            task_type: [0]
        })
        props.showDrawer()
    }

    const onEdit = (task: TaskListType) => {
        props.setDrawerData({
            header: 'Edit: "' + task.name + '"',
            taskId: task.id
        })

        const new_time_to_complete = NewTimeByString( task.time_to_complete )

        props.setInitialFormValues({
            ...props.initialFormValues,
            name: task.name,
            time_to_complete: new_time_to_complete,
            descriptions: task.descriptions ? task.descriptions : undefined,
            parent_id: task.parent_id ? task.parent_id : undefined,
            // task_type:  Number(task.task_type) 
            task_type:  [Number(task.task_type)]
        })

        props.showDrawer()
    }

    const onItemOpen = () => {
        dispatch(actions.setSelectedTasks(props.taskItem.id));
        props.setDrawerData({
            header: props.taskItem.name,
            taskId: props.taskItem.id
        })
    }

    const onComplet = () => {
        const values = { isCompleted: !props.taskItem.isCompleted }
        props.updateTaskList(values, props.taskItem.id)
    }

    return (
        <SwipeAction
            style={{ backgroundColor: 'gray' }}
            autoClose
            right={[
                {
                    text: 'SubTask',
                    onPress: () => { onSubTask() },
                    style: { backgroundColor: 'green', color: 'white' },
                },
                {
                    text: 'Delete',
                    onPress: () => props.deleteTaskList(props.taskItem.id),
                    style: { backgroundColor: '#F4333C', color: 'white' },
                },
            ]}
            left={[
                {
                    text: 'Edit',
                    onPress: () => { onEdit(props.taskItem) },
                    style: { backgroundColor: '#108ee9', color: 'white' },
                },
                {
                    text: props.taskItem.isCompleted ? 'Not Done' : 'Done',
                    onPress: () => onComplet(),
                    style: { backgroundColor: 'green', color: 'white' },
                },
            ]}
        // onOpen={() => //console.log('global open')}
        // onClose={() => //console.log('global close')}
        >
            <Item
                // className="my-3"
                onClick={onItemOpen}
                // arrow="horizontal"
                key={props.taskItem.id}
                wrap
            >
                {/* {props.taskItem.isCompleted ? <span className="text-black-50">{props.taskItem.name}</span> : <span>{props.taskItem.name}</span>} */}

                <div className="w-100 row " key={props.taskItem.id}>
                    <div className="col-10">
                        {props.taskItem.isCompleted ? 
                        <span className="text-black-50 text-break">{props.taskItem.name}</span> 
                        : 
                        <span className="text-break">{props.taskItem.name}</span>}
                    </div>
                    <div className="col-2">
                        {props.taskItem.time_to_complete ? props.taskItem.time_to_complete.split(/:/)[0]+':'+props.taskItem.time_to_complete.split(/:/)[1] : null}
                    </div>
                </div>

            </Item>

        </SwipeAction>
    )
}