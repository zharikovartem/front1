import React, { useState, useEffect } from 'react'
import { DatePicker, Card, Divider, Button, Drawer, Tooltip } from 'antd'
import moment from 'moment'
import NewTaskForm from './NewTaskFormContainer'
import ToDoHeader from './ToDoHeader'

const ToDoList: React.FC = (props: any) => {
    const [selectedDate, setselectedDate] = useState<moment.Moment>(moment())
    const [visible, setVisible] = useState(false)
    const [isAddActive, setIsAddActive] = useState(false)
    const [timeScaleBlock, setTimeScaleBlock] = useState<Array<React.ReactElement<string>> | null>(null)

    useEffect(() => {
        props.getTaskList(selectedDate.format('YYYY-MM-DD'))
    }, [selectedDate]);

    useEffect(() => {
        const getTimeScaleArrey = ():Array<React.ReactElement<string>> => {
            let timeScaleArrey: Array<React.ReactElement<string>> = []
            if (props.taskList !== null) {
                timeScaleArrey.push(
                    <h3>{moment(props.taskList[0].date).format('DD-MMMM')}:</h3>
                )
            }

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
                                <Tooltip key={index+'-'+i} placement="topLeft" title={element.descriptions}>
                                    <p className="ml-5">{element.time.split(':', 2).join(':')} - {element.name}</p>
                                </Tooltip>
                            )
                        }
                    }
                }
            }
            return timeScaleArrey
        }

        setTimeScaleBlock(getTimeScaleArrey());
    }, [props.taskList]);

    const onDateChange = (value: moment.Moment | null, dateString: string): void => {
        console.log('onDateChange value:', value)
        if (value !== null) {
            setselectedDate(value)
            setIsAddActive(false)
        } else {
            setselectedDate(moment(null))
            setIsAddActive(true)
        }
    }

    const onGapDateChange = (value: Array<moment.Moment> ): void => {
        console.log('onGapDateChange value', value)
        props.getTaskListForGap(value[0].format('YYYY-MM-DD'), value[1].format('YYYY-MM-DD'))
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
                    title={ <ToDoHeader onDateChange={onDateChange} selectedDate={selectedDate} showDrawer={showDrawer} isAddActive={isAddActive} onGapDateChange={onGapDateChange} />}
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