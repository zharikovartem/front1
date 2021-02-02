import {connect} from 'react-redux'
import ContentRoter, { OwnContentRoterPropsType } from './ContentRoter'
import { AppStateType } from '../redux/store'


type MapPropsType = ReturnType<typeof mapStateToProps>

type MapDispatchPropsType = {}

export type ContentRoterPropsType = MapPropsType & MapDispatchPropsType & OwnContentRoterPropsType

let mapStateToProps = (state:AppStateType) => {
    return {
        taskList: state.task.taskList,
    }
}

export default connect<MapPropsType, MapDispatchPropsType, OwnContentRoterPropsType, AppStateType>(mapStateToProps, 
    {}) 
    (ContentRoter)
    

