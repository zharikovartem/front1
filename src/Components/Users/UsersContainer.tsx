import {connect} from 'react-redux'
import Users from './Users'
import UsersMobile from './UsersMobile'
import { AppStateType } from '../../redux/store'
import { isMobile } from 'react-device-detect'
import {getUsersList} from '../../redux/usersReducer'
import {getUsersListSelector} from './../../redux/usersSelector'


type OwnUsersPropsType = {}

type MapPropsType = ReturnType<typeof mapStateToProps>

type MapDispatchPropsType = {
    getUsersList: ()=>void,
}

export type UsersPropsType = MapPropsType & MapDispatchPropsType & OwnUsersPropsType

let mapStateToProps = (state:AppStateType) => {
    return {
        usersList: getUsersListSelector(state),
        UserStatus: state.auth.user?.status
    }
}

export default connect<MapPropsType, MapDispatchPropsType, OwnUsersPropsType, AppStateType>(mapStateToProps, 
    {getUsersList}) 
    (isMobile ? UsersMobile : Users)
    

