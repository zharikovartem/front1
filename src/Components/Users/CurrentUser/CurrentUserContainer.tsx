import {connect} from 'react-redux'
import CurrentUser from './CurrentUser'
import { AppStateType } from './../../../redux/store'
// import { isMobile } from 'react-device-detect'
import { getUsersList, updateUser } from './../../../redux/usersReducer'
import { UserType } from '../../../api/usersAPI'


type OwnCurrentUserPropsType = {
    match: any
    location: any
    history: any
}

type MapPropsType = ReturnType<typeof mapStateToProps>

type MapDispatchPropsType = {
    getUsersList: ()=>void,
    updateUser: (values: UserType, userId: number)=>void
}

export type CurrentUserPropsType = MapPropsType & MapDispatchPropsType & OwnCurrentUserPropsType

let mapStateToProps = (state:AppStateType) => {
    return {
        usersList: state.users.usersList
    }
}

export default connect<MapPropsType, MapDispatchPropsType, OwnCurrentUserPropsType, AppStateType>(mapStateToProps, 
    {getUsersList, updateUser}) 
    (CurrentUser)
    

