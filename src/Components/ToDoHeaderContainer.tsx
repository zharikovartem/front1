import {connect} from 'react-redux'
import ToDoHeader, { OwnToDoHeaderPropsType } from './ToDoHeader'
import {actions} from './../redux/taskReducer'
import { AppStateType } from '../redux/store'
// import { Action } from 'redux'

type MapPropsType = ReturnType<typeof mapStateToProps>

type MapDispatchPropsType = {
    setIsInterval: (isInterval: boolean, date: {startDate: moment.Moment, endDate: moment.Moment}) => {
        type: "SN/TASK/SET_IS_INTERVAL",
        isInterval: boolean,
        date: {startDate: moment.Moment, endDate: moment.Moment}
    }
}

export type ToDoHeaderPropsType = MapPropsType & MapDispatchPropsType & OwnToDoHeaderPropsType

let mapStateToProps = (state:AppStateType) => {
    return {
        dateInterval: state.task.dateInterval
    }
}

export default connect<MapPropsType, MapDispatchPropsType, OwnToDoHeaderPropsType, AppStateType>(mapStateToProps, 
    {setIsInterval: actions.setIsInterval}) 
    (ToDoHeader)
    

