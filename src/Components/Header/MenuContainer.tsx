import {connect} from 'react-redux'
import MenuMobile from './MenuMobile'
import MenuBrowser from './MenuBrowser'
import {actions} from '../../redux/authReducer'
import { AppStateType } from '../../redux/store'
import { MenuDataType } from './Header'
import { isMobile } from "react-device-detect"

type OwnMenuPropsType = {
    menuData: MenuDataType
}
type MapPropsType = ReturnType<typeof mapStateToProps>

type MapDispatchPropsType = {
    logout: ()=>void
}

export type MenuPropsType = MapPropsType & MapDispatchPropsType & OwnMenuPropsType

let mapStateToProps = (state:AppStateType) => {
    return {
        appLocation: state.app.location,
        isAuth: state.auth.isAuth,
        user: state.auth.user
    }
}

export default connect<MapPropsType, MapDispatchPropsType, OwnMenuPropsType, AppStateType>(mapStateToProps, 
    {logout: actions.logout}) 
    (isMobile ? MenuMobile : MenuBrowser)
    

