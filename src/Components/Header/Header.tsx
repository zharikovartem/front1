import React from 'react'
import { HeaderPropsType } from './HeaderContainer'
import MenuContainer from './MenuContainer'

export type OwnHeaderPropsType = {}

const Header: React.FC<HeaderPropsType> = (props) => {
    const userStatus = props.user ? props.user.status : null
    return <MenuContainer menuData={menuData(props.appLocation, userStatus)}/>
}

export default Header

export type MenuDataType = Array<MenuDataItemType>
export type MenuDataItemType = {
    value: string,
    label: string,
    disabled?: boolean
    children?: Array<MenuDataItemType>,
}

const menuData = (appLocation: string, userStatus: string | null): MenuDataType => {
    const data: MenuDataType = [
    {
        value: 'planning',
        label: 'Planning',
        children: [
            {
                label: 'ToDo list',
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
            },
            {
                label: 'Daily schedule',
                value: appLocation + 'schedule',
                disabled: false,
            },
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
        value: 'orders',
        label: 'Orders',
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

    if (userStatus === 'admin' || userStatus ==='superAdmin') {
        data.push(
            {
                value: 'admin',
                label: 'Admin',
                children: [
                    {
                        label: 'Users',
                        value: appLocation + 'users',
                    }
                ],
            }
        )
    }
    return data
}
