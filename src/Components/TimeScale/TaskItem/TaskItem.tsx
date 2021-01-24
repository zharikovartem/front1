import React, { useState } from 'react'
import { Col, Row, Checkbox, Tooltip, Button } from 'antd'
import { CheckboxChangeEvent } from 'antd/lib/checkbox'
import { ListGroup } from 'react-bootstrap'
import { TaskType } from '../../../Types/types'
import { DeleteOutlined } from '@ant-design/icons'
import { TaskItemPropsType } from './TaskItemContainer'

export type OwnTaskItemPropsType = {
    element: TaskType
}

const TaskItem: React.FC<TaskItemPropsType> = (props) => {
    const [status, setStetus] = useState(props.element.type)

    const onStatusChange = (e: CheckboxChangeEvent) => {
        console.log(e.target.checked)
        if (e.target.checked) {
            setStetus('completed')
        } else {
            setStetus('active')
        }
    }

    const deleteTask: (taskid: number) => void = (taskid) => {
        console.log(taskid)
        props.deleteTask(taskid)
    }

    return (
        <ListGroup.Item action className="py-1">
            <Row>
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
                        >
                            {props.element.name}
                        </span>
                    </Tooltip>
                </Col>
                <Col className="mr-0 ml-auto">
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
                </Col>
            </Row>

        </ListGroup.Item>
    )
}

export default TaskItem
