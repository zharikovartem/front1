import {connect} from 'react-redux'
import MenuBrowser, { OwnMenuBrowserPropsType } from './MenuBrowser'
import { AppStateType } from '../../redux/store'
import {actions} from './../../redux/authReducer'


type MapPropsType = ReturnType<typeof mapStateToProps>

type MapDispatchPropsType = {
    logout: ()=>void
}

export type MenuBrowserPropsType = MapPropsType & MapDispatchPropsType & OwnMenuBrowserPropsType

let mapStateToProps = (state:AppStateType) => {
    return {
        isAuth: state.auth.isAuth,
        user: state.auth.user,
        appLocation: state.app.location
        
    }
}

export default connect<MapPropsType, MapDispatchPropsType, OwnMenuBrowserPropsType, AppStateType>(mapStateToProps, 
    {logout: actions.logout}) 
    (MenuBrowser)
    

