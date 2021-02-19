import { List, Card, Drawer, WhiteSpace, WingBlank, SwipeAction } from 'antd-mobile'
import { Formik } from 'formik'
import React, { useEffect, useState } from 'react'
import SettingsModal from './Settings/SettingsModalContainer'
import ToDoHeader from './ToDoHeader/ToDoHeaderContainer'
import { ToDoListPropsType } from './ToDoContainer'
import ToDoForm from './ToDoForm/ToDoForm'
import moment from 'moment'
import { TaskType, TimeScaleSettingsType, NewTaskDataType } from '../../Types/types'
import { Divider, Empty } from 'antd'
import { NewTimeByString } from '../../utils/Date/NewDeteByString'

type InitialDrewerDataType = {
    header: string,
    taskId: false | number
}

const initialDrewerData: InitialDrewerDataType = {
    header: 'Create New Task',
    taskId: false
}
const zeroTime = NewTimeByString()

type InitialValuesType = {
    name: string,
    time: Date,
    date: Date,
    descriptions: string | null
}

const initialValues: InitialValuesType = {
    name: '',
    time: zeroTime,
    date: new Date(),
    descriptions: ''
}

const ToDoMobile: React.FC<ToDoListPropsType> = (props) => {
    useEffect(() => {
        if (props.taskList === null) {
            props.getTaskList(props.dateInterval.startDate.format('YYYY-MM-DD'), props.dateInterval.endDate.format('YYYY-MM-DD'))
        }
    }, [props])

    useEffect(() => {
        const getTaskList = () => props.getTaskList
        getTaskList()(props.dateInterval.startDate.format('YYYY-MM-DD'), props.dateInterval.endDate.format('YYYY-MM-DD'))
    }, [props.dateInterval, props.getTaskList])

    useEffect(() => {
        if (props.isInterval) {
            setIsTimeScaleVisible(props.viewSettings.ToDo.timeScaleInrerval)
        } else {
            setIsTimeScaleVisible(props.viewSettings.ToDo.timeScaleSingle)
        }
    }, [props.isInterval, props.viewSettings])

    const [visible, setVisible] = useState(false)
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [drawerData, setDrawerData] = useState<InitialDrewerDataType>(initialDrewerData)
    const [isTimeScaleVisible, setIsTimeScaleVisible] = useState<TimeScaleSettingsType>(props.viewSettings.ToDo.timeScaleSingle)
    const [initialFormValues, setInitialFormValues] = useState<InitialValuesType>(initialValues)

    const showDrawer = (): void => {
        if (visible) {
            setInitialFormValues(initialValues)
        }
        setVisible(!visible)
    }

    const showModal = () => {
        setIsModalVisible(true)
    }

    const handleOk = () => {
        setIsModalVisible(false)
    }

    const handleCancel = () => {
        setIsModalVisible(false)
    }

    const handleSubmit = (values: InitialValuesType) => {
        let formPropsCopy: NewTaskDataType = {
            ...values,
            time: moment(values.time).format('HH:mm:ss'),
            date: moment(values.date).format('YYYY-MM-DD'),
            user_id: props.userId,
        }

        if (!drawerData.taskId) {
            props.createNewTask(formPropsCopy, true)
        } else {
            props.updateTask(formPropsCopy, drawerData.taskId)
        }
        showDrawer()
    }

    const onComplete = (task: TaskType) => {
        const updatedTask: NewTaskDataType = {
            ...task as NewTaskDataType,
            isCompleted: !task.isCompleted
        }
        props.updateTask(updatedTask, task.id)
    }

    if (props.taskList !== null) {
        return (
            <WingBlank size="lg">
                <WhiteSpace size="lg" />
                <Card>
                    <Card.Header
                        title={<ToDoHeader
                            showDrawer={showDrawer}
                            showModal={showModal}
                            isOpen={visible}
                        />}
                    >
                    </Card.Header>

                    <SettingsModal
                        isModalVisible={isModalVisible}
                        handleOk={handleOk}
                        handleCancel={handleCancel}
                    />

                    <Drawer
                        className="my-drawer"
                        style={{ minHeight: document.documentElement.clientHeight }}
                        contentStyle={{ color: '#A6A6A6', textAlign: 'center', paddingTop: 0, width: "100%" }}
                        sidebar={
                            <div className="mt-4">
                                <Formik
                                    initialValues={initialFormValues}
                                    onSubmit={handleSubmit}
                                    render={ToDoForm as any}
                                    enableReinitialize={true}
                                />
                            </div>
                        }
                        open={visible}
                    >
                        <List>
                            {
                                isTimeScaleVisible ?
                                    <TimeScale
                                        taskList={props.taskList}
                                        dateInterval={props.dateInterval}
                                        deleteTask={props.deleteTask}
                                        setDrawerData={setDrawerData}
                                        setInitialFormValues={setInitialFormValues}
                                        showDrawer={showDrawer}
                                        onComplete={onComplete}
                                    />
                                    :
                                    <TasksOnly
                                        taskList={props.taskList}
                                        dateInterval={props.dateInterval}
                                        deleteTask={props.deleteTask}
                                        setDrawerData={setDrawerData}
                                        setInitialFormValues={setInitialFormValues}
                                        showDrawer={showDrawer}
                                        onComplete={onComplete}
                                    />
                            }
                        </List>

                    </Drawer>
                </Card>
            </WingBlank>
        )
    } else {
        return <Empty />
    }
}

export default ToDoMobile

type TaskItemMobileType = {
    element: TaskType,
    dateInterval: {
        startDate: moment.Moment;
        endDate: moment.Moment;
    },
    deleteTask: (taskid: number, startDate: string, endDate: string) => void,
    setDrawerData: React.Dispatch<React.SetStateAction<InitialDrewerDataType>>,
    setInitialFormValues: React.Dispatch<React.SetStateAction<InitialValuesType>>,
    showDrawer: () => void,
    onComplete: (values: TaskType) => void,
}

const TaskItemMobile: React.FC<TaskItemMobileType> = (props) => {

    const onEdit = (value: TaskType) => {
        props.setDrawerData({
            header: 'Edite "' + value.name + '"',
            taskId: value.id
        })

        let time = NewTimeByString(value.time)
        // let date = NewTimeByString(value.date)

        const splitDate = value.date.split(/-/)
        let date = new Date()
        date.setFullYear(parseInt(splitDate[0]))
        date.setMinutes(parseInt(splitDate[1]))
        date.setDate(parseInt(splitDate[2]))

        props.setInitialFormValues({
            name: value.name,
            time: time,
            date: date,
            descriptions: value.descriptions ? value.descriptions : null
        })

        props.showDrawer()
    }

    return (
        <SwipeAction
            key={props.element.id}
            style={{ backgroundColor: 'gray' }}
            autoClose
            right={[
                {
                    text: 'Delete',
                    onPress: () => props.deleteTask(
                        props.element.id,
                        props.dateInterval.startDate.format('YYYY-MM-DD'),
                        props.dateInterval.endDate.format('YYYY-MM-DD')
                    ),
                    style: { backgroundColor: '#F4333C', color: 'white' },
                },
            ]}
            left={[
                {
                    text: 'Edit',
                    onPress: () => { onEdit(props.element) },
                    style: { backgroundColor: '#108ee9', color: 'white' },
                },
                {
                    text: props.element.isCompleted ? 'Not Done' : 'Done',
                    onPress: () => props.onComplete(props.element),
                    style: { backgroundColor: 'green', color: 'white' },
                },
            ]}
        >

            <List.Item
                key={props.element.id.toString()}
                wrap
            >
                <div className="w-100 row " key={props.element.id.toString()}>
                    <div className="col-2 ">
                        <span className="ml-3">{props.element.time.split(/:/)[0] + ':' + props.element.time.split(/:/)[1]}</span>
                    </div>
                    <div className="col-10">
                        {props.element.isCompleted ?
                            <span className="text-black-50 text-break ml-3">{props.element.name}</span>
                            :
                            <span className="text-break ml-3">{props.element.name}</span>
                        }
                    </div>
                </div>
            </List.Item>
        </SwipeAction>
    )
}

type TimeScaleType = {
    taskList: Array<TaskType> | null
    dateInterval: {
        startDate: moment.Moment,
        endDate: moment.Moment,
    },
    deleteTask: (taskid: number, startDate: string, endDate: string) => void,
    setDrawerData: React.Dispatch<React.SetStateAction<InitialDrewerDataType>>,
    setInitialFormValues: React.Dispatch<React.SetStateAction<InitialValuesType>>,
    showDrawer: () => void,
    onComplete: (values: TaskType) => void,
}
const TimeScale: React.FC<TimeScaleType> = (props) => {
    let startDate = moment(props.dateInterval.startDate)

    let dateArrey: Array<moment.Moment> = []

    while (moment(startDate.format('YYYY-MM-DD')).isSameOrBefore(moment(props.dateInterval.endDate.format('YYYY-MM-DD')))) {
        dateArrey.push(moment(startDate))
        startDate.add(1, 'days')
    }

    const getTasksForHour = (date: string, hour: number) => {
        let tasksForHour: Array<JSX.Element | undefined> = []
        if (props.taskList !== null) {
            tasksForHour = props.taskList
                .filter((item: TaskType) => {
                    return item.date === date && moment().hours(hour).format('HH') === item.time.split(':')[0]
                })
                .map((item: TaskType) => {
                    return (
                        <TaskItemMobile
                            key={item.id.toString()}
                            element={item}
                            dateInterval={props.dateInterval}
                            deleteTask={props.deleteTask}
                            setDrawerData={props.setDrawerData}
                            setInitialFormValues={props.setInitialFormValues}
                            showDrawer={props.showDrawer}
                            onComplete={props.onComplete}
                        />
                    )
                })
        }
        return tasksForHour

    }

    const getHours = (headlineDate: string) => {
        let hours: Array<JSX.Element | undefined> = []
        for (let index = 0; index < 24; index++) {
            hours.push(
                <div key={index + 'div'}>
                    <Divider key={index + 'to' + headlineDate} orientation="left">
                        {index <= 9 ? '0' : null}{index}:00
                    </Divider>
                    {getTasksForHour(headlineDate, index)}
                </div>
            )
        }
        return hours
    }

    return (
        <>
            {
                dateArrey.map((date: moment.Moment) => {
                    return (
                        <div key={date.format('DD MMMM') + 'divBlock'}>
                            <h3 key={date.format('DD MMMM') + 'dateHeader'}>{date.format('DD MMMM')}</h3>
                            {getHours(date.format('YYYY-MM-DD'))}
                        </div>
                    )
                })
            }
        </>
    )
}

const TasksOnly: React.FC<TimeScaleType> = (props) => {
    const startDate = moment(props.dateInterval.startDate)
    let dateArrey: Array<moment.Moment> = []
    while (moment(startDate.format('YYYY-MM-DD')).isSameOrBefore(moment(props.dateInterval.endDate.format('YYYY-MM-DD')))) {
        dateArrey.push(moment(startDate))
        startDate.add(1, 'days')
    }

    return (
        <>
            {dateArrey.map((date: moment.Moment) => {
                return (
                    <div key={date.format('DD MMMM')}>
                        <h3>{date.format('DD MMMM')}</h3>
                        {props.taskList?.map((task: TaskType) => {
                            if (task.date === date.format('YYYY-MM-DD')) {
                                return <TaskItemMobile
                                    key={task.id.toString()}
                                    element={task}
                                    dateInterval={props.dateInterval}
                                    deleteTask={props.deleteTask}
                                    setDrawerData={props.setDrawerData}
                                    showDrawer={props.showDrawer}
                                    setInitialFormValues={props.setInitialFormValues}
                                    onComplete={props.onComplete}
                                />
                            } else return null
                        })}
                    </div>
                    // </div>
                )
            })}
        </>
    )
}