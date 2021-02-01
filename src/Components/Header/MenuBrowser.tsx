import React, {useState} from 'react'
import { Menu } from 'antd';
import {Link} from 'react-router-dom'
import { MailOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons';

const { SubMenu } = Menu;

const MenuBrowser = (props: any) => {
    const [state, setState] = useState<Array<string>>([])
    const handleClick = (e: any | undefined) => {
        // //console.log('click ', e);
        // setState({ current: e.key });
    }

    const getMenuItem = (childs: any):any => {
        // return <Menu.Item key="setting:1">Option 1</Menu.Item>
        const menuItems = childs.map( (item: any) => {
            return (
                <Menu.Item key={item.value}>
                    <Link to={item.value}>{item.label}</Link>
                </Menu.Item>
            )
        })
        return menuItems
    }

    const getSubMenu = () => {
        // //console.log(props.menuData)
        const subMenu = props.menuData.map( (item: any) => {
            // //console.log(item)
            return (
                <SubMenu 
                    key={item.value} 
                    // icon={<MailOutlined />}
                    title={item.label}
                >
                    {getMenuItem(item.children)}
                </SubMenu >
            )
        })
        return subMenu
    }

    return (
        <Menu 
            onClick={handleClick} 
            // selectedKeys={[current]} 
            mode="horizontal"
            theme="dark"
        >
            {getSubMenu()}
        </Menu>
    )
}

export default MenuBrowser