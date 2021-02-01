import {connect} from 'react-redux'
import MenuMobile, { OwnMenuMobilePropsType } from './MenuMobile'
// import {getTaskList} from '../../redux/taskReducer'
import { AppStateType } from '../../redux/store'

type MapPropsType = ReturnType<typeof mapStateToProps>

type MapDispatchPropsType = {
    // getTaskList: (start_date: string, end_date:string)=>void
}

export type MenuMobilePropsType = MapPropsType & MapDispatchPropsType & OwnMenuMobilePropsType

let mapStateToProps = (state:AppStateType) => {
    return {
        appLocation: state.app.location,
        isAuth: state.auth.isAuth,
        user: state.auth.user
    }
}

export default connect<MapPropsType, MapDispatchPropsType, OwnMenuMobilePropsType, AppStateType>(mapStateToProps, 
    {}) 
    (MenuMobile)
    

