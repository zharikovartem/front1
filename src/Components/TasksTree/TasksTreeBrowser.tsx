import { Button, Card, Drawer, List, Checkbox, Collapse } from 'antd'
import React, { useEffect, useState } from 'react'
import { TasksTreePropsType } from './TasksTreeContainer'
import { FileAddOutlined, SettingOutlined } from '@ant-design/icons'
import NewTaskTreeForm from './NewTaskTreeForm'
import { Formik, FormikProps } from 'formik'
import moment from "moment"
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'

const { Panel } = Collapse;

type InitialDrewerDataType = {
    header: string,
    taskId: false | number
}

const initialDrewerData: InitialDrewerDataType = {
    header: 'Create New Task',
    taskId: false
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

    const getSelectOptions = () => {
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

    const initialValues: any = {
        selectOptions: getSelectOptions(),
        taskTypes: [
            {
                name: 'Простая задача',
                value: 1
            },
            {
                name: 'Задача с контектом',
                value: 2
            }
        ],
        task_type: 1,
        name: '',
        // new: true

    }

    const [initialFormValues, setInitialFormValues] = useState(initialValues)

    const onClose = () => {
        setVisible(false)
    }

    const showDrawer = () => {
        setVisible(true)
    }

    const onAdd = () => {
        setDrawerData(initialDrewerData)
        setInitialFormValues(initialValues)
        // console.log(initialValues)
        showDrawer()
    }

    const handleSubmit = (formProps: any) => {
        let formPropsCopy: any = { ...formProps }
        delete formPropsCopy.selectOptions
        delete formPropsCopy.taskTypes
        if (formPropsCopy.time_to_complete !== undefined) {
            formPropsCopy.time_to_complete = formPropsCopy.time_to_complete.format('HH:mm:ss')
        }

        formPropsCopy.user_id = props.userId
        if (!drawerData.taskId) {
            props.createNewTaskList(formPropsCopy)
        } else {
            // console.log(formPropsCopy)
            props.updateTaskList(formPropsCopy, drawerData.taskId)
        }

    }

    // console.log('initialFormValues: ', initialFormValues)

    return (
        <>
            <div className="site-card-border-less-wrapper">
                <Card
                    title={
                        <div
                            // className="col-12 col-md-12 col-lg-4"
                            className="inline"
                        >
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

                    {/* { getTaskTreeItems(props.taskList) } */}
                    <List
                        size="small"
                        // header={<h2>Tasks Tree</h2>}
                        // footer={<div>Footer</div>}
                        bordered
                        dataSource={getTaskTreeItems(
                            props.taskList,
                            props.deleteTaskList,
                            showDrawer,
                            setDrawerData,
                            initialFormValues,
                            setInitialFormValues
                        )}

                        renderItem={item => <List.Item draggable>{item}</List.Item>}
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
                            render={NewTaskTreeForm}
                            enableReinitialize={true}
                        />

                    </Drawer>

                </Card>
            </div>

        </>
    )
}

export default TasksTreeBrowser

const getTaskTreeItems = (
    taskList: Array<any>,
    deleteTask: (taskId: number) => void,
    showDrawer: () => void,
    setDrawerData: (drawerData: any) => void,
    initialFormValues: any,
    setInitialFormValues: (initialFormValues: any) => void
) => {
    const onEdit = (task: any) => {
        setDrawerData({
            header: 'Edit: "' + task.name + '"',
            taskId: task.id
        })


        let day = moment().zone('GMT')
        if (task.time_to_complete !== null) {
            const splitTime = task.time_to_complete.split(/:/)
            day.hours(parseInt(splitTime[0])).minutes(parseInt(splitTime[1])).seconds(0).milliseconds(0);
        } else {
            day.hours(0).minutes(0).seconds(0).milliseconds(0);
        }

        setInitialFormValues(
            {
                ...initialFormValues,
                // new: false,
                name: task.name,
                time_to_complete: day,
                descriptions: task.descriptions
            }
        )
        showDrawer()
    }
    if (taskList !== undefined && taskList.length > 0) {
        return taskList.map((item) => {
            return (
                <>
                    <div><Checkbox></Checkbox></div>
                    <div className="w-100 float-left" key={item.id}>
                        <div className="ml-3 float-left">
                            {item.name}
                        </div>
                        <div className="ml-3 float-right">
                            {item.time_to_complete}
                        </div>
                    </div>
                    <div className="d-flex flex-row">
                        <Button className=""
                            type="primary"
                            shape="circle"
                            size="small"
                            style={{ marginLeft: 10 }}
                            onClick={() => { onEdit(item) }}
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
                            onClick={() => { deleteTask(item.id) }}
                            icon={
                                <div className="d-flex flex-wrap align-content-start">
                                    <DeleteOutlined className="ml-1" style={{ fontSize: '14px' }} />
                                </div>
                            }
                        />
                    </div>
                </>
            )
        })
    } else {
        return []
    }
}