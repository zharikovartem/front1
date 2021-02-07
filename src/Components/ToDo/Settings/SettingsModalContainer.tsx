import {connect} from 'react-redux'
import SettingsModal, { OwmSettingsModalPropsType } from './SettingsModal'
import { AppStateType } from '../../../redux/store'

type MapPropsType = ReturnType<typeof mapStateToProps>

type MapDispatchPropsType = {
    // getTaskList: (start_date: string, end_date:string)=>void
}

export type SettingsModalPropsType = MapPropsType & MapDispatchPropsType & OwmSettingsModalPropsType

let mapStateToProps = (state:AppStateType) => {
    console.log(state)
    return {
        viewSettings: state.auth.viewSettings
    }
}

export default connect<MapPropsType, MapDispatchPropsType, OwmSettingsModalPropsType, AppStateType>(mapStateToProps, 
    {}) 
    (SettingsModal)
    

