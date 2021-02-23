import { Spin } from 'antd'
import React, { useCallback, useEffect, useState } from 'react'
import { getTargetUser, toDoPart } from './CurrentUser'
import { CurrentUserPropsType } from './CurrentUserContainer'
import { Accordion, LocaleProvider, Pagination, List, NavBar, Icon, Drawer, Button } from 'antd-mobile'
import UserDataForm from './UserDataForm'
import enUS from 'antd-mobile/lib/locale-provider/en_US'
import './Pagination.css'
import { useHistory } from 'react-router-dom'
import ToDoHeaderMobile from '../../ToDo/ToDoHeader/ToDoHeaderMobile'
import moment from 'moment'
import { Formik } from 'formik'
import { initialValues } from '../../ToDo/ToDoMobile'
import ToDoForm from '../../ToDo/ToDoForm/ToDoForm'
import { NewTimeByString } from '../../../utils/Date/NewDeteByString'
import {TasksOnly} from './../../ToDo/ToDoMobile'
import { TaskType } from '../../../Types/types'

const Item = List.Item

const CurrentUserMobile: React.FC<CurrentUserPropsType> = (props) => {
    const [currentPage, setCurrentPage] = useState(1)
    const [toDoFormVisible, setToDoFormVisible]= useState(false)
    const [initialFormValues, setInitialFormValues] = useState(initialValues)
    const [taskList, setTaskList] = useState<Array<TaskType> | null>(null)
    const [dateInterval, setDateInterval] = useState<DateIntervalType>({
        startDate: moment(),
        endDate: moment()
    })
    const user = getTargetUser(props.usersList, props.match.params.userId)

    // const getTaskList = (startDate: string, endDate: string) => {
    //     let taskList: Array<TaskType> = []
    //     if (user.toDoList) {

    //         for (let index = 0; index < user.toDoList.length; index++) {
    //             const toDo = user.toDoList[index];
    //             if (moment(toDo.date).isBetween(
    //                 moment(startDate).add(-1, 'day'),
    //                 moment(endDate).add(1, 'day'),
    //                 'day')) {
    //                     taskList.push(toDo)
    //             }
    //         }
    //     }
    //     setTaskList(taskList)
    // }

    const getTaskListCallback = useCallback(
        (startDate: string, endDate: string) => {
            let taskList: Array<TaskType> = []
            if (user.toDoList) {

                for (let index = 0; index < user.toDoList.length; index++) {
                    const toDo = user.toDoList[index];
                    if (moment(toDo.date).isBetween(
                        moment(startDate).add(-1, 'day'),
                        moment(endDate).add(1, 'day'),
                        'day')) {
                            taskList.push(toDo)
                    }
                }
            }
            setTaskList(taskList)
        },
        [setTaskList, user.toDoList],
    )

    useEffect(() => {
        const getUsersList = () => props.getUsersList
        // const getTaskListCalback = () => getTaskList

        if (props.usersList.length === 0) {
            getUsersList()()
        }
        if (user && taskList === null) {
            getTaskListCallback(dateInterval.startDate.format('YYYY-MM-DD'), dateInterval.endDate.format('YYYY-MM-DD'))
        }
        
    }, [props.usersList, props.getUsersList, dateInterval, user, taskList, getTaskListCallback])
    
    let history = useHistory()

    type DateIntervalType = {
        startDate: moment.Moment,
        endDate: moment.Moment
    }
    

    const setIsInterval = (isInterval: boolean, date: { startDate: moment.Moment, endDate: moment.Moment }) => {
        setDateInterval(date)
        getTaskListCallback(date.startDate.format('YYYY-MM-DD'), date.endDate.format('YYYY-MM-DD'))
    }

    const onChange = () => {

    }

    const onPagination = (currentPage: number) => {
        setCurrentPage(currentPage)
    }

    const onTaskOpen = (task: TaskType) => {
        setToDoFormVisible(!toDoFormVisible)
        let time = NewTimeByString(task.time)

        const splitDate = task.date.split(/-/)
        let date = new Date()
        date.setFullYear(parseInt(splitDate[0]))
        date.setMonth(parseInt(splitDate[1])-1)
        date.setDate(parseInt(splitDate[2]))

        setInitialFormValues({
            name: task.name,
            time: time,
            date: date,
            descriptions: task.descriptions ? task.descriptions : null
        })
    }

    const onTaskClose = () => {
        setToDoFormVisible(!toDoFormVisible)
    }

    const handleSubmit = () => {
        
    }

    if (user) {
        return (
            <div>
                
                <NavBar
                     mode="light"
                    //  mode="dark"
                     icon={<Icon type="left" />}
                     onLeftClick={() => history.replace(props.appLocation+'users')}
                     rightContent={[
                        <p>User id: {props.match.params.userId}</p>
                     ]}
                ><span className="text-dark">{user.name}</span></NavBar>

                <Accordion defaultActiveKey="" className="my-accordion" onChange={onChange} >
                    <Accordion.Panel header="User data">
                        <UserDataForm userData={user} updateUser={props.updateUser} />
                    </Accordion.Panel>
                    <Accordion.Panel header="ToDo List">
                    <Drawer
                    className="my-drawer"
                    style={{ minHeight: document.documentElement.clientHeight }}
                    contentStyle={{ color: '#A6A6A6', textAlign: 'center', paddingTop: 0, width: "100%" }}
                    sidebar={
                        <>
                        <Button
                                inline
                                size="small"
                                className="ml-3 mt-3 mb-5"
                                onClick={onTaskClose}
                                type="primary"
                            >
                                Close
                            </Button>

                        <div className="mt-1">
                            {/* <button onClick={onTaskClose}>Close</button> */}
                            
                            <Formik
                                initialValues={initialFormValues}
                                onSubmit={handleSubmit}
                                render={ToDoForm as any}
                                enableReinitialize={true}
                                initialStatus={'readOnly'}
                            />
                        </div>
                        </>
                    }
                    open={toDoFormVisible}
                    // onOpenChange={toDoFormVisible}
                >
                        <List>
                            {user.toDoList ? toDoPart(user.toDoList, currentPage, 10).map((item: TaskType) => {
                                return (
                                <Item 
                                    key={item.id} 
                                    // extra={item.time+' '+item.date}
                                    onClick={()=>{onTaskOpen(item)}}
                                >
                                    {item.name}
                                </Item>
                                )
                            })
                                :
                                null
                            }
                        </List>

                        <LocaleProvider locale={enUS}>
                            <div className="pagination-container" >
                                <Pagination
                                    className="m-2"
                                    total={user.toDoList ? Math.ceil(user.toDoList?.length / 10) : 0}
                                    current={currentPage}
                                    onChange={onPagination}
                                />
                            </div>
                        </LocaleProvider>
                        </Drawer>
                    </Accordion.Panel>
                    <Accordion.Panel header="Schedule">
                        <ToDoHeaderMobile
                            dateInterval={dateInterval}
                            setIsInterval={setIsInterval}
                            isReadOnly={true}
                        />
 
                        <TasksOnly 
                            dateInterval={dateInterval}
                            taskList={taskList}
                            isReadOnly={true}
                        />

                    </Accordion.Panel>
                    <Accordion.Panel header="Related users"></Accordion.Panel>
                    <Accordion.Panel header="Permissions"></Accordion.Panel>
                </Accordion>
            </div>
        )
    } else {
        return <Spin key="spin" size="small" />
    }

}

export default CurrentUserMobile