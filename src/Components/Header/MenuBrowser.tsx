import React from 'react'
import { Menu } from 'antd'
import {Link, useHistory} from 'react-router-dom'
import { MenuPropsType } from './MenuContainer'

const { SubMenu } = Menu;

const MenuBrowser: React.FC<MenuPropsType> = (props) => {
    let history = useHistory();
    const handleClick = (e: any | undefined) => {
    }

    const getMenuItem = (childs: any):any => {
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
        const subMenu = props.menuData.map( (item: any) => {
            return (
                <SubMenu 
                    key={item.value} 
                    title={item.label}
                >
                    {getMenuItem(item.children)}
                </SubMenu >
            )
        })
        return subMenu
    }

    const onLogout = () => {
        history.replace(props.appLocation+'login')
        props.logout()
    }

    return (
        <Menu 
            onClick={handleClick} 
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
                            Logout
                    </Menu.Item>
                </SubMenu >
                
            }
        </Menu>
    )
}

export default MenuBrowser