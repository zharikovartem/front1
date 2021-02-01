import {connect} from 'react-redux'
import Login, { OwnLoginPropsType } from './Login'
import { AppStateType } from '../../redux/store'
import {credsType, login} from './../../redux/authReducer'


type MapPropsType = ReturnType<typeof mapStateToProps>

type MapDispatchPropsType = {
    login: (data: credsType)=>void
}

export type LoginPropsType = MapPropsType & MapDispatchPropsType & OwnLoginPropsType

let mapStateToProps = (state:AppStateType) => {
    return {
        auth: state.auth,
    }
}

export default connect<MapPropsType, MapDispatchPropsType, OwnLoginPropsType, AppStateType>(mapStateToProps, 
    {login}) 
    (Login)
    

