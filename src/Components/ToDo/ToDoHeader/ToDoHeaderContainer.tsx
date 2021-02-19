import {connect} from 'react-redux'
import ToDoHeader from './ToDoHeader'
import {actions} from '../../../redux/taskReducer'
import { AppStateType } from '../../../redux/store'
import { isMobile } from 'react-device-detect'
import ToDoHeaderMobile from './ToDoHeaderMobile'

type OwnToDoHeaderPropsType = {
    showDrawer: () => void,
    showModal: () => void,
    isOpen?: boolean
}

type MapPropsType = ReturnType<typeof mapStateToProps>

type MapDispatchPropsType = {
    setIsInterval: (isInterval: boolean, date: {startDate: moment.Moment, endDate: moment.Moment}) => void
}

export type ToDoHeaderPropsType = MapPropsType & MapDispatchPropsType & OwnToDoHeaderPropsType

let mapStateToProps = (state:AppStateType) => {
    return {
        dateInterval: state.task.dateInterval
    }
}

export default connect<MapPropsType, MapDispatchPropsType, OwnToDoHeaderPropsType, AppStateType>(mapStateToProps, 
    {setIsInterval: actions.setIsInterval}) 
    (isMobile ? ToDoHeaderMobile : ToDoHeader)
    

