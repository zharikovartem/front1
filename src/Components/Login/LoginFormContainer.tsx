import {connect} from 'react-redux'
import LoginForm, { OwnLoginFormPropsType } from './LoginForm'
import { AppStateType } from '../../redux/store'
import {credsType, login} from './../../redux/authReducer'


type MapPropsType = ReturnType<typeof mapStateToProps>

type MapDispatchPropsType = {
    // login: (data: credsType)=>void
}

export type LoginFormPropsType = MapPropsType & MapDispatchPropsType & OwnLoginFormPropsType

let mapStateToProps = (state:AppStateType) => {
    return {
        // auth: state.auth,
        location: state.app.location
    }
}

export default connect<MapPropsType, MapDispatchPropsType, OwnLoginFormPropsType, AppStateType>(mapStateToProps, 
    {}) 
    (LoginForm)
    

