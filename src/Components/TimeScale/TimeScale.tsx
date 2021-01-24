import React from 'react'
import { TaskType } from '../../Types/types'
import moment from 'moment'
import { TimeScalePropsType } from './TimeScaleContainer'

const getHeadlineDate = (task: TaskType) => {
    return moment(task.date).format('DD MMMM')
}

export type OwnTaskTimeScaleType = {}
const TimeScale: React.FC<TimeScalePropsType> = (props) => {

    let headlineDate: string | null = null;

    return (
        <>
            TimeScale
        </>
    )
}

export default TimeScale