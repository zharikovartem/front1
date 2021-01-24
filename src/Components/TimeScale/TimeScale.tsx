import React, {useEffect} from 'react'
import { TaskType } from '../../Types/types'
import moment from 'moment'
import { TimeScalePropsType } from './TimeScaleContainer'
import { Divider, Spin, Tooltip } from 'antd'
import TaskItem from './TaskItem/TaskItemContainer'

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
        timeScaleArrey.push(
            <Divider key={index + 'to' + headlineDate} orientation="left">
                {index <= 9 ? '0' : null}{index}:00
            </Divider>
        )

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


export type OwnTaskTimeScaleType = {}
const TimeScale: React.FC<TimeScalePropsType> = (props) => {

    useEffect(() => {
        if (props.dateInterval.startDate !== null && props.dateInterval.startDate !== null) {
            props.getTaskListForGap(props.dateInterval.startDate.format('YYYY-MM-DD'), props.dateInterval.endDate.format('YYYY-MM-DD'))
        }
        
    }, [props.dateInterval]);

    if (props.taskList !== null) {
        return (
            <>
                {!props.taskListIsFetching ? getTimeScaleArrey(props.taskList) : <Spin key="spin" size="large" />}
            </>
        )
    } else {
        return (
            <Spin key="spin" size="large" />
        )
    }
}

export default TimeScale