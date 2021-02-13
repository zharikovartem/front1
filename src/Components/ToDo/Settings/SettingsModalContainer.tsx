import {connect} from 'react-redux'
import SettingsModal, { OwmSettingsModalPropsType, SettingasInstanseType } from './SettingsModal'
import { AppStateType } from '../../../redux/store'
import { actions } from './../../../redux/authReducer'

type MapPropsType = ReturnType<typeof mapStateToProps>

type MapDispatchPropsType = {
    changeSettings: (settingType: string, settings: SettingasInstanseType)=> void
}

export type SettingsModalPropsType = MapPropsType & MapDispatchPropsType & OwmSettingsModalPropsType

let mapStateToProps = (state:AppStateType) => {
    return {
        viewSettings: state.auth.viewSettings
    }
}

export default connect<MapPropsType, MapDispatchPropsType, OwmSettingsModalPropsType, AppStateType>(mapStateToProps, 
    {changeSettings: actions.changeSettings} ) 
    ( SettingsModal )
    

