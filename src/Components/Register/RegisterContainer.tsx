import {connect} from 'react-redux'
import Register, { OwnRegisterPropsType } from './Register'
import { AppStateType } from '../../redux/store'
import {register} from './../../redux/authReducer'
import { RegisterFormType } from '../../api/authAPI'


type MapPropsType = ReturnType<typeof mapStateToProps>

type MapDispatchPropsType = {
    register: (creds: RegisterFormType)=>void
}

export type RegisterPropsType = MapPropsType & MapDispatchPropsType & OwnRegisterPropsType

let mapStateToProps = (state:AppStateType) => {
    return {
        isAuth: state.auth.isAuth,
        appLocation: state.app.location,
        authError: state.auth.authError
    }
}

export default connect<MapPropsType, MapDispatchPropsType, OwnRegisterPropsType, AppStateType>(mapStateToProps, 
    {register}) 
    (Register)
    

