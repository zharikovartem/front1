import React, { useState } from 'react'
import { Menu, ActivityIndicator, NavBar } from 'antd-mobile'
import { ValueType } from 'antd-mobile/lib/menu/PropsType'
import './MenuMobile.css'
import { useHistory, useLocation } from 'react-router-dom'
import { MenuPropsType } from './MenuContainer'
import { Link } from 'react-router-dom'
import MenuPopover from './MenuPopover'
import { MenuDataItemType } from './Header'

const MenuMobile: React.FC<MenuPropsType> = (props) => {
    let history = useHistory()
    const location = useLocation()
    const [showMenu, setShowMenu] = useState(false)

    const getSelectedMenuItem = (): ValueType => {
        let response: ValueType = [props.menuData[0].value, '']
        props.menuData.forEach((dataItem: MenuDataItemType) => {
            if (dataItem.children) {
                dataItem.children.forEach((item: MenuDataItemType) => {
                    if (item.value === location.pathname) {
                        response = [dataItem.value, item.value]
                    }
                })
            }
        })
        return response
    }

    const [selectedMenuItem, setSelectedMenuItem] = useState<ValueType>(getSelectedMenuItem())

    const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.preventDefault(); // Fix event propagation on Android
        setShowMenu(!showMenu)
    }

    const onChange = (value?: ValueType | undefined) => {
        if (value) {
            let subMenu = value[0]

            props.menuData.forEach((dataItem) => {
                if (dataItem.value === value[0]) {
                    subMenu = value[0]
                    if (dataItem.children && value[1]) {
                        dataItem.children.forEach((cItem: { value: string | string[]; label: string }) => {
                            if (cItem.value === value[1]) {
                                history.replace(`${cItem.value}`)
                                setShowMenu(false)
                            }
                        })
                    }
                }
            })
        
            if (subMenu === '') {
                subMenu = props.menuData[0].value
            }
            setSelectedMenuItem([subMenu, value[1]])
        }
        
    }

    const onMaskClick = () => {
        setShowMenu(false)
    }

    const menuEl = (
        <Menu
            className="foo-menu"
            data={props.menuData}
            value={selectedMenuItem}
            onChange={onChange}
            height={document.documentElement.clientHeight * 0.6}
        />
    );

    const loadingEl = (
        <div style={{ width: '100%', height: document.documentElement.clientHeight * 0.6, display: 'flex', justifyContent: 'center' }}>
            <ActivityIndicator size="large" />
        </div>
    );

    const onLogout = () => {
        onChange(['', ''])
        history.replace(props.appLocation + 'login')
        props.logout()
    }

    return (
        <div className={showMenu ? 'menu-active' : ''}>
            <div>
                <NavBar
                    leftContent=""
                    mode="light"
                    icon={<img src="https://gw.alipayobjects.com/zos/rmsportal/iXVHARNNlmdCGnwWxQPH.svg" className="am-icon am-icon-md" alt="" />}
                    onLeftClick={handleClick}
                    className="top-nav-bar"
                    rightContent={props.isAuth ? <MenuPopover onLogout={onLogout} /> : null}
                >
                    {!props.isAuth ?
                        <Link
                            to={props.appLocation + "login"}
                            onClick={() => { onChange(['', '']) }}
                        >
                            <span className="text-white">Login</span>
                        </Link>
                        :
                        <>
                        <div>
                            {props.user?.name}
                        </div>
                        </>
                    }
                    

                </NavBar>
            </div>
            {showMenu ? props.menuData ? menuEl : loadingEl : null}
            {showMenu ? <div className="menu-mask" onClick={onMaskClick} /> : null}
        </div>
    )
}

export default (MenuMobile)


