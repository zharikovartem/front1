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


const TasksTreeBrowser: React.FC<TasksTreePropsType> = (props) => {
    useEffect(() => {
        if (props.taskList !== undefined && props.taskList.length === 0 && !props.isTaskListLoaded) {
            props.getTaskList()
        }
        else if (props.taskList === undefined) {
            props.getTaskList()
        }
        setVisible(false)
        setInitialFormValues(initialValues)
    }, [props.taskList])

    const [visible, setVisible] = useState(false)
    const [drawerData, setDrawerData] = useState(initialDrewerData)

    
    const getSelectOptions = (): Array<SelectOptionType> | null => {
        if (props.taskList !== undefined && props.taskList.length > 0) {
            return props.taskList.map((item) => {
                return ({
                    name: item.name,
                    value: item.id
                })
            })
        } else {
            return null
        }
    }

    const initialValues: InitialValuesType = {
        selectOptions: getSelectOptions(),
        taskTypes: taskTreeTypes,
        task_type: 1,
        name: '',

    }

    const [initialFormValues, setInitialFormValues] = useState(initialValues)
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
                user_id: props.userId
            }
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
                if (item.id === values) {
                    return item
                }
            })[0]
        )
    }
    
    const onClose = () => {
        setInitialFormValues({ ...initialValues })
        setVisible(false)
    }

    const showDrawer = () => {
        setVisible(true)
    }

    const onAdd = () => {
        setDrawerData(initialDrewerData)
        setInitialFormValues(initialValues)
        showDrawer()
    }

    const handleSubmit = (formProps: InitialValuesType) => {
        console.log(formProps)
        const newTaskList: NewTaskListType = {
            name: formProps.name,
            task_type: formProps.task_type.toString(),
            user_id: props.userId,
            time_to_complete: formProps.time_to_complete ? formProps.time_to_complete.format('HH:mm:ss') : undefined,

            descriptions: formProps.descriptions, 
            parent_id: formProps.parent_id ? formProps.parent_id : undefined,
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
                                // onClick={props.showModal}
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

                        // dataSource={getTaskTreeItems(
                        //     props.taskList,
                        //     props.deleteTaskList,
                        //     props.updateTaskList,
                        //     showDrawer,
                        //     setDrawerData,
                        //     initialFormValues,
                        //     setInitialFormValues,
                        //     props.selectedTasks
                        // )}
                        // renderItem={item => <List.Item className="py-0" draggable>{item}</List.Item>}

                        dataSource={props.taskList}
                        renderItem={item => {
                            return (<TaskTreeBrowserItem
                                item={item}
                                showDrawer={showDrawer}
                                setDrawerData={setDrawerData}
                                initialFormValues={initialFormValues}
                                setInitialFormValues={setInitialFormValues}
                                initialValues={initialValues}
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
                            render={NewTaskTreeForm as any}
                            enableReinitialize={true}
                        />

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
                                time: moment()
                            }}
                            onSubmit={runTaskSubmit}
                            render={RunTaskFormCall as any}
                            enableReinitialize={true}
                        />
                    </Modal>

                </Card>
            </div>

        </>
    )
}

export default TasksTreeBrowser