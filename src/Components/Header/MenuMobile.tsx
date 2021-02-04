import React, { useState } from 'react'
import { Menu, ActivityIndicator, NavBar, Button } from 'antd-mobile'
import { ValueType } from 'antd-mobile/lib/menu/PropsType'
import './MenuMobile.css'
import { useHistory, useLocation } from 'react-router-dom'
import { MenuDataType } from './Header'
import { MenuMobilePropsType } from './MenuMobileContainer'
import { Link } from 'react-router-dom'
import { LogoutOutlined } from '@ant-design/icons'

export type OwnMenuMobilePropsType = {
    menuData: MenuDataType,
    logout: () => void
}

const MenuMobile: React.FC<MenuMobilePropsType> = (props) => {
    let history = useHistory();
    const location = useLocation();
    const [show, setShow] = useState(false)
    type DataType = typeof props.menuData
    const data = [...props.menuData]
    const [initData, setInitData] = useState<DataType>(data)

    const getSelectedMenuItem = (): ValueType => {
        let response: ValueType = [data[0].value, '']
        data.forEach((dataItem: any) => {
            if (dataItem.children) {
                dataItem.children.forEach((item: any) => {
                    //console.log('/',item.value,'===',location.pathname)
                    if (item.value === location.pathname) {
                        response = [dataItem.value, item.value]
                    }
                })
            }
        })
        //console.log('getSelectedMenuItem response: ', response)
        return response
    }

    const [selectedMenuItem, setSelectedMenuItem] = useState<ValueType>(getSelectedMenuItem())

    const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.preventDefault(); // Fix event propagation on Android
        setShow(!show)
        // if (!initData) {
        //     setInitData(data)
        // }
    }

    const onChange = (value?: ValueType | undefined) => {
        console.log('input values: ', value)
        if (value) {
            let subMenu = value[0]

            data.forEach((dataItem) => {
                if (dataItem.value === value[0]) {
                    subMenu = value[0]
                    if (dataItem.children && value[1]) {
                        dataItem.children.forEach((cItem: { value: string | string[]; label: any }) => {
                            if (cItem.value === value[1]) {
                                history.replace(`${cItem.value}`)

                            }
                        })
                    }
                }
            })
        
            if (subMenu === '') {
                subMenu = data[0].value
            }
            console.log('set values: ', [subMenu, value[1]])
            setSelectedMenuItem([subMenu, value[1]])
        }
        
    }

    const onMaskClick = () => {
        setShow(false)
    }

    const menuEl = (
        <Menu
            className="foo-menu"
            data={initData}
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

    // console.log(props)

    const onLogout = () => {
        onChange(['', ''])
        history.replace(props.appLocation + 'login')
        props.logout()
    }

    return (
        <div className={show ? 'menu-active' : ''}>
            <div>
                <NavBar
                    leftContent=""
                    mode="light"
                    icon={<img src="https://gw.alipayobjects.com/zos/rmsportal/iXVHARNNlmdCGnwWxQPH.svg" className="am-icon am-icon-md" alt="" />}
                    onLeftClick={handleClick}
                    className="top-nav-bar"
                >
                    {!props.isAuth ?
                        <Link
                            to={props.appLocation + "login"}
                            onClick={() => { onChange(['', '']) }}
                        >
                            <span className="text-white">Login</span>
                        </Link>
                        :
                        <div>
                            {props.user?.name}
                            <Button className="ml-5" size="small" icon={<LogoutOutlined />} onClick={onLogout} inline >

                            </Button>
                        </div>
                    }

                </NavBar>
            </div>
            {show ? initData ? menuEl : loadingEl : null}
            {show ? <div className="menu-mask" onClick={onMaskClick} /> : null}
        </div>
    )
}

export default (MenuMobile)


