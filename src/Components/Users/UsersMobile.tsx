import React from 'react'
import {UsersPropsType} from './UsersContainer'

const UsersMobile: React.FC<UsersPropsType> = (props) => {
    return (
        <div>
            <h5>UsersMobile</h5>
            <p>This page is only available in the full version</p>
        </div>
    )
}

export default UsersMobile