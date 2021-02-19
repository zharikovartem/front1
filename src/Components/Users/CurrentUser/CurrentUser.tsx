import { Collapse, Spin, List, Pagination } from 'antd'
import React, { useEffect, useState } from 'react'
import { TaskType } from '../../../Types/types'
import TimeScale from '../../TimeScale/TimeScale'
// import ToDoHeader from '../../ToDo/ToDoHeader/ToDoHeaderContainer'
import ToDoHeader from '../../ToDo/ToDoHeader/ToDoHeader'
import { CurrentUserPropsType } from './CurrentUserContainer'
import UserDataForm from './UserDataForm'
import moment from 'moment'

const { Panel } = Collapse

const CurrentUser: React.FC<CurrentUserPropsType> = (props) => {
    useEffect(() => {
        const getUsersList = () => props.getUsersList
        if (props.usersList.length === 0) {
            getUsersList()()
        }
    }, [ props.usersList, props.getUsersList ])

    const [defaultPageSize, setDefaultPageSize] = useState(10)
    const [currentPage, setCurrentPage] = useState(1)

    const getTargetUser = (userId: number) => {
        // console.log('usersList: ', props.usersList)
        return props.usersList.filter((item: any) => item.id.toString() === userId)[0]
    }

    const user = getTargetUser(props.match.params.userId)

    const callback = () => { }

    const onTaskEdit = () => { }

    const onPagination = (currentPage: number) => {
        // console.log(currentPage, )
        setCurrentPage(currentPage)
    }

    const onShowSizeChange = (current: number, size: number) => {
        // console.log(current)
        setDefaultPageSize(size)
    }

    // console.log(user)

    const toDoPart = ():Array<TaskType> => {
        let toDoPart: Array<TaskType> = []
        if (user.toDoList) {
            const startIndex = (currentPage-1) * defaultPageSize
            // console.log('currentPage', currentPage)
            // console.log('currentPage-1', currentPage-1)
            // console.log('defaultPageSize', defaultPageSize)
            // console.log('startIndex', startIndex)
            const endIndex = startIndex + defaultPageSize
            // console.log('endIndex', endIndex)
            for (let index = 0; index < user.toDoList.length; index++) {
                const element = user.toDoList[index];
                if (index >= startIndex && index < endIndex) {
                    // toDoPart.push(<TodoItem item={element} />)
                    toDoPart.push(element)
                }
                
            }
        }
        // console.log('toDoPart', toDoPart)
        return toDoPart
    }
    type DateIntervalType = {
        startDate: moment.Moment,
        endDate: moment.Moment
    }
    const [dateInterval, setDateInterval] = useState<DateIntervalType>({
        startDate: moment(),//.add(-1,'day'),
        endDate: moment()//.add(1,'day')
    })

    const [taskList, setTaskList] = useState<Array<TaskType> | null>(null)
    
    const getTaskList = (startDate: string, endDate: string) => {
        let tasklist: Array<TaskType> = []
        if (user.toDoList) {

            // console.log('start: ', moment(dateInterval.startDate.format('YYYY-MM-DD')) .add(-1,'day').format('YYYY-MM-DD') )
            // console.log('end: ', moment(dateInterval.endDate.format('YYYY-MM-DD')) .add(1,'day').format('YYYY-MM-DD') )

            for (let index = 0; index < user.toDoList.length; index++) {
                const toDo = user.toDoList[index];
                // console.log(
                //     moment(toDo.date).isBetween( 
                //     moment(dateInterval.startDate.format('YYYY-MM-DD')).add(-1,'day'),
                //     moment(dateInterval.endDate.format('YYYY-MM-DD')).add(1,'day'),
                //     'day')
                // )
                if (moment(toDo.date).isBetween( 
                        // {...dateInterval.startDate}.add(-1,'day'), 
                        moment(dateInterval.startDate.format('YYYY-MM-DD')).add(-1,'day'),
                        // {...dateInterval.endDate}.add(1,'day'), 
                        moment(dateInterval.endDate.format('YYYY-MM-DD')).add(1,'day'),
                        'day')) {
                    tasklist.push(toDo)
                } 
            }
        }
        console.log('tasklist: ', tasklist)
        setTaskList(tasklist)
    }

    const setIsInterval = (isInterval: boolean, date: {startDate: moment.Moment, endDate: moment.Moment}) => {
        console.log('startDate: ', date.startDate.format('YYYY-MM-DD') )
        console.log('endDate: ', date.endDate.format('YYYY-MM-DD') )
        setDateInterval(date)
    }

    if (user) {
        return (
            <div className="mt-2">
                <h5>Name: {user.name}</h5>
                <p>User id: {props.match.params.userId}</p>

                <Collapse defaultActiveKey={[]} onChange={callback}>
                    <Panel header="User data" key="1">
                        <UserDataForm userData={user} updateUser={props.updateUser} />
                    </Panel>
                    <Panel header="ToDo List" key="2">
                        <List>
                        {user.toDoList ? toDoPart().map((item: any) => {
                            return <TodoItem key={item.id.toString()} item={item} />
                        })
                            :
                            null
                        }
                        {/* {toDoPart()} */}
                        </List>
                        <Pagination
                            total={user.toDoList?.length}
                            showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
                            defaultPageSize={10}
                            defaultCurrent={1}
                            onChange={onPagination}
                            onShowSizeChange={onShowSizeChange}
                        />
                    </Panel>
                    <Panel header="Schedule" key="3">
                        <h3>Schedule for {user.name}:</h3>
                        <ToDoHeader
                            dateInterval={dateInterval}
                            setIsInterval={setIsInterval}
                            showDrawer={() => { console.log('showDrawer') }}
                            showModal={() => { console.log('showModal') }}
                        />
                        <TimeScale 
                            onEdit={onTaskEdit} 
                            dateInterval={dateInterval}
                            errorMessage={props.errorMessage}
                            getTaskList={getTaskList}
                            isInterval={props.isInterval}
                            settings={props.settings}
                            taskList={taskList}
                            taskListIsFetching={false}
                            taskSaveStatus={props.taskSaveStatus}
                        />
                    </Panel>
                    <Panel header="Related users" key="4"></Panel>
                    <Panel header="Permissions" key="5"></Panel>
                </Collapse>

            </div>
        )
    } else {
        return <Spin key="spin" size="large" />
    }
}

export default CurrentUser

type TodoItemPropsType = {
    item: TaskType,
    key: string
}
const TodoItem: React.FC<TodoItemPropsType> = (props) => {
    return (
        <List.Item key={props.item.id}>{props.item.name}</List.Item>
    )
}

