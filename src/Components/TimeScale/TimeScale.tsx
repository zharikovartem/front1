import React, { useEffect, useState } from 'react'
import { TaskType } from '../../Types/types'
import moment from 'moment'
import { TimeScalePropsType } from './TimeScaleContainer'
import { Divider, Spin, Tooltip, message } from 'antd'
import TaskItem from './TaskItem/TaskItemContainer'
import { sortTaskArrayByParams } from '../../utils/array-helpers'

export type OwnTaskTimeScaleType = {
    onEdit: (value:any)=>void
}
const TimeScale: React.FC<TimeScalePropsType> = (props) => {
    type SelestedDatesType = typeof props.dateInterval
    const [selestedDates, setSelectedDates] = useState<SelestedDatesType>({ startDate: moment(null), endDate: moment() })
    // const [isInterval, setIsInterval] = useState(
    //     props.dateInterval.startDate.format('YYYY-MM-DD') === props.dateInterval.endDate.format('YYYY-MM-DD') ? false : true
    //     )
    useEffect(() => {
        if (
            props.dateInterval.startDate.isSame(selestedDates.startDate.format('YYYY-MM-DD'), "day" ) &&
            props.dateInterval.endDate.isSame(selestedDates.endDate.format('YYYY-MM-DD'), "day" )
        ) { }
        else {
            if (props.dateInterval.startDate !== null) {
                props.getTaskList(
                    props.dateInterval.startDate.format('YYYY-MM-DD'),
                    props.dateInterval.endDate.format('YYYY-MM-DD')
                )
                setSelectedDates(props.dateInterval)
            }
        }
    }, [props.dateInterval])

    useEffect(() => {
        if (props.errorMessage !== null) {
            message.success(props.errorMessage)
        }
    }, [props.errorMessage])
    
    console.log('view settings: ',props.settings.ToDo)

    if (props.taskList !== undefined) {
        if (props.taskList !== null) {
            return (
                <>
                    {getTimeScaleArrey(props.taskList, props.isInterval, props.onEdit)}
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


const getTimeScaleArrey = (taskList: Array<TaskType>, isInterval:boolean, onEdit:(value:any)=>void): Array<React.ReactElement<string>> => {
    let timeScaleArrey: Array<React.ReactElement<string>> = []
    let tomorowTasks: Array<TaskType> = []

    //console.log('isInterval: ', isInterval)

    taskList.sort(sortTaskArrayByParams('time')).sort(sortTaskArrayByParams('date'))

    const getHeadlineLabel = (task: TaskType) => {
        return moment(task.date).format('D MMMM')
    }

    let headlineDate: string | null = null

    if (taskList !== null && taskList.length > 0) {
        headlineDate = getHeadlineLabel(taskList[0])
        timeScaleArrey.push(
            <h5 
                key={headlineDate + 'title'}
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
            timeScaleArrey.push(<h3 key="noTasks">no tasks</h3>)
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
                                <TaskItem element={element} onEdit={onEdit}/>
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
        timeScaleArrey = timeScaleArrey.concat(getTimeScaleArrey(tomorowTasks, isInterval, onEdit))
    }

    return timeScaleArrey
}