import React, { useState, useEffect } from 'react'
import { TasksTreePropsType, taskTreeTypes } from './TasksTreeContainer'
import { Drawer, List, Button, Card, WingBlank, WhiteSpace } from 'antd-mobile'
import NewTaskTreeForm from './TaskTreeForm/NewTaskTreeForm'
import './TasksTreeMobile.css'
import { Formik } from 'formik'
import { TaskTreeItemMobile } from './TaskTreeMobileItem'
import { NewTimeByString } from '../../utils/Date/NewDeteByString'
import { NewTaskListType } from '../../Types/types'

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

    let initialTimeToComplete = NewTimeByString()

    type SelectOptionType = {
        name: string,
        value: number
    }

    type InitialValuesType = {
        selectOptions: Array<SelectOptionType> | null,
        taskTypes: typeof taskTreeTypes,
        task_type: Array<number>,
        name?: string,
        descriptions?: string
        parent_id?: Array<number>
        time_to_complete?: Date
    }

    const initialValues: InitialValuesType = {
        selectOptions: getSelectOptions(),
        taskTypes: taskTreeTypes,
        task_type: [1],
        time_to_complete: initialTimeToComplete,
        // name: 'empty'
    }

    const [visible, setVisible] = useState(false)
    const [initialFormValues, setInitialFormValues] = useState(initialValues)
    const [drawerData, setDrawerData] = useState(initialDrewerData)

    const handleSubmit = (formProps: InitialValuesType) => {
        const newTaskList: NewTaskListType = {
            name: formProps.name,
            task_type: formProps.taskTypes[0].value?.toString(),
            descriptions: formProps.descriptions, 
            user_id: props.userId,
            parent_id: formProps.parent_id ? formProps.parent_id[0] : undefined,
            time_to_complete: formProps.time_to_complete ? formProps.time_to_complete.toTimeString().split(' ')[0] : undefined,
        }

        if (!drawerData.taskId) {
            props.createNewTaskList(newTaskList)
        } else {
            props.updateTaskList(newTaskList, drawerData.taskId)
        }
    }

    const onAdd = () => {
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

    console.log('initialFormValues', initialFormValues)

    return (
        <WingBlank size="lg">
            <WhiteSpace size="lg" />
            <Card>
                <Card.Header
                    className="sticky-top bg-white"
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
                                render={NewTaskTreeForm as any}
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