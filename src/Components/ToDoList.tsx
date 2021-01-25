import React, { useState } from 'react'
import { Card } from 'antd'
import NewTaskForm from './NewTaskFormContainer'
import ToDoHeader from './ToDoHeaderContainer'
import SettingsModal from './Settings/SettingsModal'
import { ToDoListPropsType } from './ToDoListContainer'
import TimeScale from './TimeScale/TimeScaleContainer'

export type OwnToDoListPropsType = {}

const ToDoList: React.FC<ToDoListPropsType> = (props) => {
    const [visible, setVisible] = useState(false)
    const [isModalVisible, setIsModalVisible] = useState(false);

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
                        showDrawer={showDrawer}
                        showModal={showModal}
                    />}
                    bordered={false}
                >

                    <SettingsModal 
                        isModalVisible={isModalVisible} 
                        handleOk={handleOk} 
                        handleCancel={handleCancel}
                    />

                    <TimeScale />

                </Card>

                <NewTaskForm
                    onClose={onClose}
                    visible={visible}
                    setVisible={setVisible}
                />

            </div>

        </>
    )
}

export default ToDoList