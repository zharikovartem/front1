import React, { useState } from 'react'
import { Card } from 'antd'
import NewTaskForm from './NewTaskForm/NewTaskFormContainer'
import ToDoHeader from './ToDoHeader/ToDoHeaderContainer'
import { ToDoListPropsType } from './ToDoListContainer'
import TimeScale from '../TimeScale/TimeScaleContainer'
import { Formik } from 'formik'
import ToDoForm from './ToDoForm/ToDoForm'

import SettingsModal from './Settings/SettingsModalContainer'

export type OwnToDoListPropsType = {}

const ToDoList: React.FC<ToDoListPropsType> = (props) => {
    const [visible, setVisible] = useState(false)
    const [isModalVisible, setIsModalVisible] = useState(false)

    const showDrawer = (): void => {
        setVisible(true)
    }

    const onClose = (): void => {
        setVisible(false)
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
        //console.log('handleSubmit')
    }

    return (
        <>
            <div className="site-card-border-less-wrapper">
                <Card
                    title={<ToDoHeader
                        showDrawer={showDrawer}
                        showModal={showModal}
                    />}
                    bordered={false}
                >

                    {/* <SettingsModal 
                        isModalVisible={isModalVisible} 
                        handleOk={handleOk} 
                        handleCancel={handleCancel}
                    /> */}

                   <TimeScale onEdit={(values: any)=>{}}/>

                </Card>

                {/* <NewTaskForm
                    onClose={onClose}
                    visible={visible}
                    setVisible={setVisible}
                /> */}

                <Formik
                    // initialValues={initialValues}
                    initialValues={{}}
                    onSubmit={handleSubmit}
                    render={ToDoForm}
                />

            </div>

        </>
    )
}

export default ToDoList