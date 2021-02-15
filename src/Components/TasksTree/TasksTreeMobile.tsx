import React, { useState, useEffect } from 'react'
import { TasksTreePropsType, taskTreeTypes } from './TasksTreeContainer'
import { Drawer, List, Button, Card, WingBlank, WhiteSpace } from 'antd-mobile'
import NewTaskTreeForm from './TaskTreeForm/NewTaskTreeForm'
import './TasksTreeMobile.css'
import { Formik } from 'formik'
import moment from "moment"
import { TaskTreeItemMobile } from './TaskTreeItem'

type InitialDrewerDataType = {
    header: string,
    taskId: false | number
}

const initialDrewerData: InitialDrewerDataType = {
    header: 'Create New Task',
    taskId: false
}

const TasksTreeMobile: React.FC<TasksTreePropsType> = (props) => {
    useEffect(() => {
        if (props.taskList && props.taskList.length === 0 && !props.isTaskListLoaded) {
            props.getTaskList()
        } else if (props.taskList === undefined) {
            props.getTaskList()
        }
        setVisible(false)
        setInitialFormValues(initialValues)
    }, [props.taskList])

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

    let initialTimeToComplete = new Date()
    initialTimeToComplete.setHours(0)
    initialTimeToComplete.setMinutes(0)
    initialTimeToComplete.setSeconds(0)
    initialTimeToComplete.setMilliseconds(0)

    const initialValues: any = {
        selectOptions: getSelectOptions(),
        taskTypes: taskTreeTypes,
        task_type: 1,
        time_to_complete: initialTimeToComplete
    }

    const [visible, setVisible] = useState(false)
    const [initialFormValues, setInitialFormValues] = useState(initialValues)
    const [drawerData, setDrawerData] = useState(initialDrewerData)

    const handleSubmit = (formProps: any) => {
        console.log('handleSubmit formProps: ', formProps)
        let formPropsCopy: any = { ...formProps }
        delete formPropsCopy.selectOptions
        delete formPropsCopy.taskTypes
        if (formPropsCopy.time_to_complete !== undefined) {
            const time_to_complete = moment(formPropsCopy.time_to_complete)
            formPropsCopy.time_to_complete = time_to_complete.format('HH:mm:ss')
        }
        if (Array.isArray(formPropsCopy.parent_id)) {
            formPropsCopy.parent_id = formPropsCopy.parent_id[0]
        }

        formPropsCopy.user_id = props.userId

        if (!drawerData.taskId) {
            props.createNewTaskList(formPropsCopy)
        } else {
            props.updateTaskList(formPropsCopy, drawerData.taskId)
        }
    }

    const onAdd = (args: any) => {
        if (props.selectedTasks.length !== 0) {
            setDrawerData({ ...drawerData, taskId: false })
            setInitialFormValues({ ...initialValues, parent_id: [Number(props.selectedTasks[props.selectedTasks.length - 1])] })
        } else {
            setInitialFormValues(initialValues)
        }

        setVisible(!visible)
    }

    const showDrawer = () => {
        setVisible(true)
    }

    const onBack = () => {
        props.backSelectedTasks()
    }

    return (
        <WingBlank size="lg">
            <WhiteSpace size="lg" />
            <Card>
                <Card.Header
                    title={<h4 className="w-100 text-center">Tasks Tree</h4>}
                    extra={
                        <div className="d-flex flex-row">
                            {props.selectedTasks.length > 0 && !visible ?
                                <Button
                                    inline
                                    size="small"
                                    className="mx-3 my-2"
                                    // style={{ marginRight: '4px' }} 
                                    onClick={onBack}
                                    type="primary"
                                >
                                    Back
                                    </Button>
                                :
                                null
                            }
                            <Button
                                inline
                                size="small"
                                className="mx-3 my-2"
                                // style={{ marginRight: '4px' }} 
                                onClick={onAdd}
                                type="primary"
                            >
                                {visible ? 'Close' : 'Add'}
                            </Button>
                        </div>
                    }
                >
                </Card.Header>
                <Drawer
                    className="my-drawer"
                    style={{ minHeight: document.documentElement.clientHeight }}
                    // enableDragHandle
                    contentStyle={{ color: '#A6A6A6', textAlign: 'center', paddingTop: 0, width: "100%" }}
                    sidebar={
                        <div className="mt-4">
                            <Formik
                                initialValues={initialFormValues}
                                onSubmit={handleSubmit}
                                render={NewTaskTreeForm}
                                enableReinitialize={true}
                            />
                        </div>
                    }
                    open={visible}
                    onOpenChange={onAdd}
                >
                    <List>
                        {props.taskList !== undefined ?
                            props.taskList.map((item) => {
                                let parentId: number
                                if (props.selectedTasks.length !== 0) {
                                    parentId = props.selectedTasks[props.selectedTasks.length - 1]
                                    if (item.parent_id === parentId) {
                                        return (
                                            <TaskTreeItemMobile
                                                taskItem={item}
                                                deleteTaskList={props.deleteTaskList}
                                                showDrawer={showDrawer}
                                                setDrawerData={setDrawerData}
                                                initialFormValues={initialFormValues}
                                                setInitialFormValues={setInitialFormValues}
                                                updateTaskList={props.updateTaskList}
                                            />
                                        )
                                    }
                                } else {
                                    if (item.parent_id === null) {
                                        return (
                                            <TaskTreeItemMobile
                                                taskItem={item}
                                                deleteTaskList={props.deleteTaskList}
                                                showDrawer={showDrawer}
                                                setDrawerData={setDrawerData}
                                                initialFormValues={initialFormValues}
                                                setInitialFormValues={setInitialFormValues}
                                                updateTaskList={props.updateTaskList}
                                            />
                                        )
                                    }
                                }

                            })
                            :
                            null
                        }
                    </List>
                </Drawer>
            </Card>
        </WingBlank>
    )
}

export default TasksTreeMobile