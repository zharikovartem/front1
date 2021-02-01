import React, { useEffect, useState } from 'react'
import { TasksTreePropsType } from './TasksTreeContainer'
import { isMobile } from 'react-device-detect'
import { DatePicker, Checkbox, Button } from 'antd'
import { FileAddOutlined, SettingOutlined } from '@ant-design/icons'
import TasksTreeMobile from './TasksTreeMobile'

export type OwnTasksTreePropsType = {}

const TasksTree: React.FC<TasksTreePropsType> = (props) => {
    useEffect(() => {
        if (props.taskList.length === 0) {
            props.getTaskList()
        }
    }, [props.taskList])

    const showTaskList = () => {
        return props.taskList.map((item) => {
            return (
                <div>{item.name}</div>
            )
        })
    }

    return (
        <>
            {/* <div className="col-12 col-md-12 col-lg-4">
                <Button className=""
                    type="primary"
                    shape="round"
                    style={{ marginLeft: 10 }}
                    // onClick={props.showDrawer}
                    icon={
                        <div className="d-flex flex-wrap align-content-start">
                            <SettingOutlined style={{ fontSize: '18px' }} />
                            <span className="ml-1" style={{ fontSize: '14px' }}>Add</span>
                        </div>} 
                />
            </div> */}

            {isMobile ? <TasksTreeMobile /> : showTaskList()}
        </>
    )
}

export default TasksTree