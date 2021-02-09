import React, { useState, useEffect } from 'react'
import { TasksTreePropsType } from './TasksTreeContainer'
import { Drawer, List, SwipeAction, Icon, Button, Card, WingBlank, WhiteSpace } from 'antd-mobile'
import NewTaskTreeForm from './NewTaskTreeForm'
import './TasksTreeMobile.css'
import { Formik } from 'formik'
import { Spin, Empty } from 'antd'
import { propTypes } from 'react-bootstrap/esm/Image'
import moment from "moment"
import { TaskListType } from '../../Types/types'
import { useDispatch } from 'react-redux'
import { TaskTreeItemMobile } from './TaskTreeItem'

const Item = List.Item

type InitialDrewerDataType = {
    header: string,
    taskId: false | number
}

const initialDrewerData: InitialDrewerDataType = {
    header: 'Create New Task',
    taskId: false
}

const TasksTreeMobile: React.FC<TasksTreePropsType> = (props) => {
    useEffect(() => {
        if (props.taskList && props.taskList.length === 0 && !props.isTaskListLoaded) {
            props.getTaskList()
        } else if (props.taskList === undefined) {
            props.getTaskList()
        }
        setVisible(false)
        // console.log('initialValues: ', initialValues)
        setInitialFormValues(initialValues)
    }, [props.taskList])

    const getSelectOptions = () => {
        if (props.taskList !== undefined && props.taskList.length > 0) {
            return props.taskList.map((item) => {
                return ({
                    name: item.name,
                    value: item.id
                })
            })
        } else {
            //console.log('вернули пыстой список', props.taskList)
            return null
        }
    }

    let initialTimeToComplete = new Date()
    initialTimeToComplete.setHours(0)
    initialTimeToComplete.setMinutes(0)
    initialTimeToComplete.setSeconds(0)
    initialTimeToComplete.setMilliseconds(0)

    const initialValues: any = {
        selectOptions: getSelectOptions(),
        taskTypes: [
            {
                name: 'Простая задача',
                value: 1
            },
            {
                name: 'Задача с контектом',
                value: 2
            }
        ],
        task_type: 1,
        time_to_complete: initialTimeToComplete
        // parent_id:[]
    }

    const [visible, setVisible] = useState(false)
    const [initialFormValues, setInitialFormValues] = useState(initialValues)
    const [drawerData, setDrawerData] = useState(initialDrewerData)

    const handleSubmit = (formProps: any) => {
        // console.log('handleSubmit TasksTreeMobile: ', formProps.time_to_complete)
        let formPropsCopy: any = { ...formProps }
        delete formPropsCopy.selectOptions
        delete formPropsCopy.taskTypes
        if (formPropsCopy.time_to_complete !== undefined) {
            // console.log(formPropsCopy.time_to_complete)
            const time_to_complete = moment(formPropsCopy.time_to_complete)
            formPropsCopy.time_to_complete = time_to_complete.format('HH:mm:ss')
        }
        if (Array.isArray(formPropsCopy.parent_id)) {
            formPropsCopy.parent_id = formPropsCopy.parent_id[0]
        }

        //console.log('NewTaskMobile submit: ', formPropsCopy)

        formPropsCopy.user_id = props.userId
        // props.createNewTaskList(formPropsCopy)
        // setInitialFormValues(initialValues)
        if (!drawerData.taskId) {
            // console.log('createNewTaskList: ', formPropsCopy)
            props.createNewTaskList(formPropsCopy)
        } else {
            console.log('updateTaskList: ', formPropsCopy)
            props.updateTaskList(formPropsCopy, drawerData.taskId)
        }
    }

    const onAdd = (args: any) => {
        if (props.selectedTasks.length !== 0) {
            console.log('sub')
            setInitialFormValues({...initialValues, parent_id: [Number(props.selectedTasks[props.selectedTasks.length-1])]})
        } else {
            setInitialFormValues(initialValues)
        }
        
        setVisible(!visible)
    }

    const showDrawer = () => {
        setVisible(true)
    }

    const onBack = () => {
        props.backSelectedTasks()
    }

    console.log('TasksTreeMobile props: ', props)
    // console.log('TasksTreeMobile name: ', initialFormValues.name)

    // if (props.taskList !== undefined) {
    return (
        <WingBlank size="lg">
            <WhiteSpace size="lg" />
            <Card>

                <div
                // className="d-flex justify-content-end"
                >
                    <Card.Header
                        title={<h4 className="w-100 text-center">Tasks Tree</h4>}
                        extra={
                            <div className="d-flex flex-row">
                                {props.selectedTasks.length > 0 && !visible ?
                                    <Button
                                        inline
                                        size="small"
                                        className="mx-3 my-2"
                                        // style={{ marginRight: '4px' }} 
                                        onClick={onBack}
                                        type="primary"
                                    >
                                        Back
                                    </Button>
                                    :
                                    null
                                }
                                <Button
                                    inline
                                    size="small"
                                    className="mx-3 my-2"
                                    // style={{ marginRight: '4px' }} 
                                    onClick={onAdd}
                                    type="primary"
                                >
                                    {visible ? 'Close' : 'Add'}
                                </Button>
                            </div>
                        }
                    >

                    </Card.Header>
                </div>

                <Drawer
                    className="my-drawer"
                    style={{ minHeight: document.documentElement.clientHeight }}
                    enableDragHandle
                    contentStyle={{ color: '#A6A6A6', textAlign: 'center', paddingTop: 0, width: "100%" }}
                    sidebar={
                        <div className="mt-4">
                            <Formik
                                initialValues={initialFormValues}
                                onSubmit={handleSubmit}
                                render={NewTaskTreeForm}
                                enableReinitialize={true}
                            />
                        </div>
                    }
                    open={visible}
                    onOpenChange={onAdd}
                >
                    <List>


                        {props.taskList !== undefined ?
                            props.taskList.map((item) => {
                                let parentId: number
                                if (props.selectedTasks.length !== 0) {
                                    parentId = props.selectedTasks[props.selectedTasks.length - 1]
                                    if (item.parent_id === parentId) {
                                        return (
                                            <TaskTreeItemMobile
                                                taskItem={item}
                                                deleteTaskList={props.deleteTaskList}
                                                showDrawer={showDrawer}
                                                setDrawerData={setDrawerData}
                                                initialFormValues={initialFormValues}
                                                setInitialFormValues={setInitialFormValues}
                                                updateTaskList={props.updateTaskList}
                                            />
                                        )
                                    }
                                } else {
                                    if (item.parent_id === null) {
                                        return (
                                            <TaskTreeItemMobile
                                                taskItem={item}
                                                deleteTaskList={props.deleteTaskList}
                                                showDrawer={showDrawer}
                                                setDrawerData={setDrawerData}
                                                initialFormValues={initialFormValues}
                                                setInitialFormValues={setInitialFormValues}
                                                updateTaskList={props.updateTaskList}
                                            />
                                        )
                                    }
                                }

                            })
                            :
                            null
                        }

                    </List>
                </Drawer>



            </Card>
        </WingBlank>
    )
    // } else {
    //     return <Spin key="spin" size="large" />
    // }
}

export default TasksTreeMobile

// const getTaskTreeItems = (
//     taskList: Array<any>,
//     deleteTaskList: (taskId: number) => void,
//     showDrawer: () => void,
//     setDrawerData: (drawerData: any) => void,
//     initialFormValues: any,
//     setInitialFormValues: (initialFormValues: any) => void
// ) => {
//     const onEdit = (task: any) => {
//         // console.log(task)

//         setDrawerData({
//             header: 'Edit: "' + task.name + '"',
//             taskId: task.id
//         })

//         let day = new Date()
//         if (task.time_to_complete !== null) {
//             const splitTime = task.time_to_complete.split(/:/)
//             day.setHours(parseInt(splitTime[0]))
//             day.setMinutes(parseInt(splitTime[1]))
//             day.setSeconds(0)
//             day.setMilliseconds(0)
//         } else {
//             day.setHours(0)
//             day.setMinutes(0)
//             day.setSeconds(0)
//             day.setMilliseconds(0)
//         }

//         setInitialFormValues(
//             {
//                 ...initialFormValues,
//                 // new: false,
//                 name: task.name,
//                 time_to_complete: day,
//                 descriptions: task.descriptions,
//                 parent_id: [task.parent_id],
//                 task_type: [Number(task.task_type)]
//             }
//         )

//         showDrawer()
//     }

//     const onItemOpen = (itemId: number) => {
//         console.log(itemId, 'is open')
//         // const dispatch = useDispatch()
//         // dispatch( { type: 'SN/TASK_LIST/SET_SELECTED_TASK', itemId } )
//     }

//     // console.log(taskList)

//     if (taskList && taskList.length > 0) {
//         return taskList.map((item) => {
//             //console.log('!!!!!!!')
//             return (
//                 <SwipeAction
//                     style={{ backgroundColor: 'gray' }}
//                     autoClose
//                     right={[
//                         {
//                             text: 'Cancel',
//                             onPress: () => {
//                                 //console.log('cancel') 
//                             },
//                             style: { backgroundColor: '#ddd', color: 'white' },
//                         },
//                         {
//                             text: 'Delete',
//                             onPress: () => deleteTaskList(item.id),
//                             style: { backgroundColor: '#F4333C', color: 'white' },
//                         },
//                     ]}
//                     left={[
//                         {
//                             text: 'Edit',
//                             onPress: () => { onEdit(item) },
//                             style: { backgroundColor: '#108ee9', color: 'white' },
//                         },
//                         {
//                             text: 'Execute',
//                             onPress: () => {
//                                 // console.log('cancel')
//                             },
//                             style: { backgroundColor: 'green', color: 'white' },
//                         },
//                     ]}
//                 // onOpen={() => console.log('global open')}
//                 // onClose={() => console.log('global close')}
//                 >
//                     <Item
//                         // className="my-3"
//                         onClick={() => { onItemOpen(item.id) }}
//                         arrow="horizontal"
//                         key={item.id}
//                     >
//                         {item.name}
//                     </Item>

//                 </SwipeAction>
//             )
//         })
//     } else {
//         return (
//             <Empty />
//         )
//     }


// }

