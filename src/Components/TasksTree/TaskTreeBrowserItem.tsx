import React from 'react'
import { Button, Checkbox, Collapse, List } from 'antd'
import { PlusCircleOutlined, DeleteOutlined, EditOutlined, CaretRightOutlined } from '@ant-design/icons'
import { TaskListType } from '../../Types/types'
import { TaskTreeBrowserItemType } from './TaskTreeBrowserItemContainer'
import moment from "moment"
import { InitialDrewerDataType, InitialValuesType } from './TasksTreeBrowser'

const { Panel } = Collapse

export type OwnTaskTreeBrowserItemType = {
    item: TaskListType,
    showDrawer: () => void,
    setDrawerData: React.Dispatch<React.SetStateAction<InitialDrewerDataType>>,
    initialFormValues: InitialValuesType,
    setInitialFormValues: React.Dispatch<React.SetStateAction<InitialValuesType>>,
    initialValues: InitialValuesType,
    onRunTask: (values: number) => void
}

const TaskTreeBrowserItem: React.FC<TaskTreeBrowserItemType> = (props) => {

    const onAddSubtask = (taskId: number) => {
        console.log(taskId)
        props.setInitialFormValues({ ...props.initialValues, parent_id: taskId })
        props.setDrawerData({header: 'add subtask', taskId: false})
        props.showDrawer()
    }

    const onEdit = (values: TaskListType) => {
        console.log(values)
        props.setDrawerData({
            header: 'Edit: "' + values.name + '"',
            taskId: values.id
        })
        let day = moment().zone('GMT')
        if (values.time_to_complete !== null) {
            const splitTime = values.time_to_complete.split(/:/)
            day.hours(parseInt(splitTime[0])).minutes(parseInt(splitTime[1])).seconds(0).milliseconds(0);
        } else {
            day.hours(0).minutes(0).seconds(0).milliseconds(0);
        }
        let newFormValues: InitialValuesType = {
            ...props.initialFormValues,
            name: values.name,
            time_to_complete: day,
            descriptions: values.descriptions ? values.descriptions : undefined,
            parent_id: values.parent_id ? values.parent_id : undefined,
            task_type: Number(values.task_type)
        }
        if (values.data) {
            newFormValues = {
                ...newFormValues,
                ...JSON.parse(values.data)
            }
        }
        console.log(newFormValues)
        props.setInitialFormValues(newFormValues)
        props.showDrawer()
    }

    const onStatusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const values = { isCompleted: e.target.checked }
        props.updateTaskList(values, Number.parseInt(e.target.id))
    }

    const deleteTask = (taskId: number) => {
        props.deleteTaskList(taskId)
    }

    if (props.item.parent_id === null) {
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
    childsTasklList: Array<TaskListType>,
    taskList: Array<TaskListType>,
    onEdit: (task: TaskListType) => void,
    deleteTask: (task: number) => void,
    onAddSubtask: (taskId: number) => void,
    onStatusChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    onRunTask: (values: number) => void
}

const ChildItem: React.FC<ChildItemType> = (props) => {
    return (
        <List
            size="small"
            bordered
            dataSource={props.childsTasklList}
            renderItem={item => {
                return (<CollapseItem
                    item={item}
                    taskList={props.taskList}
                    key={item.id.toString()}
                    onAddSubtask={props.onAddSubtask}
                    onEdit={props.onEdit}
                    deleteTask={props.deleteTask}
                    onStatusChange={props.onStatusChange}
                    onRunTask={props.onRunTask}
                />
                )
            }}
        />
    )
}

type CollapseItemType = {
    key: string
    item: TaskListType,
    taskList: Array<TaskListType>,
    onEdit: (task: TaskListType) => void,
    deleteTask: (task: number) => void,
    onAddSubtask: (taskId: number) => void,
    onStatusChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    onRunTask: (values: number) => void
}
const CollapseItem: React.FC<CollapseItemType> = (props) => {
    const isLast = getChildsList(props.taskList, props.item).length === 0 ? true : false

    if (!isLast) {
        return (
            <List.Item className="p-0" draggable key={props.item.id}>
                <Collapse key={String(props.item.id)} className="w-100" defaultActiveKey={[]} collapsible="header" ghost>
                    <Panel
                        header={<span key={String(props.item.id)} className="float-left pl-2" >{props.item.name}</span>}
                        key={props.item.id + 'Panel'}
                        extra={<ButtonsBlock {...props} />}
                    >
                        <ChildItem
                            childsTasklList={getChildsList(props.taskList, props.item)}
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
    item: TaskListType,
    onEdit: (task: TaskListType) => void,
    deleteTask: (task: number) => void,
    onAddSubtask: (taskId: number) => void,
    onStatusChange: (e: React.ChangeEvent<any>) => void,
    onRunTask: (values: number) => void
}

const LastItem: React.FC<LastItemType> = (props) => {

    return (
        <List.Item className="py-0" draggable key={String(props.item.id)}>
            <>
                <div className="py-2 pl-3"><Checkbox checked={props.item.isCompleted} id={props.item.id.toString()} onClick={props.onStatusChange} /></div>
                <div className="w-100 float-left" key={String(props.item.id)}>
                    <div className="ml-3 float-left">

                        {
                            props.item.isCompleted ?
                                <span className="text-black-50">{props.item.name}</span>
                                :
                                <span data-toggle="collapse" aria-controls={props.item.id + 'collapseExample'} >{props.item.name}</span >
                        }

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
    item: TaskListType,
    onEdit: (task: TaskListType) => void,
    deleteTask: (task: number) => void,
    onAddSubtask: (parentId: number) => void,
    onRunTask: (values: number) => void
}

const ButtonsBlock: React.FC<ButtonsBlockType> = (props) => {
    return (
        <div className="d-flex flex-row">
            {Number(props.item.task_type) > 1 ?
                <Button className=""
                    type="primary"
                    shape="circle"
                    size="small"
                    style={{ marginLeft: 10 }}
                    onClick={() => { props.onRunTask(props.item.id) }}
                    icon={
                        <div className="d-flex flex-wrap align-content-start">
                            <CaretRightOutlined className="ml-1" style={{ fontSize: '14px' }} />
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

const getChildsList = (taskList: Array<TaskListType>, item: TaskListType) => {
    let childs: Array<TaskListType> = []
    for (let index = 0; index < taskList.length; index++) {
        const elem = taskList[index]
        if (elem.parent_id === item.id) {
            childs.push(elem)
        }
    }
    return childs
}