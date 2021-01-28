import React from 'react'
import {
    BrowserView,
    MobileView,
    isBrowser,
    isMobile
} from "react-device-detect"
import { Link } from 'react-router-dom'
import MenuBrowser from './MenuBrowser'
import MenuMobile from './MenuMobile'

// type MenuDataType = Array<any>
type MenuDataType = typeof menuData
const menuData = [
    {
        value: 'planning',
        label: 'Planning',
        children: [
            {
                label: 'ToDo list',
                // label: <Link to='/toDoList'>ToDo list</Link>,
                value: 'toDoList',
                disabled: false,
            },
            {
                label: 'Tasks tree',
                value: 'tasksTree',
            },
            {
                label: 'Analysis',
                value: 'analysis',
                disabled: true,
            }
        ],
    }, {
        value: 'catalog',
        label: 'Catalog',
        children: [
            {
                label: 'Products',
                value: '1',
            }
            , {
                label: 'Providers',
                value: '2',
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
                value: '1',
            },
            {
                label: 'Leads',
                value: '2',
            },
        ],
    },
]

const Header = () => {
    if (isMobile) {
        return <MenuMobile menuData={menuData} />
    } else {
        return <MenuBrowser menuData={menuData}/>
    }
}

export default Header