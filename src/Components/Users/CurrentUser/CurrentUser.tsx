import { Collapse, Spin, List, Pagination, Button, Drawer } from 'antd'
import React, { useEffect, useState } from 'react'
import { TaskType } from '../../../Types/types'
import TimeScale from '../../TimeScale/TimeScale'
import ToDoHeader from '../../ToDo/ToDoHeader/ToDoHeader'
import { CurrentUserPropsType } from './CurrentUserContainer'
import UserDataForm from './UserDataForm'
import moment from 'moment'
import { Formik } from 'formik'
import { initialValues, InitialValuesType } from './../../ToDo/ToDoBrowser'
import ToDoForm from '../../ToDo/ToDoForm/ToDoForm'
import { UserType } from '../../../redux/authReducer'

const { Panel } = Collapse

export const getTargetUser = (usersList: Array<UserType> ,userId: string):UserType  => {
    return usersList.filter((item: UserType) => item.id.toString() === userId )[0]
}

export const toDoPart = (
    toDoList: Array<TaskType>,
    currentPage: number,
    defaultPageSize: number
    ): Array<TaskType> => {
    let toDoPart: Array<TaskType> = []
    if (toDoList) {
        const startIndex = (currentPage - 1) * defaultPageSize
        const endIndex = startIndex + defaultPageSize
        for (let index = 0; index < toDoList.length; index++) {
            const element = toDoList[index];
            if (index >= startIndex && index < endIndex) {
                toDoPart.push(element)
            }

        }
    }
    return toDoPart
}

const CurrentUser: React.FC<CurrentUserPropsType> = (props) => {
    useEffect(() => {
        const getUsersList = () => props.getUsersList
        if (props.usersList.length === 0) {
            getUsersList()()
        }
    }, [props.usersList, props.getUsersList])

    const [defaultPageSize, setDefaultPageSize] = useState(10)
    const [currentPage, setCurrentPage] = useState(1)
    const [toDoFormVisible, setToDoFormVisible]= useState(false)
    const [initialFormValues, setInitialFormValues] = useState(initialValues)
    const [taskList, setTaskList] = useState<Array<TaskType> | null>(null)
    

    const user = getTargetUser(props.usersList, props.match.params.userId)

    const callback = () => { }

    const onTaskEdit = () => { }

    const onPagination = (currentPage: number) => {
        setCurrentPage(currentPage)
    }

    const onShowSizeChange = (current: number, size: number) => {
        setDefaultPageSize(size)
    }

    type DateIntervalType = {
        startDate: moment.Moment,
        endDate: moment.Moment
    }
    const [dateInterval, setDateInterval] = useState<DateIntervalType>({
        startDate: moment(),//.add(-1,'day'),
        endDate: moment()//.add(1,'day')
    })

    

    const getTaskList = (startDate: string, endDate: string) => {
        let tasklist: Array<TaskType> = []
        if (user.toDoList) {

            for (let index = 0; index < user.toDoList.length; index++) {
                const toDo = user.toDoList[index];
                if (moment(toDo.date).isBetween(
                    moment(dateInterval.startDate.format('YYYY-MM-DD')).add(-1, 'day'),
                    moment(dateInterval.endDate.format('YYYY-MM-DD')).add(1, 'day'),
                    'day')) {
                    tasklist.push(toDo)
                }
            }
        }
        setTaskList(tasklist)
    }

    const setIsInterval = (isInterval: boolean, date: { startDate: moment.Moment, endDate: moment.Moment }) => {
        setDateInterval(date)
    }

    const onToDoFormClose = () => {
        setInitialFormValues(initialValues)
        setToDoFormVisible(false)
    }

    const handleSubmitToDoForm = () => {
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
                            {user.toDoList ? toDoPart(user.toDoList, currentPage, defaultPageSize).map((item: TaskType) => {
                                return <TodoItem 
                                    key={item.id.toString()} 
                                    item={item} 
                                    setToDoFormVisible={setToDoFormVisible}
                                    setInitialFormValues={setInitialFormValues}
                                    />
                            })
                                :
                                null
                            }
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
                            isReadOnly={true}
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
                            isReadOnly={true}
                        />
                    </Panel>
                    <Panel header="Related users" key="4"></Panel>
                    <Panel header="Permissions" key="5"></Panel>
                </Collapse>

                <Drawer
                    // title={drawerData.header}
                    title={initialFormValues.name}
                    placement="right"
                    closable={true}
                    onClose={onToDoFormClose}
                    visible={toDoFormVisible}
                    width="90%"
                >
                    <Formik
                        initialValues={initialFormValues}
                        onSubmit={handleSubmitToDoForm}
                        enableReinitialize={true}
                        initialStatus={'readOnly'}
                    >
                        {ToDoForm}
                    </Formik>
                </Drawer>

            </div >
        )
    } else {
        return <Spin key="spin" size="large" />
    }
}

export default CurrentUser

type TodoItemPropsType = {
    item: TaskType,
    key: string,
    setToDoFormVisible:  React.Dispatch<React.SetStateAction<boolean>>,
    setInitialFormValues: React.Dispatch<React.SetStateAction<InitialValuesType>>
}
const TodoItem: React.FC<TodoItemPropsType> = (props) => {
    const showDrawer = (item: TaskType) => {
        props.setToDoFormVisible(true)
        const timeParts = item.time.split(':')
        props.setInitialFormValues({
            name: item.name,
            time: moment().hours(Number(timeParts[0])).minutes(Number(timeParts[1])).seconds(Number(timeParts[2])),
            date: moment(item.date),
            descriptions: item.descriptions ? item.descriptions : null
        })
    }
    return (
        <List.Item
            key={props.item.id}
            actions={[<Button onClick={() => { showDrawer(props.item) }} type="link" block>Show</Button>]}
        >
            {props.item.name}
        </List.Item>
    )
}

