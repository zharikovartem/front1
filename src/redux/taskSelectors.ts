import {createSelector} from 'reselect'
import { AppStateType } from './store'

const getTaskSelector = (state:AppStateType) => {
    return state.task.taskList
}