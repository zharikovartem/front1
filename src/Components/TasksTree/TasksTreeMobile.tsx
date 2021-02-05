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
    const sidebar = (<List>
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((i, index) => {
            if (index === 0) {
                return (<List.Item key={index}
                    thumb="https://zos.alipayobjects.com/rmsportal/eOZidTabPoEbPeU.png"
                    multipleLine
                >Category</List.Item>);
            }
            return (<List.Item key={index}
                thumb="https://zos.alipayobjects.com/rmsportal/eOZidTabPoEbPeU.png"
            >Category{index}</List.Item>);
        })}
    </List>)

    const handleSubmit = (formProps: any) => {
        let formPropsCopy: any = { ...formProps }
        delete formPropsCopy.selectOptions
        delete formPropsCopy.taskTypes
        if (formPropsCopy.time_to_complete !== undefined) {
            console.log(formPropsCopy.time_to_complete.format('HH:mm:ss'))
            formPropsCopy.time_to_complete = formPropsCopy.time_to_complete.format('HH:mm:ss')
        }
        console.log('NewTaskTreeForm Props: ', formPropsCopy)
        // if (!formProps.remember) {
        //     formProps.remember = false
        // }
        // formPropsCopy.user_id = props.userId
        // props.createNewTaskList(formPropsCopy)
    }

    const onOpenChange = (args: any) => {
        console.log(args);
        setState(!state)
    }

    console.log('TTM props: ', props)

    return (<div>
        <Button
            inline
            // size="small"
            className="m-3"
            // style={{ marginRight: '4px' }} 
            onClick={onOpenChange}
            type="primary">
            Add
        </Button>

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



    </div>)
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