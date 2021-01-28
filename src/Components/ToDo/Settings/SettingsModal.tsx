import React from 'react'
import { Modal } from 'antd'

export type OwmSettingsModalPropsType = {
    isModalVisible: boolean,
    handleOk: () => void,
    handleCancel: () => void
}

const SettingsModal = (props:OwmSettingsModalPropsType) => {
    return (
        <Modal title="Task display settings" visible={props.isModalVisible} onOk={props.handleOk} onCancel={props.handleCancel}>
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
        </Modal>
    )
}

export default SettingsModal