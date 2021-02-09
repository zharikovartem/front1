import React, { useState } from 'react'
import { Card } from 'antd'
import NewTaskForm from './ToDo/NewTaskForm/NewTaskFormContainer'
import ToDoHeader from './ToDo/ToDoHeader/ToDoHeaderContainer'
import SettingsModal from './ToDo/Settings/SettingsModal'
import { ToDoListPropsType } from './ToDoListContainer'
import TimeScale from './TimeScale/TimeScaleContainer'
import { Formik } from 'formik'
import ToDoForm from './ToDo/ToDoForm/ToDoForm'

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
        console.log('handleSubmit')
    }

    return (
        <>
            <div className="site-card-border-less-wrapper">
                2545564654546
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

                <div>!!!!!!!!!!!!</div>

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