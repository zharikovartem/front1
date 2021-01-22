import React, { useState, useEffect } from 'react'
import { Spin, Card, Divider, Modal, Tooltip } from 'antd'
import moment from 'moment'
import NewTaskForm from './NewTaskFormContainer'
import ToDoHeader from './ToDoHeader'
import SettingsModal from './Settings/SettingsModal'


export type taskType = {
    created_at: string,
    date: string,
    deleted_at: string | null,
    descriptions: string | null,
    id: number,
    name: string,
    order_id: number | null,
    todo_id: number | null,
    time: string,
    type: string | null,
    updated_at: string | null,
    user_id: number | null
}

const getTimeScaleArrey = (taskList: Array<taskType>): Array<React.ReactElement<string>> => {
    const sortByParams = (field: 'date' | 'time') => {
        if (field === 'date') {
            return (a: taskType, b: taskType) => a['date'] > b['date'] ? 1 : -1;
        } else {
            return (a: taskType, b: taskType) => a['time'] > b['time'] ? -1 : 1;
        }
    }

    taskList.sort(sortByParams('time')).sort(sortByParams('date'))

    let timeScaleArrey: Array<React.ReactElement<string>> = []
    let tomorowTasks: Array<taskType> = []

    const getHeadline = (task: taskType) => {
        return moment(task.date).format('DD MMMM')
    }

    let headlineDate: string | null = null;

    if (taskList !== null && taskList.length > 0) {
        headlineDate = getHeadline(taskList[0])
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
                const element: taskType = taskList[i];
                const timeVal = Number(element.time.split(':', 1))
                const nextHour = index + 1
                if (timeVal >= index && timeVal < nextHour) {
                    if (getHeadline(element) === headlineDate) {
                        timeScaleArrey.push(
                            <Tooltip key={index + '-' + element.id} placement="topLeft" title={element.descriptions}>
                                <p className="ml-5">{element.time.split(':', 2).join(':')} - {element.name} date: {element.date}; id=<b>{element.id}</b></p>
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

const ToDoList: React.FC = (props: any) => {
    const [selectedDate, setSelectedDate] = useState<moment.Moment>(moment())
    const [visible, setVisible] = useState(false)
    const [isAddActive, setIsAddActive] = useState(false)
    const [timeScaleBlock, setTimeScaleBlock] = useState<Array<React.ReactElement<string>> | null>(null)
    const [showingMode, setShowingMode] = useState<'date' | 'interval'>('date')
    const [isModalVisible, setIsModalVisible] = useState(false);

    useEffect(() => {
        console.log('selectedDate changet to ', selectedDate.format('YYYY-MM-DD'))
        props.getTaskList(selectedDate.format('YYYY-MM-DD'))
    }, [selectedDate]);

    useEffect(() => {
        if (props.taskList !== null) {
            console.log('1) props in useEffect taskList:', props.taskList)
            setTimeScaleBlock(getTimeScaleArrey(props.taskList))
        } else {
            setTimeScaleBlock([<Spin key="spin" size="large" />])
        }
    }, [props.taskList]);

    const onDateChange = (value: moment.Moment | null, dateString: string): void => {
        console.log('2) onDateChange value:', value)
        if (value !== null) {
            setTimeScaleBlock([<Spin key="spin" size="large" />])
            setSelectedDate(value)
            setIsAddActive(false)
        } else {
            setSelectedDate(moment(null))
            setIsAddActive(true)
        }
    }

    const onGapDateChange = (value: Array<moment.Moment>): void => {
        console.log('3) onGapDateChange value', value)
        setTimeScaleBlock([<Spin key="spin" size="large" />])
        // console.log(selectedDate === value[0])
        // setSelectedDate(value[0])
        props.getTaskListForGap(value[0].format('YYYY-MM-DD'), value[1].format('YYYY-MM-DD'))
    }

    const showDrawer = (): void => {
        setVisible(true);
    }

    const onClose = (): void => {
        setVisible(false);
    }

    const showModal = () => {
        setIsModalVisible(true);
      };
    
      const handleOk = () => {
        setIsModalVisible(false);
      };
    
      const handleCancel = () => {
        setIsModalVisible(false);
      };

    return (
        <>
            <div className="site-card-border-less-wrapper">
                <Card
                    title={<ToDoHeader
                        onDateChange={onDateChange}
                        getTaskList={props.getTaskList}
                        selectedDate={selectedDate}
                        setSelectedDate={setSelectedDate}
                        showDrawer={showDrawer}
                        isAddActive={isAddActive}
                        onGapDateChange={onGapDateChange}
                        showModal={showModal}
                    />}
                    bordered={false}
                >

                    <SettingsModal isModalVisible={isModalVisible} handleOk={handleOk} handleCancel={handleCancel}>
                        <p>Some contents...</p>
                        <p>Some contents...</p>
                        <p>Some contents...</p>
                    </SettingsModal>

                    {timeScaleBlock}

                </Card>

                <NewTaskForm
                    selectedDate={selectedDate}
                    onClose={onClose}
                    visible={visible}
                    setVisible={setVisible}
                // setSelectedDate={setSelectedDate}
                />

            </div>

        </>
    )
}

export default ToDoList