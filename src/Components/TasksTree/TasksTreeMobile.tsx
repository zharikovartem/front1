import React, { useState, useEffect } from 'react'
import { TasksTreePropsType, taskTreeTypes } from './TasksTreeContainer'
import { Drawer, List, Button, Card, WingBlank, WhiteSpace } from 'antd-mobile'
import NewTaskTreeForm from './TaskTreeForm/NewTaskTreeForm'
import './TasksTreeMobile.css'
import { Formik } from 'formik'
import { TaskTreeItemMobile } from './TaskTreeMobileItem'
import { NewTimeByString } from '../../utils/Date/NewDeteByString'
import { NewTaskListType, TaskListType } from '../../Types/types'

export type InitialDrewerDataType = {
    header: string,
    taskId: false | number
}

const initialDrewerData: InitialDrewerDataType = {
    header: 'Tasks Tree',
    taskId: false
}

type SelectOptionType = {
    name: string,
    value: number
}

export type InitialValuesType = {
    selectOptions: Array<SelectOptionType> | null,
    taskTypes: typeof taskTreeTypes,
    task_type: Array<number>,
    name?: string,
    descriptions?: string
    parent_id?: number
    time_to_complete?: Date
}

const getInitialValues = ( taskList: Array<TaskListType> ):InitialValuesType => {
    return (
        {
            selectOptions: getSelectOptions(taskList),
            taskTypes: taskTreeTypes,
            task_type: [1],
            time_to_complete: initialTimeToComplete,
        }
    )
}

let initialTimeToComplete = NewTimeByString()

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

const TasksTreeMobile: React.FC<TasksTreePropsType> = (props) => {
    useEffect(() => {
        const getTaskList = () => props.getTaskList
        if (props.taskList && props.taskList.length === 0 && !props.isTaskListLoaded) {
            getTaskList()()
        } else if (props.taskList === undefined) {
            getTaskList()()
        }
        setVisible(false)
        setInitialFormValues( getInitialValues(props.taskList) )
    }, [ props.taskList, props.getTaskList, props.isTaskListLoaded ])

    const [visible, setVisible] = useState(false)
    const [initialFormValues, setInitialFormValues] = useState(getInitialValues(props.taskList))
    const [drawerData, setDrawerData] = useState(initialDrewerData)

    const handleSubmit = (formProps: InitialValuesType) => {
        const newTaskList: NewTaskListType = {
            name: formProps.name,
            task_type: formProps.taskTypes[0].value?.toString(),
            descriptions: formProps.descriptions, 
            user_id: props.userId,
            parent_id: formProps.parent_id ? formProps.parent_id : undefined,
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
            setInitialFormValues({ ...getInitialValues(props.taskList), parent_id: Number(props.selectedTasks[props.selectedTasks.length - 1]) })
        } else {
            setInitialFormValues({...getInitialValues(props.taskList), parent_id: initialFormValues.parent_id })
        }

        setVisible(!visible)
    }

    const showDrawer = () => {
        setVisible(true)
    }

    const onBack = () => {
        if (props.selectedTasks.length > 1) {
            const taskId = props.selectedTasks[props.selectedTasks.length-2]
            const taskName = props.taskList.filter( item => item.id === taskId)[0].name
            setDrawerData({ header: taskName, taskId: taskId })
        } else {
            setDrawerData({ header: 'Task Tree', taskId: false })
        }
        props.backSelectedTasks()
    }

    return (
        <WingBlank size="lg">
            <WhiteSpace size="lg" />
            <Card>
                <Card.Header
                    title={
                        drawerData.header === 'Tasks Tree' ?
                        <h5 className="w-100 text-center">{drawerData.header}</h5>
                        :
                        <h5>{drawerData.header}</h5>
                    }
                    extra={
                        <div className="d-flex flex-row">
                            {props.selectedTasks.length > 0 && !visible ?
                                <Button
                                    inline
                                    size="small"
                                    className="mx-3 my-2"
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
                    contentStyle={{ color: '#A6A6A6', textAlign: 'center', paddingTop: 0, width: "100%" }}
                    sidebar={
                        <div className="mt-4">
                            <Formik
                                initialValues={initialFormValues}
                                onSubmit={handleSubmit}
                                enableReinitialize={true}
                            >
                                {NewTaskTreeForm}
                            </Formik>
                        </div>
                    }
                    open={visible}
                    onOpenChange={onAdd}
                >
                    <List>
                        {props.taskList !== undefined ?
                            props.taskList
                            .map((item: TaskListType) => {
                                let parentId: number
                                if (props.selectedTasks.length !== 0) {
                                    parentId = props.selectedTasks[props.selectedTasks.length - 1]
                                    if (item.parent_id === parentId) {
                                        return (
                                            <TaskTreeItemMobile
                                                key={item.id.toString()}
                                                taskItem={item}
                                                deleteTaskList={props.deleteTaskList}
                                                showDrawer={showDrawer}
                                                setDrawerData={setDrawerData}
                                                initialFormValues={initialFormValues}
                                                setInitialFormValues={setInitialFormValues}
                                                updateTaskList={props.updateTaskList}
                                            />
                                        )
                                    } else {
                                        return null
                                    }
                                } else {
                                    if (item.parent_id === null) {
                                        return (
                                            <TaskTreeItemMobile
                                                key={item.id.toString()}
                                                taskItem={item}
                                                deleteTaskList={props.deleteTaskList}
                                                showDrawer={showDrawer}
                                                setDrawerData={setDrawerData}
                                                initialFormValues={initialFormValues}
                                                setInitialFormValues={setInitialFormValues}
                                                updateTaskList={props.updateTaskList}
                                            />
                                        )
                                    } else {
                                        return null
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