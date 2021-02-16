import React from 'react'
import { HeaderPropsType } from './HeaderContainer'
import MenuContainer from './MenuContainer'

export type OwnHeaderPropsType = {}

const Header: React.FC<HeaderPropsType> = (props) => {
    return <MenuContainer menuData={menuData(props.appLocation)}/>
}

export default Header

export type MenuDataType = Array<MenuDataItemType>
export type MenuDataItemType = {
    value: string,
    label: string,
    disabled?: boolean
    children?: Array<MenuDataItemType>,
}

const menuData = (appLocation: string): MenuDataType => {
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
    return data
}
