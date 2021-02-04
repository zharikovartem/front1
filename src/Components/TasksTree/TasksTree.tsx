import React, { useEffect } from 'react'
import { TasksTreePropsType } from './TasksTreeContainer'
import { isMobile } from 'react-device-detect'
import { Card } from 'antd'
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
            <div className="site-card-border-less-wrapper">
                <Card
                    title={
                        // Вывести компонент с возможностью добавления задач
                        // <ToDoHeader
                        //     showDrawer={showDrawer}
                        //     showModal={showModal}
                        // />
                        "Task List Header"
                    }
                    bordered={false}
                >

                    {isMobile ? <TasksTreeMobile /> : showTaskList()}
                    
                </Card>
            </div>

        </>
    )
}

export default TasksTree