import React, { useEffect, useState } from 'react'
// import { TaskType } from '../../Types/types'
import { TaskType } from './../../../Types/types'
import moment from 'moment'
import { TimeScalePropsType } from './TimeScaleContainer'
import { Divider, Spin, Tooltip, message } from 'antd'
import TaskItem from './TaskItem/TaskItemContainer'
import { sortTaskArrayByParams } from '../../../utils/array-helpers'
import { ListGroup } from 'react-bootstrap'

export type OwnTaskTimeScaleType = {
    onEdit: (value:any)=>void,
    isReadOnly?: boolean
}
const TimeScale: React.FC<TimeScalePropsType> = (props) => {
    type SelestedDatesType = typeof props.dateInterval
    const [selestedDates, setSelectedDates] = useState<SelestedDatesType>({ startDate: moment(null), endDate: moment() })

    useEffect(() => {
        const getTaskList = () => props.getTaskList
        if (
            props.dateInterval.startDate.isSame(selestedDates.startDate.format('YYYY-MM-DD'), "day" ) &&
            props.dateInterval.endDate.isSame(selestedDates.endDate.format('YYYY-MM-DD'), "day" )
        ) { }
        else {
            if (props.dateInterval.startDate !== null) {
                getTaskList()(
                    props.dateInterval.startDate.format('YYYY-MM-DD'),
                    props.dateInterval.endDate.format('YYYY-MM-DD')
                )
                setSelectedDates(props.dateInterval)
            }
        }
    }, [props.dateInterval, props.getTaskList, selestedDates])

    useEffect(() => {
        if (props.errorMessage !== null) {
            message.success(props.errorMessage)
        }
    }, [props.errorMessage])

    if (props.taskList !== undefined) {
        if (props.taskList !== null) {
            return (
                <>
                    {getTimeScaleArrey(props.taskList, props.isInterval, props.onEdit, props.isReadOnly ? props.isReadOnly : false)}
                </>
            )
        } else {
            return (
                <Spin key="spin" size="large" />
            )
        }
    } else {
        return <div>Authorization required to get a list of tasks</div>
    }
    
}

export default TimeScale


const getTimeScaleArrey = (
    taskList: Array<TaskType>, 
    isInterval:boolean, 
    onEdit:(value:any)=>void,
    isReadOnly: boolean
    ):Array<React.ReactElement<string>> => {
    let timeScaleArrey: Array<React.ReactElement<string>> = []
    let tomorowTasks: Array<TaskType> = []

    taskList.sort(sortTaskArrayByParams('time')).sort(sortTaskArrayByParams('date'))

    const getHeadlineLabel = (task: TaskType):string => {
        return moment(task.date).format('D MMMM')
    }

    let headlineDate: string | null = null

    if (taskList !== null && taskList.length > 0) {
        headlineDate = getHeadlineLabel(taskList[0])
        timeScaleArrey.push(
            <h5 
                key={headlineDate}
                className={isInterval ? "text-left" : ""}
            >
                {headlineDate}:
            </h5>
        )
    }

    for (let index: number = 0; index < 24; index++) {
        if (taskList.length > 0) {
            if (!isInterval && index > 7) {
                timeScaleArrey.push(
                    <Divider key={index + 'to' + headlineDate} orientation="left">
                        {index <= 9 ? '0' : null}{index}:00
                    </Divider>
                )
            }
        } else {
            timeScaleArrey.push(<h3 key={'noTasks'+index}>no tasks</h3>)
            break
        }

        if (taskList !== null) {
            for (let i = 0; i < taskList.length; i++) {
                const element: TaskType = taskList[i]
                const timeVal = Number(element.time.split(':', 1))
                const nextHour = index + 1
                if (timeVal >= index && timeVal < nextHour) {
                    if (getHeadlineLabel(element) === headlineDate) {
                        timeScaleArrey.push(
                            <Tooltip key={index + '-' + element.id} placement="topLeft" title={element.descriptions}>
                                <ListGroup as="ul" key={index}>
                                    <TaskItem key={index} element={element} onEdit={onEdit} isReadOnly={isReadOnly}/>
                                </ListGroup>
                            </Tooltip>
                        )
                    }
                    else {
                        tomorowTasks.push(element)
                    }
                }
            }
        }
    }

    if (tomorowTasks.length > 0) {
        timeScaleArrey = timeScaleArrey.concat(getTimeScaleArrey(tomorowTasks, isInterval, onEdit , isReadOnly))
    }

    return timeScaleArrey
}