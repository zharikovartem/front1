import { Spin } from 'antd'
import React, { useEffect, useState } from 'react'
import { getTargetUser, toDoPart } from './CurrentUser'
import { CurrentUserPropsType } from './CurrentUserContainer'
import { Accordion, LocaleProvider, Pagination, List } from 'antd-mobile'
import UserDataForm from './UserDataForm'
import enUS from 'antd-mobile/lib/locale-provider/en_US'
import './Pagination.css'
import { TaskType } from '../../../Types/types'

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
    
    const user = getTargetUser(props.usersList, props.match.params.userId)

    const onChange = () => {

    }

    const onPagination = (currentPage: number) => {
        setCurrentPage(currentPage)
    }

    if (user) {
        return (
            <div>
                <h5>Name: {user.name}</h5>
                <p>User id: {user.id}</p>

                <Accordion defaultActiveKey="" className="my-accordion" onChange={onChange} >
                    <Accordion.Panel header="User data">
                        <UserDataForm userData={user} updateUser={props.updateUser} />
                    </Accordion.Panel>
                    <Accordion.Panel header="ToDo List">

                        <List>
                            {user.toDoList ? toDoPart(user.toDoList, currentPage, defaultPageSize).map((item: TaskType) => {
                            // {user.toDoList ? user.toDoList.map((item: TaskType) => {
                                return (
                                // <TodoItem
                                //     key={item.id.toString()}
                                //     item={item}
                                //     setToDoFormVisible={setToDoFormVisible}
                                //     setInitialFormValues={setInitialFormValues}
                                // />
                                <Item 
                                    key={item.id} 
                                    // extra={item.time+' '+item.date}
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
                    <Accordion.Panel header="Schedule"></Accordion.Panel>
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