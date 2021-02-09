import {connect} from 'react-redux'
import SettingsModal, { OwmSettingsModalPropsType } from './SettingsModal'
import { AppStateType } from '../../../redux/store'
import { actions } from './../../../redux/authReducer'

type MapPropsType = ReturnType<typeof mapStateToProps>

type MapDispatchPropsType = {
    // getTaskList: (start_date: string, end_date:string)=>void
    changeSettings: (settingType: string, settings: any)=> void
    // actions: any
}

export type SettingsModalPropsType = MapPropsType & MapDispatchPropsType & OwmSettingsModalPropsType

let mapStateToProps = (state:AppStateType) => {
    // console.log(state)
    return {
        viewSettings: state.auth.viewSettings
    }
}

export default connect<MapPropsType, MapDispatchPropsType, OwmSettingsModalPropsType, AppStateType>(mapStateToProps, 
    {changeSettings: actions.changeSettings} ) 
    ( SettingsModal )
    

