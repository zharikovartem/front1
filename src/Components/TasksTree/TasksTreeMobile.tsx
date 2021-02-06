import React, { useState, useEffect } from 'react'
import { TasksTreePropsType } from './TasksTreeContainer'
import { Drawer, List, SwipeAction, Icon, Button } from 'antd-mobile'
import NewTaskTreeForm from './NewTaskTreeForm'
import './TasksTreeMobile.css'
import { Formik } from 'formik'
import { Spin } from 'antd'

const Item = List.Item

const TasksTreeMobile: React.FC<TasksTreePropsType> = (props) => {
    useEffect(() => {
        if (props.taskList.length === 0 && !props.isTaskListLoaded) {
            props.getTaskList()
        }
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
            console.log('вернули пыстой список', props.taskList)
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
    const [state, setState] = useState(false)

    const handleSubmit = (formProps: any) => {
        console.log('formProps submit: ', formProps)
        let formPropsCopy: any = { ...formProps }
        delete formPropsCopy.selectOptions
        delete formPropsCopy.taskTypes
        if (formPropsCopy.time_to_complete !== undefined) {
            console.log(formPropsCopy.time_to_complete.format('HH:mm:ss'))
            formPropsCopy.time_to_complete = formPropsCopy.time_to_complete.format('HH:mm:ss')
        }
        console.log('NewTaskMobile submit: ', formPropsCopy)

        formPropsCopy.user_id = props.userId
        props.createNewTaskList(formPropsCopy)
    }

    const onOpenChange = (args: any) => {
        console.log(args);
        setState(!state)
    }

    console.log('TTM props: ', props)

    if (props.taskList.length > 0) {
        return (
            <div>
                <div className="d-flex justify-content-end">

                    <Button
                        inline
                        size="small"
                        className="mx-3 my-2"
                        // style={{ marginRight: '4px' }} 
                        onClick={onOpenChange}
                        type="primary">
                        Add
                </Button>
                </div>

                <Drawer
                    className="my-drawer"
                    style={{ minHeight: document.documentElement.clientHeight }}
                    enableDragHandle
                    contentStyle={{ color: '#A6A6A6', textAlign: 'center', paddingTop: 0, width: "100%" }}
                    sidebar={
                        <div className="mt-4">
                            <Formik
                                initialValues={initialValues}
                                onSubmit={handleSubmit}
                                render={NewTaskTreeForm}
                            />
                        </div>
                    }
                    open={state}
                    onOpenChange={onOpenChange}
                >
                    <List
                    // renderHeader={() => 'taskList'}
                    >
                        {getTaskTreeItems(props.taskList)}
                    </List>
                </Drawer>



            </div>
        )
    } else {
        return <Spin key="spin" size="large" />
    }
}

export default TasksTreeMobile

const getTaskTreeItems = (taskList: Array<any>) => {
    if (taskList.length > 0) {
        return taskList.map((item) => {
            console.log('!!!!!!!')
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
                            onPress: () => console.log('delete'),
                            style: { backgroundColor: '#F4333C', color: 'white' },
                        },
                    ]}
                    left={[
                        {
                            text: 'Reply',
                            onPress: () => console.log('reply'),
                            style: { backgroundColor: '#108ee9', color: 'white' },
                        },
                        {
                            text: 'Cancel',
                            onPress: () => console.log('cancel'),
                            style: { backgroundColor: '#ddd', color: 'white' },
                        },
                    ]}
                    onOpen={() => console.log('global open')}
                    onClose={() => console.log('global close')}
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
        return <Spin key="spin" size="large" />
    }


}