import React from 'react'
import { Button, Checkbox, Collapse, List } from 'antd'
import { FileAddOutlined, SettingOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { getJSDocReturnTag } from 'typescript'

const { Panel } = Collapse

const TaskTreeBrowserItem: React.FC<any> = (props) => {

    const callback = (key: any) => {
        console.log(key)
    }

    const onEdit = (key: any) => {
        console.log(key)
    }

    const deleteTask = (key: any) => {
        console.log(key)
    }

    const getChilds = () => {
        let childs: Array<any> = []
        //  = props.taskList.map( (item: any) => {
        for (let index = 0; index < props.taskList.length; index++) {
            const elem = props.taskList[index];
            // console.log(elem.parent_id===props.item.id)
            if (elem.parent_id===props.item.id) {
                // console.log('push')
                childs.push(<TaskTreeBrowserItem key={elem.id} item={elem} taskList={props.taskList} />)
            }
        }
            
        // })
        console.log(props.item.name, childs)
        return childs
    }

    // console.log(props.item)
    

    if (props.item.parent_id == null) {
        return (
            <List.Item className="py-0" draggable key={props.item.id}>
            <Collapse key={props.item.id} className="w-100" defaultActiveKey={[]} collapsible="header" onChange={callback} ghost>
                <Panel
                    // header={props.item.name}
                    header={<span key={props.item.id} className="float-left" >{props.item.name}</span>}
                    key={props.item.id+'Panel'}
                    extra={<>
                        <Button className=""
                            type="primary"
                            shape="circle"
                            size="small"
                            style={{ marginLeft: 10 }}
                            onClick={() => { onEdit(props.item) }}
                            icon={
                                <div className="d-flex flex-wrap align-content-start">
                                    <EditOutlined className="ml-1" style={{ fontSize: '14px' }} />
                                </div>
                            }
                        />
                        <Button className=""
                            type="primary"
                            danger
                            shape="circle"
                            size="small"
                            style={{ marginLeft: 10 }}
                            onClick={() => { deleteTask(props.item.id) }}
                            icon={
                                <div className="d-flex flex-wrap align-content-start">
                                    <DeleteOutlined className="ml-1" style={{ fontSize: '14px' }} />
                                </div>
                            }
                        />

                    </>}
                >
                   {getChilds}
                </Panel>
            </Collapse>
            </List.Item>
        )
    } else {
        return null
    }
}

export default TaskTreeBrowserItem