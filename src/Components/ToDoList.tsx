import React, { useState, useEffect } from 'react'
import { Spin, Card, Divider, Tooltip } from 'antd'
import moment from 'moment'
import NewTaskForm from './NewTaskFormContainer'
import ToDoHeader from './ToDoHeaderContainer'
import SettingsModal from './Settings/SettingsModal'
import { TaskType } from './../Types/types'
import { RangeValue, EventValue } from './../Types/types'
import { ToDoListPropsType } from './ToDoListContainer'
import TaskItem from './TimeScale/TaskItem/TaskItem'
import TimeScale from './TimeScale/TimeScaleContainer'

export type OwnToDoListPropsType = {}

const ToDoList: React.FC<ToDoListPropsType> = (props) => {
    const [selectedDate, setSelectedDate] = useState<moment.Moment>(moment())
    const [visible, setVisible] = useState(false)
    const [isAddActive, setIsAddActive] = useState(false)
    // const [timeScaleBlock, setTimeScaleBlock] = useState<Array<React.ReactElement<string>> | null>(null)
    // const [showingMode, setShowingMode] = useState<'date' | 'interval'>('date')
    const [isModalVisible, setIsModalVisible] = useState(false);

    // useEffect(() => {
    //     props.getTaskList(selectedDate.format('YYYY-MM-DD'))
    // }, [selectedDate]);

    const onDateChange = (value: moment.Moment | null, dateString: string): void => {
        console.log('2) onDateChange value:', value)
        if (value !== null) {
            setSelectedDate(value)
            setIsAddActive(false)
        } else {
            setSelectedDate(moment(null))
            setIsAddActive(true)
        }
    }

    const onGapDateChange = (values: RangeValue<moment.Moment>, formatString: [string, string]): void => {
        console.log('onGapDateChange')
        if (values !== null && values[0] !== null && values[1] !== null) {
            props.getTaskListForGap(values[0].format('YYYY-MM-DD'), values[1].format('YYYY-MM-DD'))
        }
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

    // console.log('ToDoList props: ', props)
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

                    <TimeScale />

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