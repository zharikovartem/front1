import { List, Card, Drawer, WhiteSpace, WingBlank, SwipeAction } from 'antd-mobile'
import { Formik } from 'formik'
import React, { useEffect, useState } from 'react'
import SettingsModal from './Settings/SettingsModalContainer'
import ToDoHeader from './ToDoHeader/ToDoHeaderContainer'
import { ToDoListPropsType } from './ToDoListContainer'
import ToDoForm from './ToDoForm/ToDoForm'
// import TimeScale from './../TimeScale/TimeScaleContainer'
import TaskItem from './../TimeScale/TaskItem/TaskItemContainer'
import { useDispatch } from 'react-redux'
import moment from 'moment'
import { TaskType } from '../../Types/types'
import { Divider } from 'antd'


const ToDoMobile: React.FC<ToDoListPropsType> = (props) => {
    useEffect(() => {
        // console.log('useEffect')
        if (props.taskList === null) {
            props.getTaskList(props.dateInterval.startDate.format('YYYY-MM-DD'), props.dateInterval.endDate.format('YYYY-MM-DD'))
        }
    }, [props.taskList])

    useEffect(() => {
        props.getTaskList(props.dateInterval.startDate.format('YYYY-MM-DD'), props.dateInterval.endDate.format('YYYY-MM-DD'))
    }, [props.dateInterval])

    useEffect(() => {
        if (props.isInterval) {
            setIsTimeScaleVisible(props.viewSettings.ToDo.timeScaleInrerval)
        } else {
            setIsTimeScaleVisible(props.viewSettings.ToDo.timeScaleSingle)
        }
        console.log('useEffect.isTimeScaleVisible=', props.viewSettings.ToDo.timeScaleSingle)
    }, [props.isInterval, props.viewSettings])

    const [visible, setVisible] = useState(false)
    const [isModalVisible, setIsModalVisible] = useState(false)
    // const [initialFormValues, setInitialFormValues] = useState()
    const [isTimeScaleVisible, setIsTimeScaleVisible] = useState(props.viewSettings.ToDo.timeScaleSingle)

    const showDrawer = (): void => {
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

    const handleSubmit = (values: any) => {
        console.log('handleSubmit')
    }

    const onAdd = (args: any) => {
        console.log('on add')
        setVisible(!visible)
    }

    console.log('ToDoMobile: ', props.taskList)

    if (props.taskList !== null) {
        return (
            <WingBlank size="lg">
                <WhiteSpace size="lg" />
                <Card>
                    <Card.Header
                        title={<ToDoHeader
                            showDrawer={showDrawer}
                            showModal={showModal}
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
                        // enableDragHandle
                        contentStyle={{ color: '#A6A6A6', textAlign: 'center', paddingTop: 0, width: "100%" }}
                        sidebar={
                            <div className="mt-4">
                                <Formik
                                    // initialValues={initialFormValues}
                                    initialValues={{}}
                                    onSubmit={handleSubmit}
                                    render={ToDoForm}
                                />
                            </div>
                        }
                        open={visible}
                        onOpenChange={onAdd}
                    >
                        <List>
                            {
                                isTimeScaleVisible ?
                                    <TimeScale taskList={props.taskList} dateInterval={props.dateInterval} />
                                    :
                                    <TasksOnly taskList={props.taskList} dateInterval={props.dateInterval} />
                            }
                        </List>

                    </Drawer>
                </Card>
            </WingBlank>
        )
    } else {
        return <div>null</div>
    }
}

export default ToDoMobile

const TaskItemMobile: React.FC<any> = (props) => {

    const dispatch = useDispatch()

    const onSubTask = () => { }
    const onEdit = () => { }

    const onItemOpen = () => {
        // dispatch(actions.setSelectedTasks(props.element.id));
    }

    const onComplet = () => { }
    // console.log(props)
    return (
        <SwipeAction
            style={{ backgroundColor: 'gray' }}
            autoClose
            right={[
                // {
                //     text: 'SubTask',
                //     onPress: () => { onSubTask() },
                //     style: { backgroundColor: 'green', color: 'white' },
                // },
                {
                    text: 'Delete',
                    // onPress: () => props.deleteTaskList(props.element.id),
                    style: { backgroundColor: '#F4333C', color: 'white' },
                },
            ]}
            left={[
                {
                    text: 'Edit',
                    onPress: () => { onEdit() },
                    style: { backgroundColor: '#108ee9', color: 'white' },
                },
                {
                    text: props.element.isCompleted ? 'Not Done' : 'Done',
                    onPress: () => onComplet(),
                    style: { backgroundColor: 'green', color: 'white' },
                },
            ]}
        // onOpen={() => console.log('global open')}
        // onClose={() => console.log('global close')}
        >

            <List.Item
                onClick={onItemOpen}
                key={props.element.id}
                wrap
            >
                <div className="w-100 row " key={props.element.id}>
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
    }
}
const TimeScale: React.FC<TimeScaleType> = (props) => {
    const [startHour, setStartHour] = useState<number>(0)

    let startDate = moment(props.dateInterval.startDate)
    // startDate.add(-2, 'days')

    // console.log( moment(startDate.format('YYYY-MM-DD')).isSameOrBefore( moment(props.dateInterval.endDate.format('YYYY-MM-DD')) ) )
    // console.log( startDate.isAfter(props.dateInterval.endDate) )

    let dateArrey: any = []

    // console.log('startDate: ', startDate.format('YYYY-MM-DD'))
    // console.log('endDate: ', props.dateInterval.endDate.format('YYYY-MM-DD'))
    // console.log('startDate props: ', props.dateInterval.startDate.format('YYYY-MM-DD'))



    while (moment(startDate.format('YYYY-MM-DD')).isSameOrBefore(moment(props.dateInterval.endDate.format('YYYY-MM-DD')))) {
        // console.log('1')
        dateArrey.push(moment(startDate))
        startDate.add(1, 'days')
    }
    // console.log(dateArrey)

    const getTasksForHour = (date: string, hour: number) => {
        let tasksForHour: Array<any> = []
        if (props.taskList !== null) {
            tasksForHour = props.taskList.map(item => {
                if (item.date === date) {
                    let itemTime = item.time.split(':')[0]
                    // console.log(moment().hours(hour).format('HH'), ' === ', itemTime, moment().hours(hour).format('HH') === itemTime)
                    if (moment().hours(hour).format('HH') === itemTime) {
                        return <TaskItemMobile element={item} />
                    }
                }
            })
        }
        // console.log(tasksForHour)
        return tasksForHour

    }

    const getHours = (headlineDate: string) => {
        let hours: any = []
        for (let index = 8; index < 24; index++) {
            hours.push(
                <>
                    <Divider key={index + 'to' + headlineDate} orientation="left">
                        {index <= 9 ? '0' : null}{index}:00
                </Divider>
                    {getTasksForHour(headlineDate, index)}
                </>
            )
        }
        return hours
    }

    return (
        <>
            {
                dateArrey.map((date: moment.Moment) => {
                    return (
                        <>
                            <h3>{date.format('DD MMMM')}</h3>
                            {getHours(date.format('YYYY-MM-DD'))}
                        </>
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
                    <>
                        <h3>{date.format('DD MMMM')}</h3>
                        {props.taskList?.map(task => {
                            if (task.date === date.format('YYYY-MM-DD')) {
                                return <TaskItemMobile element={task} />
                            }
                        })}
                    </>
                )
            })}
        </>
    )
}