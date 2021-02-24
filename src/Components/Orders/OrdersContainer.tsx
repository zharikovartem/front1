import {connect} from 'react-redux'
import Orders, { OwnOrdersPropsType } from './Orders'
import { AppStateType } from '../../redux/store'

type MapPropsType = ReturnType<typeof mapStateToProps>

type MapDispatchPropsType = {}

export type OrdersPropsType = MapPropsType & MapDispatchPropsType & OwnOrdersPropsType

let mapStateToProps = (state:AppStateType) => {
    return {
        appLocation: state.app.location
    }
}

export default connect<MapPropsType, MapDispatchPropsType, OwnOrdersPropsType, AppStateType>(mapStateToProps, 
    {}) 
    (Orders)
    

