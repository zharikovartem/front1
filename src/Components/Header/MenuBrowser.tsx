import React, {useState} from 'react'
import { Button, Menu } from 'antd';
import {Link, useHistory} from 'react-router-dom'
// import { MailOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons';
import {LogoutOutlined} from '@ant-design/icons'
import {MenuBrowserPropsType} from './MenuBrowserConainer'
import { TaskListType } from '../../Types/types';
import { MenuDataType } from './Header';

const { SubMenu } = Menu;

export type OwnMenuBrowserPropsType = {
    menuData: any,
    // logout: any,
    // appLocation: string | null
}

const MenuBrowser: React.FC<MenuBrowserPropsType> = (props) => {
    let history = useHistory();
    const [state, setState] = useState<Array<string>>([])
    const handleClick = (e: any | undefined) => {
        //console.log('click ', e);
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
        //console.log(props.menuData)
        const subMenu = props.menuData.map( (item: any) => {
            //console.log(item)
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
        // subMenu.push(
        //     <Menu.Item key="login">
        //         <Link to={props.appLocation +"login"} >Login</Link>
        //     </Menu.Item>
        // )
        return subMenu
    }

    const onLogout = () => {
        // onChange(['', ''])
        history.replace(props.appLocation+'login')
        props.logout()
    }

    //console.log(props)

    return (
        <Menu 
            onClick={handleClick} 
            // selectedKeys={[current]} 
            mode="horizontal"
            theme="dark"
        >
            {getSubMenu()}

            {!props.isAuth ? 
                <Menu.Item key="login">
                    <Link to={props.appLocation +"login"} >Login</Link>
                </Menu.Item>
            :
                <SubMenu 
                    key={props.user?.name} 
                    title={props.user?.name}
                >
                    <Menu.Item key="login" onClick={onLogout}>
                        {/* <Link to={props.appLocation +"login"} > */}
                            Logout
                        {/* </Link> */}
                    </Menu.Item>
                </SubMenu >
                
            }
        </Menu>
    )
}

export default MenuBrowser