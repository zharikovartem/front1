import React, { useEffect } from 'react'
import {UsersPropsType} from './UsersContainer'
import { List } from 'antd-mobile'
import { Link, useRouteMatch } from 'react-router-dom'

const Item = List.Item
// const Brief = Item.Brief

const UsersMobile: React.FC<UsersPropsType> = (props) => {
    useEffect( ()=> {
        if (props.usersList.length === 0) {
            props.getUsersList()
        }
    }, [props.usersList, props] )
    
    let { url } = useRouteMatch();
    return (
        <div>
            <h5>UsersMobile</h5>
            <p>This page is only available in the full version</p>
            <List renderHeader={() => 'Basic Style'} className="my-list">
                {   props.usersList.map( (item: any) => {
                        return(
                            <Item 
                                key={item.id}
                                // extra={'extra content'}
                                onClick={() => {console.log('onClick')}}
                            >
                                <Link to={url+'/'+item.id}>{item.name}</Link>
                            </Item>
                        )
                    })
                }
            </List>
        </div>
    )
}

export default UsersMobile