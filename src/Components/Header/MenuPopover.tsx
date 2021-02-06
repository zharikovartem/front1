import { Popover, Icon } from 'antd-mobile'
import React, { useState } from 'react'

const Item = Popover.Item

const MenuPopover: React.FC<any> = (props) => {
    const [visible, setVisible] = useState(false)

    const onSelect = (opt: any, index?: number) => {
        // console.log(opt.props);
        setVisible(false)
        if(opt.props.children === "Logout") {
            props.onLogout()
        }
    }

    const handleVisibleChange = (visible: boolean) => {
        setVisible(visible)
    }

    const fortest:String = "fortest"

    return (
        <div className="mr-3">
        <Popover 
            mask
            visible={visible}
            overlay={[
                (<Item key="1" >Logout</Item>),
                (<Item key="2" >Info</Item>),
                (<Item key="3" >Help</Item>),
            ]}
            onVisibleChange={handleVisibleChange}
            onSelect={onSelect}
        >
            <div style={{
                height: '100%',
                padding: '0 15px',
                marginRight: '-20px',
                display: 'flex',
                alignItems: 'center',
            }}
            >
                <Icon type="ellipsis" />
            </div>
        </Popover>
        </div>
    )
}

export default MenuPopover