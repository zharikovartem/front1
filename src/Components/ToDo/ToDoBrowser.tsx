import { Button, Card, Drawer } from 'antd'
import React, { useEffect, useState } from 'react'
import { ToDoListPropsType } from '../ToDoListContainer'
import { FileAddOutlined, SettingOutlined } from '@ant-design/icons'
import ToDoHeaderContainer from './ToDoHeader/ToDoHeaderContainer'
import { List } from 'antd/lib/form/Form'
import TimeScale from '../TimeScale/TimeScaleContainer'
import SettingsModal from './Settings/SettingsModalContainer'
import { Formik } from 'formik'
import ToDoForm from './ToDoForm/ToDoForm'
import moment from "moment"

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
    name: string | null,
    time: moment.Moment,
    date: moment.Moment,
    descriptions: string | null 

}
const initialValues: any = {
    name: '',
    time: zeroTime,
    date: moment(),
    descriptions: ''

}

const ToDoBrowser: React.FC<any> = (props) => {
    const [visible, setVisible] = useState(false)
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [drawerData, setDrawerData] = useState(initialDrewerData)
    const [initialFormValues, setInitialFormValues] = useState(initialValues)

    useEffect(() => {
        if (props.taskList === null) {
            props.getTaskList(props.dateInterval.startDate.format('YYYY-MM-DD'), props.dateInterval.endDate.format('YYYY-MM-DD'))
        }
    }, [props.getTaskList])
    useEffect(() => {
        //console.log('useEffect')
    }, [initialFormValues])

    const onTaskEdit = (value:any) => {
        //console.log('onTaskEdit: ', value)
        setDrawerData({
            header: 'Edite "'+value.name+'"',
            taskId: value.id
        })

        const splitTime = value.time.split(/:/)

        setInitialFormValues({
            name: value.name,
            time: moment().hours(splitTime[0]).minutes(splitTime[1]).seconds(0),
            date: moment(value.date),
            descriptions: value.descriptions ? value.descriptions : null
        })
        
        showDrawer()
    }

    const showDrawer = (): void => {
        //console.log('drawerData', drawerData)
        if (!drawerData.taskId) {
            //console.log('empty')
        }
        //console.log(initialFormValues)
        setVisible(true)
    }

    const onClose = (): void => {
        //console.log('onClose')

        setInitialFormValues(null)
        setInitialFormValues({...initialValues})

        setDrawerData({...initialDrewerData})
        setVisible(false)
        //console.log('drawerData: ', drawerData)
    }

    const showModal = () => {
        setIsModalVisible(true)
    }
    const onAdd = () => {
        // setDrawerData(initialDrewerData)
        // setInitialFormValues(initialValues)
        // showDrawer()
    }

    const handleOk = () => {
        setIsModalVisible(false)
    }

    const handleCancel = () => {
        setIsModalVisible(false)
    }

    const handleSubmit = (formProps: any) => {
        let formPropsCopy: any = { ...formProps }
        // delete formPropsCopy.selectOptions
        // delete formPropsCopy.taskTypes
        if (formPropsCopy.time !== undefined) {
            formPropsCopy.time = formPropsCopy.time.format('HH:mm:ss')
        }
        if (formPropsCopy.date !== undefined) {
            formPropsCopy.date = formPropsCopy.date.format('YYYY-MM-DD')
        }

        formPropsCopy.user_id = props.userId
        //console.log('handleSubmit', formPropsCopy)
        if (!drawerData.taskId) {
            props.createNewTask(formPropsCopy, true)
        } else {
        //     //console.log(formPropsCopy)
            props.updateTask(formPropsCopy, drawerData.taskId)
        }
        // setInitialFormValues({...initialValues})
        onClose()
    }

    //console.log('ToDoBrowser initialFormValues: ', initialFormValues)

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
                    // initialValues={{}}
                    onSubmit={handleSubmit}
                    render={ToDoForm}
                    enableReinitialize={true}
                />

            </Drawer>

        </Card>
    )
}

export default ToDoBrowser