import React, { useState, useEffect } from 'react'
import { DatePicker, Card, Divider, Button, Drawer, Tooltip } from 'antd'
import { FileAddOutlined } from '@ant-design/icons'
import moment from 'moment'
import NewTaskForm from './NewTaskFormContainer'

const ToDoList: React.FC = (props: any) => {
    const [selectedDate, setselectedDate] = useState<moment.Moment>(moment())
    const [visible, setVisible] = useState(false)
    const [isAddActive, setIsAddActive] = useState(false)
    const [timeScaleBlock, setTimeScaleBlock] = useState<Array<React.ReactElement<string>> | null>(null)

    useEffect(() => {
        props.getTaskList(selectedDate.format('YYYY-MM-DD'))
    }, [selectedDate]);

    useEffect(() => {
        let timeScaleArrey: Array<React.ReactElement<string>> = []

        for (let index: number = 0; index < 24; index++) {
            timeScaleArrey.push(
                <Divider key={index} orientation="left">
                    {index <= 9 ? '0' : null}{index}:00
                </Divider>
            )

            if (props.taskList !== null) {
                for (let i = 0; i < props.taskList.length; i++) {
                    const element = props.taskList[i];
                    const timeVal = Number(element.time.split(':', 1))
                    const nextHour = index + 1
                    if (timeVal >= index && timeVal < nextHour) {
                        timeScaleArrey.push(
                            <Tooltip placement="topLeft" title={element.descriptions}>
                                <p>{element.time.split(':', 2).join(':')} - {element.name}</p>
                            </Tooltip>
                        )
                    }
                }
            }
        }

        setTimeScaleBlock(timeScaleArrey);
    }, [props.taskList]);

    const onDateChange = (value: moment.Moment | null, dateString: string): void => {
        if (value !== null) {
            setselectedDate(value)
            setIsAddActive(false)
        } else {
            setselectedDate(moment(null))
            setIsAddActive(true)
        }
    }

    const showDrawer = (): void => {
        setVisible(true);
    }

    const onClose = (): void => {
        setVisible(false);
    }

    // console.log('ToDoList props: ', props)
    return (
        <>
            <div className="site-card-border-less-wrapper">
                <Card
                    title={
                        <>
                            <label>Select date:</label>
                            <DatePicker
                                onChange={onDateChange}
                                defaultValue={selectedDate}
                                format='DD-MM-YYYY'
                                style={{ marginLeft: 10 }}
                            />
                            <Button
                                type="primary"
                                shape="round"
                                icon={<FileAddOutlined />}
                                style={{ marginLeft: 10 }}
                                size="small"
                                onClick={showDrawer}
                                disabled={isAddActive}
                            >
                                Add
                            </Button>
                        </>
                    }
                    bordered={false}
                >
                    {timeScaleBlock}
                </Card>

                <Drawer
                    title={"Create New Task for " + selectedDate.format('DD MMM YYYY')}
                    placement="right"
                    closable={false}
                    onClose={onClose}
                    visible={visible}
                    width="80%"
                >
                    <NewTaskForm selectedDate={selectedDate} />
                </Drawer>
            </div>

        </>
    )
}

export default ToDoList