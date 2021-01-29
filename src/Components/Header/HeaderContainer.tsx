import {connect} from 'react-redux'
import Header, { OwnHeaderPropsType } from './Header'
// import {getTaskList} from '../../redux/taskReducer'
import { AppStateType } from '../../redux/store'

type MapPropsType = ReturnType<typeof mapStateToProps>

type MapDispatchPropsType = {
    // getTaskList: (start_date: string, end_date:string)=>void
}

export type HeaderPropsType = MapPropsType & MapDispatchPropsType & OwnHeaderPropsType

let mapStateToProps = (state:AppStateType) => {
    return {
        appLocation: state.app.location
    }
}

export default connect<MapPropsType, MapDispatchPropsType, OwnHeaderPropsType, AppStateType>(mapStateToProps, 
    {}) 
    (Header)
    

