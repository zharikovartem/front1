import { SwipeAction, List } from 'antd-mobile'
import React from 'react'
import { useDispatch } from 'react-redux'
import { taskAPI } from '../../api/taskApi'
import { TaskListType } from '../../Types/types'
import { actions } from './../../redux/TaskListReducer'

const Item = List.Item


const time_to_complete = new Date()
time_to_complete.setHours(0)
time_to_complete.setMinutes(0)
time_to_complete.setSeconds(0)
time_to_complete.setMilliseconds(0)

export type OwnTaskTreeItemsType = {
    taskItem: TaskListType,
    deleteTaskList: (taskId: number) => void,
    showDrawer: () => void,
    setDrawerData: (drawerData: any) => void,
    initialFormValues: any,
    setInitialFormValues: (initialFormValues: any) => void
    updateTaskList: (values: any, taskId: number) => void,
}
export const TaskTreeItemMobile: React.FC<OwnTaskTreeItemsType> = (props) => {
    const dispatch = useDispatch()

    const onSubTask = () => {
        // console.log(props.taskItem.id, ': onSubTask')
        props.setDrawerData({
            header: 'SubTask for: "' + props.taskItem.name + '"',
            taskId: null
        })
        console.log('parent_id:', props.taskItem.parent_id)

        props.setInitialFormValues({
            ...props.initialFormValues,
            name: '',
            time_to_complete: time_to_complete,
            descriptions: '',
            parent_id: [Number(props.taskItem.id)],
            task_type: [0]
        })
        props.showDrawer()
    }

    const onEdit = (task: TaskListType) => {
        props.setDrawerData({
            header: 'Edit: "' + task.name + '"',
            taskId: task.id
        })

        // let new_time_to_complete = {...time_to_complete}
        let new_time_to_complete = new Date(time_to_complete.getTime())
        if (task.time_to_complete !== null) {
            const splitTime = task.time_to_complete.split(/:/)
            new_time_to_complete.setHours(parseInt(splitTime[0]))
            new_time_to_complete.setMinutes(parseInt(splitTime[1]))
            new_time_to_complete.setSeconds(0)
            new_time_to_complete.setMilliseconds(0)
        } else {
            
        }

        props.setInitialFormValues({
            ...props.initialFormValues,
            name: task.name,
            time_to_complete: new_time_to_complete,
            descriptions: task.descriptions,
            parent_id: [task.parent_id],
            task_type: [Number(task.task_type)]
        })

        props.showDrawer()
    }

    const onItemOpen = () => {
        dispatch(actions.setSelectedTasks(props.taskItem.id));
    }

    const onComplet = () => {
        console.log('onComplet')
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
        // onOpen={() => console.log('global open')}
        // onClose={() => console.log('global close')}
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
                        {props.taskItem.time_to_complete.split(/:/)[0]+':'+props.taskItem.time_to_complete.split(/:/)[1]}
                    </div>
                </div>

            </Item>

        </SwipeAction>
    )
}