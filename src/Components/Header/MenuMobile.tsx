import React, { useState } from 'react'
import { Menu, ActivityIndicator, NavBar, Button } from 'antd-mobile'
import { ValueType } from 'antd-mobile/lib/menu/PropsType'
import './MenuMobile.css'
import {useHistory, useLocation} from 'react-router-dom'
import {MenuDataType} from './Header'
import { MenuMobilePropsType } from './MenuMobileContainer'
import { Link } from 'react-router-dom'

export type OwnMenuMobilePropsType = {
    menuData: MenuDataType
}

const MenuMobile: React.FC<MenuMobilePropsType> = (props) => {
    let history = useHistory();
    const location = useLocation();
    const [show, setShow] = useState(false)
    type DataType = typeof props.menuData
    const data = [...props.menuData] 
    const [initData, setInitData] = useState<DataType>(data)

    const getSelectedMenuItem = ():ValueType => {
        let response: ValueType = [data[0].value, '']
        data.forEach( (dataItem: any) => {
            if (dataItem.children) {
                dataItem.children.forEach( (item: any) => {
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

    const [selectedMenuItem, setSelectedMenuItem] = useState<ValueType>( getSelectedMenuItem() )

    const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.preventDefault(); // Fix event propagation on Android
        setShow(!show)
        // if (!initData) {
        //     setInitData(data)
        // }
    }

    const onChange = (value?: ValueType | undefined) => {
        console.log(value)
        
        let label = '';
        data.forEach((dataItem) => {
            if (value) {
                if (dataItem.value === value[0]) {
                    // label = dataItem.label;
                    if (dataItem.children && value[1]) {
                        dataItem.children.forEach((cItem: { value: string | string[]; label: any }) => {
                            if (cItem.value === value[1]) {
                                label = `/${cItem.value}`;
                                console.log('history.push:',`${cItem.value}`)
                                // history.push(`/${cItem.value}`)
                                // history.push(props.appLocation + cItem.value)
                                history.replace(`${cItem.value}`)
                                
                            }
                        })
                    }
                }
                setSelectedMenuItem([selectedMenuItem[0], value[1]])
            }
        });
        // if (value) {
        //     setSelectedMenuItem(value)
        // }
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
                    <Link 
                        to={props.appLocation+"login"} 
                        onClick={ ()=>{onChange(['', ''])} }
                    >
                        {/* <Button className="am-button-borderfix" type="primary" size="small"> */}
                        <span className="text-white">Login</span>
                            
                        {/* </Button> */}
                    </Link>
                </NavBar>
            </div>
            {show ? initData ? menuEl : loadingEl : null}
            {show ? <div className="menu-mask" onClick={onMaskClick} /> : null}
        </div>
    )
}

export default (MenuMobile)


