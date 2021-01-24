import React, { useEffect, useState } from 'react'
import { TaskType } from '../../Types/types'
import moment from 'moment'
import { TimeScalePropsType } from './TimeScaleContainer'
import { Divider, Spin, Tooltip, message } from 'antd'
import TaskItem from './TaskItem/TaskItemContainer'


// const compareMoments

export type OwnTaskTimeScaleType = {}
const TimeScale: React.FC<TimeScalePropsType> = (props) => {
    type SelestedDatesType = typeof props.dateInterval
    const [selestedDates, setSelectedDates] = useState<SelestedDatesType>({ startDate: moment(null), endDate: moment() })
    useEffect(() => {
        // console.log('dateInterval in TimeScale: ', props)
        if (
            props.dateInterval.startDate.format('YYYY-MM-DD') === selestedDates.startDate.format('YYYY-MM-DD') &&
            props.dateInterval.endDate.format('YYYY-MM-DD') === selestedDates.endDate.format('YYYY-MM-DD')
        ) {
            // console.log('startDate', props.dateInterval.startDate.format('DD'), ' === ', selestedDates.startDate.format('DD'))
            // console.log('endDate', props.dateInterval.endDate.format('DD'), ' === ', selestedDates.endDate.format('DD'))
        } else {
            // console.log('startDate', props.dateInterval.startDate.format('DD'), ' !== ', selestedDates.startDate.format('DD'))
            // console.log('endDate', props.dateInterval.endDate.format('DD'), ' !== ', selestedDates.endDate.format('DD'))
            if (props.dateInterval.startDate !== null && props.dateInterval.startDate !== null) {
                console.log(props.dateInterval.startDate.format('YYYY-MM-DD'),' - ', props.dateInterval.endDate.format('YYYY-MM-DD'))
                props.getTaskListForGap(
                    props.dateInterval.startDate.format('YYYY-MM-DD'), 
                    props.dateInterval.endDate.format('YYYY-MM-DD')
                )
                setSelectedDates(props.dateInterval)
            }
        }
    }, [props.dateInterval]);

    useEffect(() => {
        if (props.errorMessage !== null) {
            message.success(props.errorMessage);
        }
    }, [props.errorMessage])

    if (props.taskList !== null) {
        return (
            <>
                {props.taskListIsFetching ? <Spin key="spin" size="large" /> : null}
                {getTimeScaleArrey(props.taskList)}
            </>
        )
    } else {
        return (
            <Spin key="spin" size="large" />
        )
    }
}

export default TimeScale


const getTimeScaleArrey = (taskList: Array<TaskType>): Array<React.ReactElement<string>> => {
    const sortByParams = (field: 'date' | 'time') => {
        if (field === 'date') {
            return (a: TaskType, b: TaskType) => a['date'] > b['date'] ? 1 : -1;
        } else {
            return (a: TaskType, b: TaskType) => a['time'] > b['time'] ? -1 : 1;
        }
    }

    taskList.sort(sortByParams('time')).sort(sortByParams('date'))

    let timeScaleArrey: Array<React.ReactElement<string>> = []
    let tomorowTasks: Array<TaskType> = []

    const getHeadlineLabel = (task: TaskType) => {
        return moment(task.date).format('DD MMMM')
    }

    let headlineDate: string | null = null;

    if (taskList !== null && taskList.length > 0) {
        headlineDate = getHeadlineLabel(taskList[0])
        timeScaleArrey.push(
            <h3 key={headlineDate + 'title'}>{headlineDate}:</h3>
        )
    }

    for (let index: number = 0; index < 24; index++) {
        if (taskList.length > 0) {
            timeScaleArrey.push(
                <Divider key={index + 'to' + headlineDate} orientation="left">
                    {index <= 9 ? '0' : null}{index}:00
                </Divider>
            )
        } else {
            timeScaleArrey.push(<h3>no tasks</h3>)
            break
        }

        if (taskList !== null) {
            for (let i = 0; i < taskList.length; i++) {
                const element: TaskType = taskList[i];
                const timeVal = Number(element.time.split(':', 1))
                const nextHour = index + 1
                if (timeVal >= index && timeVal < nextHour) {
                    if (getHeadlineLabel(element) === headlineDate) {
                        timeScaleArrey.push(
                            <Tooltip key={index + '-' + element.id} placement="topLeft" title={element.descriptions}>
                                <TaskItem element={element} />
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
        timeScaleArrey = timeScaleArrey.concat(getTimeScaleArrey(tomorowTasks))
    }

    return timeScaleArrey
}