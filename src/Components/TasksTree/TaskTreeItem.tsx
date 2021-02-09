import { SwipeAction, List } from 'antd-mobile'
import React from 'react'
import { useDispatch } from 'react-redux'
import { taskAPI } from '../../api/taskApi'
import { TaskListType } from '../../Types/types'
import {actions} from './../../redux/TaskListReducer'

const Item = List.Item




export type OwnTaskTreeItemsType = {
    taskItem: TaskListType,
    deleteTaskList: (taskId: number) => void,
    showDrawer: () => void,
    setDrawerData: (drawerData: any) => void,
    initialFormValues: any,
    setInitialFormValues: (initialFormValues: any) => void
    updateTaskList: (values: any, taskId: number)=> void,
}
export const TaskTreeItemMobile: React.FC<OwnTaskTreeItemsType> = (props) => {
    const dispatch = useDispatch()
    function handleDispatch(email: number) {
        dispatch(actions.setSelectedTasks(email));
    }

    const onEdit = (task: TaskListType) => {
        props.setDrawerData({
            header: 'Edit: "' + task.name + '"',
            taskId: task.id
        })

        let time_to_complete = new Date()
        if (task.time_to_complete !== null) {
            const splitTime = task.time_to_complete.split(/:/)
            time_to_complete.setHours( parseInt(splitTime[0]) )
            time_to_complete.setMinutes( parseInt(splitTime[1]) )
            time_to_complete.setSeconds(0)
            time_to_complete.setMilliseconds(0)
        } else {
            time_to_complete.setHours(0)
            time_to_complete.setMinutes(0)
            time_to_complete.setSeconds(0)
            time_to_complete.setMilliseconds(0)
        }

        props.setInitialFormValues({
                ...props.initialFormValues,
                name: task.name,
                time_to_complete: time_to_complete,
                descriptions: task.descriptions,
                parent_id: [ task.parent_id ],
                task_type: [ Number(task.task_type) ]
            })

        props.showDrawer()
    }

    const onItemOpen = () => {
        console.log(props.taskItem.id, 'is open')

        handleDispatch(props.taskItem.id)
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
                    text: 'Cancel',
                    onPress: () => {
                        //console.log('cancel') 
                    },
                    style: { backgroundColor: '#ddd', color: 'white' },
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
                    text: 'Execute',
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
            >
                {props.taskItem.isCompleted ? <span className="text-black-50">{props.taskItem.name}</span> : <span>{props.taskItem.name}</span>}
            </Item>

        </SwipeAction>
    )
}