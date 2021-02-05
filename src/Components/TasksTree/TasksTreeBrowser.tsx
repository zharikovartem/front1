import { Button, Card, Drawer } from 'antd'
import React, { useEffect, useState} from 'react'
import { TasksTreePropsType } from './TasksTreeContainer'
import { FileAddOutlined, SettingOutlined } from '@ant-design/icons'
import NewTaskTreeForm from './NewTaskTreeForm'
import { Formik, FormikProps } from 'formik'
import moment from "moment"



const TasksTreeBrowser: React.FC<TasksTreePropsType> = (props) => {
    useEffect(() => {
        if (props.taskList !== undefined && props.taskList.length === 0 && !props.isTaskListLoaded) {
            props.getTaskList()
        }
        else if (props.taskList === undefined ) {
            props.getTaskList()
        }
    }, [props.taskList])

    const [visible, setVisible] = useState(false)

    const getSelectOptions = () => {
        if (props.taskList !== undefined && props.taskList.length > 0) {
            return props.taskList.map( (item) => {
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

    const getTaskTreeItems  = (taskList: Array<any>) => {
        if (props.taskList !== undefined && props.taskList.length > 0) {
            return taskList.map( (item) => {
                return(
                    <div key={item.id}>{item.name}</div>
                )
            })
        } else {
            return null
        }
    }

    const onClose = () => {
        setVisible(false)
    }

    const showDrawer = () => {
        setVisible(true)
    }

    const handleSubmit = (formProps: any) => {
        let formPropsCopy:any = {...formProps}
        delete formPropsCopy.selectOptions
        delete formPropsCopy.taskTypes
        if (formPropsCopy.time_to_complete !== undefined) {
            console.log(formPropsCopy.time_to_complete.format('HH:mm:ss'))
            formPropsCopy.time_to_complete = formPropsCopy.time_to_complete.format('HH:mm:ss')
        }
        console.log('NewTaskTreeForm Props: ', formPropsCopy)

        formPropsCopy.user_id = props.userId
        props.createNewTaskList(formPropsCopy)
    }
    
    return(
        <>
            <div className="site-card-border-less-wrapper">
                <Card
                    title={
                        <div className="col-12 col-md-12 col-lg-4">
                        <Button
                            type="primary"
                            shape="round"
                            icon={
                                <div className="d-flex flex-wrap align-content-start">
                                    <FileAddOutlined style={{ fontSize: '18px' }} />
                                    <span className="ml-1" style={{ fontSize: '14px' }}>Add</span>
                                </div>}
                            style={{ marginLeft: 10 }}
                            onClick={showDrawer}
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
                    </div>
                    }
                    bordered={false}
                >

                    { getTaskTreeItems(props.taskList) }

                    <Drawer
                        title={"Create New Task"}
                        placement="right"
                        closable={true}
                        onClose={onClose}
                        visible={visible}
                        width="90%"
                    >

                        <Formik
                            initialValues={initialValues}
                            onSubmit={handleSubmit}
                            render={NewTaskTreeForm}
                        />

                    </Drawer>
                    
                </Card>
            </div>

        </>
    )
}

export default TasksTreeBrowser