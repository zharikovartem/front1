import React from 'react'
import {UsersPropsType} from './UsersContainer'

const UsersMobile: React.FC<UsersPropsType> = (props) => {
    return (
        <div>
            <h5>UsersMobile</h5>
            <li>getUserList</li>
            <li>show User List</li>
        </div>
    )
}

export default UsersMobile