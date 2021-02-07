import React, { useState, useEffect } from 'react'
import { TasksTreePropsType } from './TasksTreeContainer'
import { Drawer, List, SwipeAction, Icon, Button, Card, WingBlank, WhiteSpace } from 'antd-mobile'
import NewTaskTreeForm from './NewTaskTreeForm'
import './TasksTreeMobile.css'
import { Formik } from 'formik'
import { Spin, Empty } from 'antd'
import { propTypes } from 'react-bootstrap/esm/Image'
import moment from "moment"

const Item = List.Item

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
        if (props.taskList.length === 0 && !props.isTaskListLoaded) {
            props.getTaskList()
        }
        setVisible(false)
        console.log('initialValues: ', initialValues)
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
            //console.log('вернули пыстой список', props.taskList)
            return null
        }
    }

    const initialValues: any = {
        selectOptions: getSelectOptions(),
        taskTypes: [
            {
                name: 'Простая задача',
                value: 'soft'
            },
            {
                name: 'Задача с контектом',
                value: 'context'
            }
        ],
        task_type: 'soft'
    }

    const [visible, setVisible] = useState(false)
    const [initialFormValues, setInitialFormValues] = useState(initialValues)
    const [drawerData, setDrawerData] = useState(initialDrewerData)

    const handleSubmit = (formProps: any) => {
        //console.log('formProps submit: ', formProps)
        let formPropsCopy: any = { ...formProps }
        delete formPropsCopy.selectOptions
        delete formPropsCopy.taskTypes
        if (formPropsCopy.time_to_complete !== undefined) {
            //console.log(formPropsCopy.time_to_complete.format('HH:mm:ss'))
            formPropsCopy.time_to_complete = formPropsCopy.time_to_complete.format('HH:mm:ss')
        }
        //console.log('NewTaskMobile submit: ', formPropsCopy)

        formPropsCopy.user_id = props.userId
        props.createNewTaskList(formPropsCopy)
        setInitialFormValues(initialValues)
    }

    const onOpenChange = (args: any) => {
        //console.log(args);
        setVisible(!visible)
    }

    const showDrawer = () => {
        setVisible(true)
    }

    console.log('TasksTreeMobile props: ', props)
    console.log('TasksTreeMobile name: ', initialFormValues.name)

    // if (props.taskList !== undefined) {
        return (
            <WingBlank size="lg">
            <WhiteSpace size="lg" />
            <Card>

                <div 
                    // className="d-flex justify-content-end"
                >
                <Card.Header
                    title={<h4 className="w-100 text-center">Tasks Tree</h4>}
                    extra = {
                                <Button
                                    inline
                                    size="small"
                                    className="mx-3 my-2"
                                    // style={{ marginRight: '4px' }} 
                                    onClick={onOpenChange}
                                    type="primary"
                                >
                                    Add
                                </Button>
                            }
                >
                    
                </Card.Header>
                </div>

                <Drawer
                    className="my-drawer"
                    style={{ minHeight: document.documentElement.clientHeight }}
                    enableDragHandle
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
                    onOpenChange={onOpenChange}
                >
                    <List
                    // renderHeader={() => 'taskList'}
                    >
                        {getTaskTreeItems(
                                            props.taskList, 
                                            props.deleteTaskList,
                                            showDrawer,
                                            setDrawerData,
                                            initialFormValues,
                                            setInitialFormValues
                                        )
                        }
                    </List>
                </Drawer>



            </Card>
            </WingBlank>
        )
    // } else {
    //     return <Spin key="spin" size="large" />
    // }
}

export default TasksTreeMobile

const getTaskTreeItems = (
        taskList: Array<any>, 
        deleteTaskList:(taskId:number)=>void,
        showDrawer: () => void,
        setDrawerData: (drawerData: any) => void,
        initialFormValues: any,
        setInitialFormValues: (initialFormValues: any) => void
    ) => {
    const onEdit = (task: any) => {
        console.log(task)

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

    if (taskList.length > 0) {
        return taskList.map((item) => {
            //console.log('!!!!!!!')
            return (
                <SwipeAction
                    style={{ backgroundColor: 'gray' }}
                    autoClose
                    right={[
                        {
                            text: 'Cancel',
                            onPress: () => console.log('cancel'),
                            style: { backgroundColor: '#ddd', color: 'white' },
                        },
                        {
                            text: 'Delete',
                            onPress: () => deleteTaskList(item.id),
                            style: { backgroundColor: '#F4333C', color: 'white' },
                        },
                    ]}
                    left={[
                        {
                            text: 'Edit',
                            onPress: () => {onEdit(item)},
                            style: { backgroundColor: '#108ee9', color: 'white' },
                        },
                        {
                            text: 'Cancel',
                            onPress: () => console.log('cancel'),
                            style: { backgroundColor: '#ddd', color: 'white' },
                        },
                    ]}
                    // onOpen={() => console.log('global open')}
                    // onClose={() => console.log('global close')}
                >
                    <Item
                        // className="my-3"
                        onClick={() => console.log('List.Item clicked!')}
                        arrow="horizontal"
                        key={item.id}
                    >
                        {item.name}
                    </Item>

                </SwipeAction>
            )
        })
    } else {
        return(
            <Empty />
        )
    }


}