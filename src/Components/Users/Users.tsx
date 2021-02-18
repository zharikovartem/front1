import { Col, Row } from 'antd'
import { Button } from 'antd'
import React, {useEffect} from 'react'
import { ListGroup } from 'react-bootstrap'
import {UsersPropsType} from './UsersContainer'
import { PlusCircleOutlined , DeleteOutlined, EditOutlined, CaretRightOutlined } from '@ant-design/icons'
import { Link, useRouteMatch }from "react-router-dom";

const Users: React.FC<UsersPropsType> = (props) => {
    useEffect( ()=> {
        if (props.usersList.length === 0) {
            props.getUsersList()
        }
    }, [props.usersList] )

    let { url } = useRouteMatch();

    console.log(props)
    
    return (
        <div>
            <h5>Users</h5>
            <li>getUserList</li>
            <li>show User List</li>
            <ListGroup as="ul">
            {   props.usersList.map( (item: any) => {
                    return(
                        <ListGroup.Item as="li" action className="" key={item.id}>
                            <Row className="px-0 ml-0 ml-sm-5">
                                <Col className="mx-2">
                                    {item.id}
                                </Col>
                                <Col className="mx-2">
                                    <Link to={url+'/'+item.id}>{item.name}</Link>
                                </Col>
                                <Col className="mr-auto ml-0 mr-sm-2 ml-sm-auto">
                                <Button
                                    type="primary"
                                    shape="circle"
                                    size="small"
                                    style={{ marginLeft: 10 }}
                                    onClick={()=>{console.log('onClick')}}
                                    icon={
                                        <div className="d-flex flex-wrap align-content-start">
                                            <CaretRightOutlined className="ml-1" style={{ fontSize: '14px' }} />
                                        </div>
                                    }
                                />
                                </Col>
                            </Row>
                        </ListGroup.Item>
                    )
                })
            }
            </ListGroup>
        </div>
    )
}

export default Users