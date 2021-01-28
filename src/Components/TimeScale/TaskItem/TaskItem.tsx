import React, { useState } from 'react'
import { Col, Row, Checkbox, Tooltip, Button, Spin } from 'antd'
import { CheckboxChangeEvent } from 'antd/lib/checkbox'
import { ListGroup } from 'react-bootstrap'
import { TaskType } from '../../../Types/types'
import { DeleteOutlined } from '@ant-design/icons'
import { TaskItemPropsType } from './TaskItemContainer'

export type OwnTaskItemPropsType = {
    element: TaskType
}

const TaskItem: React.FC<TaskItemPropsType> = (props) => {
    type PropsElementType = typeof props.element.type
    const [status, setStetus] = useState<PropsElementType>(props.element.type)
    const [deleteingInProgess, setDeleteingInProgess] = useState(false)

    const onStatusChange = (e: CheckboxChangeEvent) => {
        if (e.target.checked) {
            setStetus('completed')
        } else {
            setStetus('active')
        }
    }

    const deleteTask: (taskid: number) => void = (taskid) => {
        setDeleteingInProgess(true)
        props.deleteTask(taskid, props.dateInterval.startDate.format('YYYY-MM-DD'), props.dateInterval.endDate.format('YYYY-MM-DD'))
    }

    return (
        <ListGroup.Item action className="py-1">
            <Row className="px-0 ml-0 ml-sm-5">
                <Col className="mx-2">
                    <Checkbox onChange={onStatusChange} />
                </Col>
                <Col className="mx-2">
                    {props.element.time.split(':', 2).join(':')}
                </Col>
                <Col className="mx-2">
                    <Tooltip key={props.element.id} placement="topLeft" title={props.element.descriptions}>
                        <span
                            style={{ textDecoration: status === 'completed' ? 'line-through' : '' }}
                            className="text-break"
                        >
                            {props.element.name}
                        </span>
                    </Tooltip>
                </Col>
                <Col className="mr-auto ml-0 mr-sm-2 ml-sm-auto">
                    {!deleteingInProgess ? 
                    <Button className=""
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
            </Row>

        </ListGroup.Item>
    )
}

export default TaskItem
