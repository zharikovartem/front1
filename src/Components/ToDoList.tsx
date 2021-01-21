import React, { useState, useEffect } from 'react'
import { DatePicker, Card, Divider, Button, Drawer, Tooltip } from 'antd'
import moment from 'moment'
import NewTaskForm from './NewTaskFormContainer'
import ToDoHeader from './ToDoHeader'

export type taskType = {
    created_at: string,
    date: string,
    deleted_at: string | null,
    descriptions: string | null,
    id: number,
    name: string,
    order_id: number | null,
    tado_id: number | null, //////////////////////////// Опечатка
    time: string,
    type: string | null,
    updated_at: string | null,
    user_id: number | null
}

const ToDoList: React.FC = (props: any) => {
    const [selectedDate, setselectedDate] = useState<moment.Moment>(moment())
    const [visible, setVisible] = useState(false)
    const [isAddActive, setIsAddActive] = useState(false)
    const [timeScaleBlock, setTimeScaleBlock] = useState<Array<React.ReactElement<string>> | null>(null)

    useEffect(() => {
        props.getTaskList(selectedDate.format('YYYY-MM-DD'))
    }, [selectedDate]);

    useEffect(() => {
        console.log('props in useEffect', props.taskList)
        const getTimeScaleArrey = (taskList:Array<taskType>):Array<React.ReactElement<string>> => {
            let timeScaleArrey: Array<React.ReactElement<string>> = []
            let tomorowTasks: Array<taskType> = []

            const getHeadline = (task:taskType) => {
                return moment(task.date).format('DD-MMMM')
            }

            let headlineDate: string|null = null;

            if (taskList !== null && taskList.length > 0) {
                headlineDate = getHeadline(taskList[0])
                timeScaleArrey.push(
                    <h3>{headlineDate}:</h3>
                )
            }
            console.log('headlineDate: ',headlineDate)

            for (let index: number = 0; index < 24; index++) {
                timeScaleArrey.push(
                    <Divider key={index+'to'+headlineDate} orientation="left">
                        {index <= 9 ? '0' : null}{index}:00
                    </Divider>
                )

                if (taskList !== null) {
                    for (let i = 0; i < taskList.length; i++) {
                        const element: taskType = taskList[i];
                        const timeVal = Number(element.time.split(':', 1))
                        const nextHour = index + 1
                        if (timeVal >= index && timeVal < nextHour) {
                            // console.log(headlineDate)
                            // console.log(element.name,' for ',getHeadline(element.date))
                            // console.log(element.name, getHeadline(element) === headlineDate)
                            if (getHeadline(element) === headlineDate) {
                                timeScaleArrey.push(
                                    <Tooltip key={index+'-'+i} placement="topLeft" title={element.descriptions}>
                                        <p className="ml-5">{element.time.split(':', 2).join(':')} - {element.name} date: {element.date}</p>
                                    </Tooltip>
                                )
                            }
                            else {
                                // console.log('push')
                                tomorowTasks.push(element)
                            }
                        }
                    }
                }
            }
            console.log('tomorowTasks count: ',tomorowTasks.length)
            if (tomorowTasks.length > 0) {
                const nextArr = getTimeScaleArrey(tomorowTasks)
                // console.log('nextArr', nextArr)
                timeScaleArrey = timeScaleArrey.concat(nextArr)
            }
            // else {
            //     return timeScaleArrey
            // }
            // console.log('timeScaleArrey', timeScaleArrey)
            return timeScaleArrey
        }

        setTimeScaleBlock(getTimeScaleArrey(props.taskList));
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
        setselectedDate(value[0])
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