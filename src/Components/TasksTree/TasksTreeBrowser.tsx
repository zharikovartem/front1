import { Button, Card, Drawer, List, Modal } from 'antd'
import React, { useEffect, useState } from 'react'
import { TasksTreePropsType, taskTreeTypes } from './TasksTreeContainer'
import { FileAddOutlined, SettingOutlined } from '@ant-design/icons'
import NewTaskTreeForm from './TaskTreeForm/NewTaskTreeForm'
import { Formik  } from 'formik'
import moment from "moment"
import TaskTreeBrowserItem from './TaskTreeBrowserItemContainer'
import RunTaskFormCall from './RunTask.tsx/RunTaskForm'
import { NewTaskListType, TaskListType, NewTaskDataType } from '../../Types/types'
import { checkActionsType } from './TaskListActions/TaskListActions'

export type InitialDrewerDataType = {
    header: string,
    taskId: false | number
}

const initialDrewerData: InitialDrewerDataType = {
    header: 'Create New Task',
    taskId: false
} 

type SelectOptionType = {
    name: string,
    value: number
}

export type InitialValuesType = {
    selectOptions: Array<SelectOptionType> | null,
    taskTypes: typeof taskTreeTypes,
    task_type: number,
    name: string
    time_to_complete?: moment.Moment,
    descriptions?: string,
    parent_id?: number,
    data?: string
}

const getInitialValues = ( taskList: Array<TaskListType> ):InitialValuesType => {
    return (
        {
            selectOptions: getSelectOptions(taskList),
            taskTypes: taskTreeTypes,
            task_type: 1,
            name: '',
        }
    )
}

const getSelectOptions = (taskList: Array<TaskListType>):Array<SelectOptionType>  => {
    if (taskList !== undefined && taskList.length > 0) {
        return taskList.map((item: TaskListType) => {
            return ({
                name: item.name,
                value: item.id
            })
        })
    } else {
        return []
    }
}

const TasksTreeBrowser: React.FC<TasksTreePropsType> = (props) => {

    useEffect(() => {
        const getTaskList = () => props.getTaskList
        if (props.taskList !== undefined && props.taskList.length === 0 && !props.isTaskListLoaded) {
            getTaskList()()
        }
        else if (props.taskList === undefined) {
            getTaskList()()
        }
        setVisible(false)
        setInitialFormValues(getInitialValues(props.taskList))
    }, [props.taskList, props.getTaskList, props.isTaskListLoaded])

    const [visible, setVisible] = useState(false)
    const [drawerData, setDrawerData] = useState(initialDrewerData)
    const [initialFormValues, setInitialFormValues] = useState(getInitialValues(props.taskList))
    const [runTaskVisible, setRunTaskVisible] = useState(false)
    const [runData, setRunData] = useState<TaskListType | null>(null)

    type RunTaskSubmitType = {
        date: moment.Moment,
        time: moment.Moment,
    }
    const runTaskSubmit = (values: RunTaskSubmitType) => {
        if (runData !== null && runData.data !== null && props.userId) {
            const data = JSON.parse(runData.data)
            const newToDo: NewTaskDataType = {
                name: 'Call to '+data.lead_name,
                description: data.phone_number,
                date: values.date.format('YYYY-MM-DD'),
                time: values.time.format('HH:mm:00'), 
                user_id: props.userId,
                action: Number(runData.task_type),
                action_data: {
                    phone: data.phone_number,
                    name: data.lead_name
                }
            }
            console.log(newToDo)
            props.createNewToDo(newToDo, true)
        }
    }
    const runTaskOk = () => {
        setRunTaskVisible(false)
    }

    const runTaskCancel = () => {
        setRunTaskVisible(false)
    }

    const onRunTask = (values: number) => {
        setRunTaskVisible(true)
        setRunData(
            props.taskList.filter( (item: TaskListType)=> {
                    return (item.id === values)
            })[0]
        )
    }
    
    const onClose = () => {
        setInitialFormValues(getInitialValues(props.taskList))
        setVisible(false)
    }

    const showDrawer = () => {
        setVisible(true)
    }

    const onAdd = () => {
        setDrawerData(initialDrewerData)
        showDrawer()
    }

    const handleSubmit = (formProps: InitialValuesType) => {
        const data = checkActionsType(formProps)

        let newTaskList: NewTaskListType = {
            name: formProps.name,
            task_type: formProps.task_type.toString(),
            user_id: props.userId,
            time_to_complete: formProps.time_to_complete ? formProps.time_to_complete.format('HH:mm:ss') : undefined,

            descriptions: formProps.descriptions, 
            parent_id: formProps.parent_id ? formProps.parent_id : undefined,
        }

        if (data) {
            newTaskList = {...newTaskList, data: data}
        }

        if (!drawerData.taskId) {
            props.createNewTaskList(newTaskList)
        } else {
            props.updateTaskList(newTaskList, drawerData.taskId)
        }
    }

    return (
        <>
            <div className="site-card-border-less-wrapper">
                <Card
                    title={
                        <div className="inline" >
                            <div ><h2>Tasks Tree</h2></div>
                        </div>
                    }
                    extra={
                        <>
                            <Button
                                type="primary"
                                shape="round"
                                icon={
                                    <div className="d-flex flex-wrap align-content-start">
                                        <FileAddOutlined style={{ fontSize: '18px' }} />
                                        <span className="ml-1" style={{ fontSize: '14px' }}>Add</span>
                                    </div>}
                                style={{ marginLeft: 10 }}
                                onClick={onAdd}
                            />

                            <Button className=""
                                type="primary"
                                shape="round"
                                style={{ marginLeft: 10 }}
                                icon={
                                    <div className="d-flex flex-wrap align-content-start">
                                        <SettingOutlined style={{ fontSize: '18px' }} />
                                        <span className="ml-1" style={{ fontSize: '14px' }}>Settings</span>
                                    </div>}
                            />
                        </>
                    }
                    bordered={false}
                >
                    <List
                        size="small"
                        bordered
                        dataSource={props.taskList}
                        renderItem={item => {
                            return (<TaskTreeBrowserItem
                                item={item}
                                showDrawer={showDrawer}
                                setDrawerData={setDrawerData}
                                initialFormValues={initialFormValues}
                                setInitialFormValues={setInitialFormValues}
                                initialValues={getInitialValues(props.taskList)}
                                onRunTask={onRunTask}
                            />)
                        }}
                    />

                    <Drawer
                        title={drawerData.header}
                        placement="right"
                        closable={true}
                        onClose={onClose}
                        visible={visible}
                        width="90%"
                    >

                        <Formik
                            initialValues={initialFormValues}
                            onSubmit={handleSubmit}
                            enableReinitialize={true}
                        >
                            {NewTaskTreeForm}
                        </Formik>

                    </Drawer>

                    <Modal
                        title="Run Task"
                        visible={runTaskVisible}
                        onOk={runTaskOk}
                        onCancel={runTaskCancel}
                        okText="Ok"
                        cancelText="Cancel"
                    >
                        <Formik
                            initialValues={{
                                date: moment(),
                                time: moment(),
                                action: 2
                            }}
                            onSubmit={runTaskSubmit}
                            enableReinitialize={true}
                        >
                            {RunTaskFormCall}
                        </Formik>
                    </Modal>

                </Card>
            </div>

        </>
    )
}

export default TasksTreeBrowser