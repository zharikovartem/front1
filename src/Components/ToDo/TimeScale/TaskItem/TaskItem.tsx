import React, { useState } from 'react'
import { Col, Row, Checkbox, Tooltip, Button, Spin } from 'antd'
import { CheckboxChangeEvent } from 'antd/lib/checkbox'
import { ListGroup } from 'react-bootstrap'
import { TaskType } from '../../../../Types/types'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { TaskItemPropsType } from './TaskItemContainer'
import ToDoActionsRouter from '../../ToDoActions/ToDoActionsRouter'

export type OwnTaskItemPropsType = {
    element: TaskType,
    onEdit: (value:any)=>void,
    isReadOnly?: boolean
}

const TaskItem: React.FC<TaskItemPropsType> = (props) => {
    const [checked, setChecked] = useState(props.element.isCompleted)
    const [deleteingInProgess, setDeleteingInProgess] = useState(false)

    const onisCompletedChange = (e: CheckboxChangeEvent) => {
        console.log(props.isReadOnly)
        setChecked(!checked)
        const values = { isCompleted: e.target.checked }
        if (props.element.id) {}
        props.updateTask(values, props.element.id)
    }

    const onEdit = (e: any) => {
        props.onEdit(e)
    }

    const deleteTask: (taskid: number) => void = (taskid) => {
        setDeleteingInProgess(true)
        props.deleteTask(taskid, props.dateInterval.startDate.format('YYYY-MM-DD'), props.dateInterval.endDate.format('YYYY-MM-DD'))
    }

    const disabled = props.isReadOnly ? {disabled: true} : null
    return (
        <ListGroup.Item as="li" action className="" key={props.element.id}>
            <Row className="px-0 ml-0 ml-sm-5">
                <Col className="mx-2">
                    <Checkbox 
                        onChange={onisCompletedChange} 
                        checked={checked}
                        {...disabled}
                        />
                </Col>
                <Col className="mx-2">
                    {props.element.time.split(':', 2).join(':')}
                </Col>
                <Col className="mx-2">
                    <Tooltip key={props.element.id} placement="topLeft" title={props.element.descriptions}>
                        <span
                            style={{ textDecoration: checked ? 'line-through' : '' }}
                        >
                            {props.element.name}
                        </span>
                    </Tooltip>
                </Col>
                { !props.isReadOnly ? 
                <Col className="mr-auto ml-0 mr-sm-2 ml-sm-auto">
                    <ToDoActionsRouter {...props.element}/>
                    <Button
                        type="primary"
                        shape="circle"
                        size="small"
                        style={{ marginLeft: 10 }}
                        onClick={()=>{onEdit(props.element)}}
                        icon={
                            <div className="d-flex flex-wrap align-content-start">
                                <EditOutlined className="ml-1" style={{ fontSize: '14px' }} />
                            </div>
                        }
                    ></Button>

                    {!deleteingInProgess ? 
                    <Button 
                        danger
                        type="primary"
                        shape="circle"
                        size="small"
                        style={{ marginLeft: 10 }}
                        onClick={() => { deleteTask(props.element.id) }}
                        icon={
                            <div className="d-flex flex-wrap align-content-start">
                                <DeleteOutlined className="ml-1" style={{ fontSize: '14px' }} />
                            </div>
                        }
                    />
                    :
                    <Spin key="spin" size="small" />
                    }
                </Col>
                : null }
            </Row>

        </ListGroup.Item>
    )
}

export default TaskItem
