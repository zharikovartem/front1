import { Spin } from 'antd'
import React, { useEffect, useState } from 'react'
import { getTargetUser, toDoPart } from './CurrentUser'
import { CurrentUserPropsType } from './CurrentUserContainer'
import { Accordion, LocaleProvider, Pagination, List, NavBar, Icon } from 'antd-mobile'
import UserDataForm from './UserDataForm'
import enUS from 'antd-mobile/lib/locale-provider/en_US'
import './Pagination.css'
import { TaskType } from '../../../Types/types'
import { useHistory } from 'react-router-dom'

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
    let history = useHistory()

    const onChange = () => {

    }

    const onPagination = (currentPage: number) => {
        setCurrentPage(currentPage)
    }

    if (user) {
        return (
            <div>
                <NavBar
                     mode="light"
                    //  mode="dark"
                     icon={<Icon type="left" />}
                     onLeftClick={() => history.replace('/users')}
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