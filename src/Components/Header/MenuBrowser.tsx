import React from 'react'
import { Menu } from 'antd'
import {Link, useHistory} from 'react-router-dom'
import { MenuPropsType } from './MenuContainer'
import { MenuDataItemType } from './Header';

const { SubMenu } = Menu;

const MenuBrowser: React.FC<MenuPropsType> = (props) => {
    let history = useHistory();

    const handleClick = () => {}

    const getMenuItem = (childs: Array<MenuDataItemType>):Array<JSX.Element | undefined> => {
        const menuItems = childs.map( (item: MenuDataItemType) => {
            const disabled = item.disabled ? {disabled: true} : null
            return (
                <Menu.Item key={item.value} {...disabled}>
                    <Link to={item.value}>{item.label}</Link>
                </Menu.Item>
            )
        })
        return menuItems
    }

    const getSubMenu = ():Array<JSX.Element | undefined> => {
        const subMenu = props.menuData.map( (item: MenuDataItemType) => {
            return (
                <SubMenu 
                    key={item.value} 
                    title={item.label}
                >
                    {item.children ? getMenuItem(item.children) : null}
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
            { getSubMenu() }

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
                    <Menu.Item key="info" onClick={()=>{}}>
                            Info
                    </Menu.Item>
                    <Menu.Item key="help" onClick={()=>{}}>
                            Help
                    </Menu.Item>
                </SubMenu >
            }
        </Menu>
    )
}

export default MenuBrowser