import {connect} from 'react-redux'
import Register, { OwnRegisterPropsType } from './Register'
import { AppStateType } from '../../redux/store'
import {register} from './../../redux/authReducer'


type MapPropsType = ReturnType<typeof mapStateToProps>

type MapDispatchPropsType = {
    register: (creds: any)=>void
}

export type RegisterPropsType = MapPropsType & MapDispatchPropsType & OwnRegisterPropsType

let mapStateToProps = (state:AppStateType) => {
    return {
        isAuth: state.auth.isAuth,
        appLocation: state.app.location
    }
}

export default connect<MapPropsType, MapDispatchPropsType, OwnRegisterPropsType, AppStateType>(mapStateToProps, 
    {register}) 
    (Register)
    

