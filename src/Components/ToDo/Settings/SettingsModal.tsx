import React from 'react'
import { Modal } from 'antd'

export type OwmSettingsModalPropsType = {
    isModalVisible: boolean,
    handleOk: () => void,
    handleCancel: () => void
}

const settingasExample = {
    ToDo: {
        singlDateView: {
            timeScale: true,
            isCompletedVisible: true
        },
        intervalDateView: {
            timeScale: false,
            isCompletedVisible: true
        }
    }
}

const SettingsModal = (props:OwmSettingsModalPropsType) => {
    console.log(settingasExample)
    return (
        <Modal title="Task display settings" visible={props.isModalVisible} onOk={props.handleOk} onCancel={props.handleCancel}>
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
        </Modal>
    )
}

export default SettingsModal