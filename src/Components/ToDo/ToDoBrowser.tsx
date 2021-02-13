import { Card, Drawer } from 'antd'
import React, { useEffect, useState } from 'react'
import ToDoHeaderContainer from './ToDoHeader/ToDoHeaderContainer'
import TimeScale from '../TimeScale/TimeScaleContainer'
import { Formik } from 'formik'
import ToDoForm from './ToDoForm/ToDoForm'
import moment from "moment"
import { ToDoListPropsType } from './ToDoContainer'
import { NewTaskDataType, TaskType } from '../../Types/types'

type InitialDrewerDataType = {
    header: string,
    taskId: false | number
}

const initialDrewerData: InitialDrewerDataType = {
    header: 'Create New Task',
    taskId: false
}

const zeroTime = moment()
zeroTime.hours(0)
zeroTime.minutes(0)
zeroTime.seconds(0)
zeroTime.milliseconds(0)

type InitialValuesType = {
    name: string,
    time: moment.Moment,
    date: moment.Moment,
    descriptions: string | null 
}

const initialValues: InitialValuesType = {
    name: '',
    time: zeroTime,
    date: moment(),
    descriptions: ''

}

const ToDoBrowser: React.FC<ToDoListPropsType> = (props) => {
    const [visible, setVisible] = useState(false)
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [drawerData, setDrawerData] = useState(initialDrewerData)
    const [initialFormValues, setInitialFormValues] = useState(initialValues)

    useEffect(() => {
        if (props.taskList === null) {
            props.getTaskList(props.dateInterval.startDate.format('YYYY-MM-DD'), props.dateInterval.endDate.format('YYYY-MM-DD'))
        }
    }, [props.getTaskList])

    const onTaskEdit = (value: TaskType) => {
        setDrawerData({
            header: 'Edite "'+value.name+'"',
            taskId: value.id
        })

        const splitTime = value.time.split(/:/)

        setInitialFormValues({
            name: value.name,
            time: moment().hours( Number(splitTime[0]) ).minutes( Number(splitTime[1]) ).seconds(0),
            date: moment(value.date),
            descriptions: value.descriptions ? value.descriptions : null
        })
        
        showDrawer()
    }

    const showDrawer = (): void => {
        setVisible(true)
    }

    const onClose = (): void => {
        setInitialFormValues({...initialValues})
        setDrawerData({...initialDrewerData})
        setVisible(false)
    }

    const showModal = () => {
        setIsModalVisible(true)
    }

    const handleOk = () => {
        setIsModalVisible(false)
    }

    const handleSubmit = (values: InitialValuesType) => {
        let formProps: NewTaskDataType = { 
                ...values,
                time: values.time.format('HH:mm:ss'),
                date: values.date.format('YYYY-MM-DD'),
                user_id: props.userId,
            }
        if (!drawerData.taskId) {
            props.createNewTask(formProps, true)
        } else {
            props.updateTask(formProps, drawerData.taskId)
        }
        onClose()
    }

    return (
        <Card
            title={ <ToDoHeaderContainer 
                        showDrawer={showDrawer} 
                        showModal={showModal}
                    />}
            bordered={false}
        >
            <TimeScale onEdit={onTaskEdit}/>
            <Drawer
                title={drawerData.header}
                placement="right"
                closable={true}
                onClose={onClose}
                visible={visible}
                width="90%"
            >
                <Formik
                    initialValues={initialFormValues}
                    onSubmit={handleSubmit}
                    render={ToDoForm as any}
                    enableReinitialize={true}
                />
            </Drawer>
        </Card>
    )
}

export default ToDoBrowser