import {connect} from 'react-redux'
import ContentRoter, { OwnContentRoterPropsType } from './ContentRoter'
import { AppStateType } from '../redux/store'


type MapPropsType = ReturnType<typeof mapStateToProps>

type MapDispatchPropsType = {
    // getTaskList: (start_date: string, end_date:string)=>void
}

export type ContentRoterPropsType = MapPropsType & MapDispatchPropsType & OwnContentRoterPropsType

let mapStateToProps = (state:AppStateType) => {
    return {
        taskList: state.task.taskList,
    }
}

export default connect<MapPropsType, MapDispatchPropsType, OwnContentRoterPropsType, AppStateType>(mapStateToProps, 
    {}) 
    (ContentRoter)
    

