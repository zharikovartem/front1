import React, { useState, useEffect } from 'react'
import { TasksTreePropsType } from './TasksTreeContainer'
import { Drawer, List, NavBar, Icon, Button } from 'antd-mobile'
import NewTaskTreeForm from './NewTaskTreeForm'
import './TasksTreeMobile.css'
import { Formik } from 'formik'

const Item = List.Item

const TasksTreeMobile: React.FC<TasksTreePropsType> = (props) => {
    useEffect(() => {
        if (props.taskList.length === 0 && !props.isTaskListLoaded) {
            props.getTaskList()
        }
    }, [props.taskList])
    const getSelectOptions = () => {
        return props.taskList.map((item) => {
            return ({
                name: item.name,
                value: item.id
            })
        })
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
            size="small"
            className="mx-3"
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
    return taskList.map((item) => {
        console.log('!!!!!!!')
        return (
            <Item 
                className="my-3" 
                key={item.id}
            >
                {item.name}
            </Item>
        )
    })
}