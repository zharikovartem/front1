import {connect} from 'react-redux'
import Header, { OwnHeaderPropsType } from './Header'
import {actions} from '../../redux/authReducer'
import { AppStateType } from '../../redux/store'

type MapPropsType = ReturnType<typeof mapStateToProps>

type MapDispatchPropsType = {
    logout: ()=>void
}

export type HeaderPropsType = MapPropsType & MapDispatchPropsType & OwnHeaderPropsType

let mapStateToProps = (state:AppStateType) => {
    return {
        appLocation: state.app.location,
        user: state.auth.user
    }
}

export default connect<MapPropsType, MapDispatchPropsType, OwnHeaderPropsType, AppStateType>(mapStateToProps, 
    {logout: actions.logout}) 
    (Header)
    

