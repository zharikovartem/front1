import React from 'react'
import {
    BrowserView,
    MobileView,
    isBrowser,
    isMobile
} from "react-device-detect"
import { Link } from 'react-router-dom'
import { HeaderPropsType } from './HeaderContainer'
import MenuBrowser from './MenuBrowser'
import MenuMobile from './MenuMobileContainer'

// type MenuDataType = Array<any>

export type OwnHeaderPropsType = {}

const Header: React.FC<HeaderPropsType> = (props) => {


    if (isMobile) {
        return <MenuMobile menuData={menuData(props.appLocation)} />
    } else {
        return <MenuBrowser menuData={menuData(props.appLocation)} />
    }
}

export default Header


export type MenuDataType = ReturnType<typeof menuData>

const menuData = (appLocation: string) => {
    const data = [
    {
        value: 'planning',
        label: 'Planning',
        children: [
            {
                label: 'ToDo list',
                // label: <Link to='/toDoList'>ToDo list</Link>,
                value: appLocation + 'toDoList',
                disabled: false,
            },
            {
                label: 'Tasks tree',
                value: appLocation + 'tasksTree',
            },
            {
                label: 'Analysis',
                value: appLocation + 'analysis',
                disabled: true,
            }
        ],
    }, {
        value: 'catalog',
        label: 'Catalog',
        children: [
            {
                label: 'Products',
                value: appLocation + 'products',
            }
            , {
                label: 'Providers',
                value: appLocation + 'providers',
            }
        ],
    },
    {
        value: '3',
        label: 'Orders',
        // isLeaf: true,
        children: [
            {
                label: 'Orders',
                value: appLocation + 'orders',
            },
            {
                label: 'Leads',
                value: appLocation + 'leads',
            },
        ],
    },
    ]
    return data
}