import React from 'react'
import { Modal } from 'antd'

const SettingsModal = (props:any) => {
    // console.log('SettingsModal props', props)
    return (
        <Modal title="Basic Modal" visible={props.isModalVisible} onOk={props.handleOk} onCancel={props.handleCancel}>
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
        </Modal>
    )
}

export default SettingsModal