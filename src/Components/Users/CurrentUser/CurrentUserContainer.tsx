import {connect} from 'react-redux'
import CurrentUser from './CurrentUser'
import { AppStateType } from './../../../redux/store'
import { isMobile } from 'react-device-detect'
import { getUsersList, updateUser, actions } from './../../../redux/usersReducer'
import { UserType } from '../../../redux/authReducer'
import CurrentUserMobile from './CurrentUserMobile'

type OwnCurrentUserPropsType = {
    match: any
    location: any
    history: any
}

type MapPropsType = ReturnType<typeof mapStateToProps>

type MapDispatchPropsType = {
    getUsersList: ()=>void,
    updateUser: (values: UserType, userId: number)=>void,
    setUsersDataChanged: (isUsersDataChanged: boolean)=>void
}

export type CurrentUserPropsType = MapPropsType & MapDispatchPropsType & OwnCurrentUserPropsType

let mapStateToProps = (state:AppStateType) => {
    return {
        usersList: state.users.usersList,
        dateInterval: state.task.dateInterval,
        errorMessage: state.task.errorMessage,
        isInterval: state.task.isInterval,
        taskSaveStatus: state.task.taskSaveStatus,
        settings:state.auth.viewSettings,
        appLocation: state.app.location,
        viewSettings: state.auth.viewSettings,
        isUsersDataChanged: state.users.isUsersDataChanged
    }
}

export default connect<MapPropsType, MapDispatchPropsType, OwnCurrentUserPropsType, AppStateType>(mapStateToProps, 
    {getUsersList, updateUser, setUsersDataChanged: actions.setUsersDataChanged}) 
    (isMobile ? CurrentUserMobile : CurrentUser)
    

