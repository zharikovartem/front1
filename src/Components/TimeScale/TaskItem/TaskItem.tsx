import React, { useState } from 'react'
import { Col, Row, Checkbox, Tooltip } from 'antd'
import { CheckboxChangeEvent } from 'antd/lib/checkbox'
import { ListGroup } from 'react-bootstrap'
import { TaskType } from '../../../Types/types'

export type OwnTaskItemPropsType = {
    element: TaskType
}

const TaskItem: React.FC<OwnTaskItemPropsType> = (props) => {
    const [status, setStetus] = useState(props.element.type)

    const onStatusChange = (e: CheckboxChangeEvent) => {
        console.log(e.target.checked)
        if (e.target.checked) {
            setStetus('completed')
        } else {
            setStetus('active')
        }

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
            </Row>

        </ListGroup.Item>
    )
}

export default TaskItem