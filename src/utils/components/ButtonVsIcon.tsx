import { Button } from 'antd'
import React from 'react'
import { SettingOutlined } from '@ant-design/icons'

type ownProps = {
    onClick?: ((event: React.MouseEvent<HTMLElement, MouseEvent>) => void) | undefined,
    icon?: React.ReactNode
}
const ButtonVsIcon:React.FC<ownProps> = (props) => {
    return(
        <Button className=""
            type="primary"
            shape="round"
            style={{ marginLeft: 10 }}
            onClick={props.onClick}
            icon={
                <div className="d-flex flex-wrap align-content-start">
                    <SettingOutlined style={{ fontSize: '18px' }} />
                    <span className="ml-1" style={{ fontSize: '14px' }}>Settings</span>
                </div>} 
            />
    )
}

export default ButtonVsIcon