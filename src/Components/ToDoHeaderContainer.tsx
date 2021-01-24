import {connect} from 'react-redux'
import ToDoHeader, { OwnToDoHeaderPropsType } from './ToDoHeader'
import {setIsIntervalAC, getTaskList, actions} from './../redux/taskReducer'
import { AppStateType } from '../redux/store'
// import { Action } from 'redux'

type MapPropsType = ReturnType<typeof mapStateToProps>

type MapDispatchPropsType = {
    setIsIntervalAC: (isInterval: boolean) => void,
    getTaskList: (date: string) => void
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
    {setIsIntervalAC, getTaskList, setIsInterval: actions.setIsInterval}) 
    (ToDoHeader);
    

