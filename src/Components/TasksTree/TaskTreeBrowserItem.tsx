import React, { useState } from 'react'
import { Button, Checkbox, Collapse, List } from 'antd'
import { PlusCircleOutlined , DeleteOutlined, EditOutlined, CaretRightOutlined  } from '@ant-design/icons'
import { TaskListType } from '../../Types/types'
import {TaskTreeBrowserItemType} from './TaskTreeBrowserItemContainer'
import moment from "moment"

const { Panel } = Collapse

export type OwnTaskTreeBrowserItemType = {
    // item: TaskListType,
    item: any
    showDrawer: () => void,
    setDrawerData: (drawerData: any) => void,
    initialFormValues: any,
    setInitialFormValues: (initialFormValues: any) => void,
    initialValues: any,
    onRunTask: (values:any)=>void
}

const TaskTreeBrowserItem: React.FC<TaskTreeBrowserItemType> = (props) => {

    const onAddSubtask = (taskId: number) => {
        console.log('onAddSubtask to: ', taskId)
        props.setInitialFormValues({})
        props.setInitialFormValues({...props.initialValues, parent_id: taskId})
        props.showDrawer()
    }

    const onEdit = (values: any) => {
        console.log('onEdit values: ',values)
        props.setDrawerData({
            header: 'Edit: "' + values.name + '"',
            taskId: values.id
        })
        let day = moment().zone('GMT')
        if (values.time_to_complete !== null) {
            const splitTime = values.time_to_complete.split(/:/)
            day.hours(parseInt(splitTime[0])).minutes(parseInt(splitTime)).seconds(0).milliseconds(0);
        } else {
            day.hours(0).minutes(0).seconds(0).milliseconds(0);
        }
        
        props.setInitialFormValues({
                ...props.initialFormValues,
                ...JSON.parse(values.data), 
                name: values.name,
                time_to_complete: day,
                descriptions: values.descriptions,
                parent_id: values.parent_id,
                task_type: Number(values.task_type)
            })

        props.showDrawer()
    }

    const onStatusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log('onStatusChange', Number.parseInt(e.target.id))
        const values = { isCompleted: e.target.checked }
        props.updateTaskList(values, Number.parseInt(e.target.id))
    }

    const deleteTask = (taskId: number) => {
        console.log('deleteTask: ', taskId)
        props.deleteTaskList(taskId)
    }

    // console.log(props.item)
    if (props.item.parent_id == null) {
        return <CollapseItem
            item={props.item}
            taskList={props.taskList}
            key={String(props.item.id)}
            onAddSubtask={onAddSubtask}
            onEdit={onEdit}
            deleteTask={deleteTask}
            onStatusChange={onStatusChange}
            onRunTask={props.onRunTask}
        />
    } else {
        return null
    }
}

export default TaskTreeBrowserItem

type ChildItemType = {
    childsTaslList: any
    taskList: Array<TaskListType>,
    onEdit: (task: TaskListType) => void,
    deleteTask: (task: number) => void,
    onAddSubtask: (taskId: number) => void,
    onStatusChange: (e: any) => void,
    onRunTask: (values:any)=>void
}
const ChildItem: React.FC<ChildItemType> = (props) => {
    console.log(props.childsTaslList)
    // let vals = Array.from( props.childsTaslList.values() )
    // console.log(vals)
    return (
        <>
            { props.childsTaslList.map((item: any) => {
                // console.log(props.childsTaslList.get(item.id))
            {/* { props.childsTaslList .map((item: TaskListType) => { */}
                return (
                    <CollapseItem
                        item={item}
                        taskList={props.taskList}
                        key={String(item.id)}
                        onAddSubtask={props.onAddSubtask}
                        onEdit={props.onEdit}
                        deleteTask={props.deleteTask}
                        onStatusChange={props.onStatusChange}
                        onRunTask={props.onRunTask}
                    />
                )
            })
            }
        </>
    )
}

type CollapseItemType = {
    key: any
    item: any,
    taskList: Array<TaskListType>,
    onEdit: (task: TaskListType) => void,
    deleteTask: (task: number) => void,
    onAddSubtask: (taskId: number) => void,
    onStatusChange: (e: any) => void,
    onRunTask: (values:any)=>void
}
const CollapseItem: React.FC<CollapseItemType> = (props) => {
    const [isLast, setIsLast] = useState( getChildsList(props.taskList, props.item).length === 0 ? true : false )
    // console.log(props)
    // console.log(isLast)

    if (!isLast) {
        return (
            <List.Item className="py-0" draggable key={props.item.id}>
                <Collapse key={String(props.item.id)} className="w-100" defaultActiveKey={[]} collapsible="header" ghost>
                    <Panel
                        // header={props.item.name}
                        header={<span key={String(props.item.id)} className="float-left pl-2" >{props.item.name}</span>}
                        key={props.item.id + 'Panel'}
                        extra={<ButtonsBlock {...props}/>}
                    >
                        <ChildItem
                            childsTaslList={getChildsList(props.taskList, props.item)}
                            taskList={props.taskList}
                            onEdit={props.onEdit}
                            deleteTask={props.deleteTask}
                            onAddSubtask={props.onAddSubtask}
                            onStatusChange={props.onStatusChange}
                            onRunTask={props.onRunTask}
                        />

                    </Panel>
                </Collapse>
            </List.Item>
        )
    } else {
        return (<LastItem 
            item={props.item} 
            onEdit={props.onEdit} 
            deleteTask={props.deleteTask} 
            onAddSubtask={props.onAddSubtask} 
            onStatusChange={props.onStatusChange}
            onRunTask={props.onRunTask}
            />)
    }

}

type LastItemType = {
    item: any,
    onEdit: (task: TaskListType) => void,
    deleteTask: (task: number) => void,
    onAddSubtask: (taskId: number) => void,
    onStatusChange: (e: any) => void,
    onRunTask: (values:any)=>void
}

const LastItem: React.FC<LastItemType> = (props) => {
    const onStatusChange = (e: any) => {
        const values = { ...props.item, isCompleted: e.target.checked }
        props.onEdit(values)
    }

    // console.log(props.item.name,' checked: ', props.item.isCompleted)

    return (
        <List.Item className="py-0" draggable key={String(props.item.id)}>
        <>
            <div className="py-2 pl-3"><Checkbox checked={props.item.isCompleted} id={props.item.id} onClick={props.onStatusChange} /></div>
            <div className="w-100 float-left" key={String(props.item.id)}>
                <div className="ml-3 float-left">

                    {props.item.isCompleted ? <span className="text-black-50">{props.item.name}</span> : <a data-toggle="collapse" aria-controls={props.item.id + 'collapseExample'} >{props.item.name}</a>}

                </div>
                <div className="ml-3 float-right">
                    {props.item.time_to_complete}
                </div>
            </div>
            <div className="pr-3">
            <ButtonsBlock {...props} />
            </div>
        </>
        </List.Item>
    )
}

type ButtonsBlockType = {
    item: any,
    onEdit: (task: TaskListType)=>void,
    deleteTask: (task: number)=>void,
    onAddSubtask: (parentId: number)=>void,
    onRunTask: (values:any)=>void
}

const ButtonsBlock: React.FC<ButtonsBlockType> = (props) => {
    return(
        <div className="d-flex flex-row">
            {props.item.task_type > 1 ?
                <Button className=""
                type="primary"
                shape="circle"
                size="small"
                style={{ marginLeft: 10 }}
                onClick={() => { props.onRunTask(props.item.id) }}
                icon={
                    <div className="d-flex flex-wrap align-content-start">
                        <CaretRightOutlined  className="ml-1" style={{ fontSize: '14px' }} />
                    </div>
                }
            />
            :
            null
            }
                <Button className=""
                    type="primary"
                    shape="circle"
                    size="small"
                    style={{ marginLeft: 10 }}
                    onClick={() => { props.onAddSubtask(props.item.id) }}
                    icon={
                        <div className="d-flex flex-wrap align-content-start">
                            <PlusCircleOutlined className="ml-1" style={{ fontSize: '14px' }} />
                        </div>
                    }
                />
                <Button className=""
                    type="primary"
                    shape="circle"
                    size="small"
                    style={{ marginLeft: 10 }}
                    onClick={() => { props.onEdit(props.item) }}
                    icon={
                        <div className="d-flex flex-wrap align-content-start">
                            <EditOutlined className="ml-1" style={{ fontSize: '14px' }} />
                        </div>
                    }
                />
                <Button className=""
                    type="primary"
                    danger
                    shape="circle"
                    size="small"
                    style={{ marginLeft: 10 }}
                    onClick={() => { props.deleteTask(props.item.id) }}
                    icon={
                        <div className="d-flex flex-wrap align-content-start">
                            <DeleteOutlined className="ml-1" style={{ fontSize: '14px' }} />
                        </div>
                    }
                />
            </div>
    )
}

const getChildsList = (taskList: any, item: any ) => {
    let childs: Array<TaskListType> = []
    for (let index = 0; index < taskList.length; index++) {
        const elem = taskList[index]
        if (elem.parent_id === item.id) {
            childs.push(elem)
        }
    }
    return childs

    // let childs = new Map()
    // 
    // for (let pair of taskList.entries()) {
    //     const elem = pair
    //     if (elem.parent_id === item.id) {
    //         childs.set(pair[0], pair)
    //     }
    // }
    // return childs
}