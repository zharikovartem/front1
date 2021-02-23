import { Spin } from 'antd'
import React, { useEffect, useState } from 'react'
import { getTargetUser, toDoPart } from './CurrentUser'
import { CurrentUserPropsType } from './CurrentUserContainer'
import { Accordion, LocaleProvider, Pagination, List, NavBar, Icon } from 'antd-mobile'
import UserDataForm from './UserDataForm'
import enUS from 'antd-mobile/lib/locale-provider/en_US'
import './Pagination.css'
import { NewTaskDataType, TaskType } from '../../../Types/types'
import { useHistory } from 'react-router-dom'
import ToDoHeaderMobile from '../../ToDo/ToDoHeader/ToDoHeaderMobile'
import moment from 'moment'
import ToDoMobile from './../../ToDo/ToDoMobile'

const Item = List.Item

const CurrentUserMobile: React.FC<CurrentUserPropsType> = (props) => {
    useEffect(() => {
        const getUsersList = () => props.getUsersList
        if (props.usersList.length === 0) {
            getUsersList()()
        }
    }, [props.usersList, props.getUsersList])

    const [defaultPageSize, setDefaultPageSize] = useState(10)
    const [currentPage, setCurrentPage] = useState(1)
    const [toDoFormVisible, setToDoFormVisible]= useState(false)
    // const [initialFormValues, setInitialFormValues] = useState(initialValues)
    const [taskList, setTaskList] = useState<Array<TaskType> | null>(null)
    
    const user = getTargetUser(props.usersList, props.match.params.userId)
    let history = useHistory()

    type DateIntervalType = {
        startDate: moment.Moment,
        endDate: moment.Moment
    }
    const [dateInterval, setDateInterval] = useState<DateIntervalType>({
        startDate: moment(),//.add(-1,'day'),
        endDate: moment()//.add(1,'day')
    })

    const setIsInterval = (isInterval: boolean, date: { startDate: moment.Moment, endDate: moment.Moment }) => {
        setDateInterval(date)
    }

    const onChange = () => {

    }

    const onPagination = (currentPage: number) => {
        setCurrentPage(currentPage)
    }

    const getTaskList = (startDate: string, endDate: string) => {

    }

    if (user) {
        return (
            <div>
                <NavBar
                     mode="light"
                    //  mode="dark"
                     icon={<Icon type="left" />}
                     onLeftClick={() => history.replace(props.appLocation,'/users')}
                     rightContent={[
                    //    <Icon key="0" type="search" style={{ marginRight: '16px' }} />,
                    //    <Icon key="1" type="ellipsis" />,
                    <p>User id: {props.match.params.userId}</p>
                     ]}
                ><span className="text-dark">{user.name}</span></NavBar>

                <Accordion defaultActiveKey="" className="my-accordion" onChange={onChange} >
                    <Accordion.Panel header="User data">
                        <UserDataForm userData={user} updateUser={props.updateUser} />
                    </Accordion.Panel>
                    <Accordion.Panel header="ToDo List">

                        <List>
                            {user.toDoList ? toDoPart(user.toDoList, currentPage, defaultPageSize).map((item: TaskType) => {
                                return (
                                <Item 
                                    key={item.id} 
                                    // extra={item.time+' '+item.date}
                                    onClick={()=>{console.log('onClick')}}
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
                                    total={user.toDoList ? Math.ceil(user.toDoList?.length / defaultPageSize) : 0}
                                    current={currentPage}
                                    onChange={onPagination}
                                />
                            </div>
                        </LocaleProvider>
                    </Accordion.Panel>
                    <Accordion.Panel header="Schedule">
                        <ToDoHeaderMobile
                            dateInterval={dateInterval}
                            setIsInterval={setIsInterval}
                            showDrawer={() => { console.log('showDrawer') }}
                            showModal={() => { console.log('showModal') }}
                            isReadOnly={true}
                        />
                        {/* <ToDoMobile 
                            createNewTask={(values: NewTaskDataType, reload: boolean) => {}}
                            dateInterval={dateInterval}
                            deleteTask={(taskid: number, startDate: string, endDate: string)=>{} }
                            getTaskList={getTaskList}
                            isInterval
                            taskList={taskList}
                            updateTask={(values: NewTaskDataType, taskId: number) => {} }
                            userId={user.id}
                            viewSettings={{}}
                        /> */}
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