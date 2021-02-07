import React, {useState} from 'react'
import { Card, Modal } from 'antd'
import { SettingsModalPropsType } from './SettingsModalContainer'

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

export type OwmSettingsModalPropsType = {
    isModalVisible: boolean,
    handleOk: () => void,
    handleCancel: () => void
}



const SettingsModal = (props:any) => {

    // console.log( JSON.parse(props.viewSettings) )
    const [settings, setSettings] = useState(props.viewSettings)

    let settingsBlock: Array<any> = []

    for (const propName in settings.ToDo) {
        if (Object.prototype.hasOwnProperty.call(settings.ToDo, propName)) {
            const element = settings.ToDo[propName]
            console.log(propName, element)
            settingsBlock.push(<FormItem title={propName} data={element}/>)
        }
    }

    return (
        <Modal title="Task display settings" visible={props.isModalVisible} onOk={props.handleOk} onCancel={props.handleCancel}>
            {settingsBlock}
        </Modal>
    )
}

export default SettingsModal

const FormItem: React.FC<any> = (props) => {
    let settingsItem: Array<any> = []
    for (const propName in props.data) {
        if (Object.prototype.hasOwnProperty.call(props.data, propName)) {
            const element = props.data[propName]
            settingsItem.push(<div>{propName} = {element ? 'yes' : 'no'}</div>)
        }
    }

    return(
        <Card title={props.title} extra={<a href="#">More</a>} >
            {settingsItem}
        </Card>
    )
}