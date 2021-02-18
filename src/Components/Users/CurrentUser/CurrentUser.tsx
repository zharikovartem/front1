import { Collapse, Spin } from 'antd'
import React, { useEffect } from 'react'
import TimeScale from '../../TimeScale/TimeScaleContainer'
import ToDoHeader from '../../ToDo/ToDoHeader/ToDoHeaderContainer'
import { CurrentUserPropsType } from './CurrentUserContainer'
import UserDataForm from './UserDataForm'

const { Panel } = Collapse

const CurrentUser: React.FC<CurrentUserPropsType> = (props) => {
    useEffect(() => {
        if (props.usersList.length === 0) {
            props.getUsersList()
        }
    }, [props.usersList])

    const getTargetUser = (userId: number) => {
        return props.usersList.filter((item: any) => item.id.toString() === userId)[0]
    }

    const user = getTargetUser(props.match.params.userId)

    const callback = () => { }

    const onTaskEdit = () => { }

    console.log(user)

    if (user) {
        return (
            <div>
                <h5>Name: {user.name}</h5>
                <p>User id: {props.match.params.userId}</p>

                <Collapse defaultActiveKey={[]} onChange={callback}>
                    <Panel header="User data" key="1">
                        <UserDataForm userData={user} updateUser={props.updateUser}/>
                    </Panel>
                    <Panel header="ToDo List" key="2">
                        <p>Вывести список всез задач с пагинацией</p>
                    </Panel>
                    <Panel header="Schedule" key="3">
                        <h3>Schedule for {user.name}:</h3>
                        <ToDoHeader
                            showDrawer={() => { console.log('showDrawer') }}
                            showModal={() => { console.log('showModal') }}
                        />
                        <TimeScale onEdit={onTaskEdit} />
                    </Panel>
                    <Panel header="Relations" key="4"></Panel>
                    <Panel header="Permissions" key="5"></Panel>
                </Collapse>

            </div>
        )
    } else {
        return <Spin key="spin" size="large" />
    }
}

export default CurrentUser
