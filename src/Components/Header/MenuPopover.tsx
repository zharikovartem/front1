import { Popover, Icon } from 'antd-mobile'
import React, { useState } from 'react'

const Item = Popover.Item

type MenuPopoverType = {
    onLogout: ()=>void
}

const MenuPopover: React.FC<MenuPopoverType> = (props) => {
    const [visible, setVisible] = useState(false)

    const onSelect = (opt: JSX.Element, index?: number) => {
        setVisible(false)

        switch (opt.props.children) {
            case 'Logout':
                props.onLogout()
                break
        
            default:
                break
        }
    }

    const handleVisibleChange = (visible: boolean) => {
        setVisible(visible)
    }

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