import React, {useEffect} from 'react'
import {UsersPropsType} from './UsersContainer'

const Users: React.FC<UsersPropsType> = (props) => {
    useEffect( ()=> {
        if (props.usersList.length === 0) {
            props.getUsersList()
        }
    }, [props.usersList] )

    console.log(props)
    
    return (
        <div>
            <h5>Users</h5>
            <li>getUserList</li>
            <li>show User List</li>
        </div>
    )
}

export default Users