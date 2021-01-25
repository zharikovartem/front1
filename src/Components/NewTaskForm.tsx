import React, { useState, useEffect } from 'react'
import moment from 'moment'
import { Form, Input, Button, TimePicker, DatePicker, Drawer, Spin, message } from 'antd'
import { NewTaskFormPropsType } from './NewTaskFormContainer'

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
}
const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
}

export type NewTaskFormOwnPropsType = {
    // selectedDate: moment.Moment,
    onClose: () => void
    visible: boolean,
    setVisible: (visible: boolean) => void
}

const { TextArea } = Input;

const timeFormat: string = 'HH:mm';

const NewTaskForm: React.FC<NewTaskFormPropsType> = (props) => {
    const [form] = Form.useForm()
    const [selectedDate, setSelectedDate] = useState<moment.Moment>(moment())
    const [saveStatus, setSaveStatus] = useState<string>(props.taskSaveStatus)

    useEffect(() => {
        // console.log('status changed: ', props.taskSaveStatus)
        switch (props.taskSaveStatus) {
            case 'inProgress':
                setSaveStatus(props.taskSaveStatus)
                break;
            case 'success':
                message.success('The task was successfully created');
                props.onClose()
                setSaveStatus('')
                onReset()
                break;
            case 'error':
                message.error('Error: ' + props.errorMessage);
                setSaveStatus(props.taskSaveStatus)
                break;

            default:
                break;
        }
    }, [props.taskSaveStatus]);

    type OnFinishType = {
        taskName: string,
        date: moment.Moment,
        taskTime: moment.Moment,
        description?: string
    }
    const onFinish = (values: OnFinishType) => {
        const data = {
            date: values.date.format('YYYY-MM-DD'),
            taskTime: values.taskTime.format('HH:mm'),
            taskName: values.taskName,
            user_id: 1,
            description: values.description
        }
        // // console.log(selectedDate.format('DD'), '<', props.dateInterval.startDate.format('DD'), '>'
        //     , props.dateInterval.startDate.format('DD'))
        // // console.log(
        //     moment(selectedDate.format('YYYY-MM-DD')).isBetween(
        //         props.dateInterval.startDate.format('YYYY-MM-DD'),
        //         props.dateInterval.endDate.format('YYYY-MM-DD'),
        //         undefined, '[]'
        //     )
        // )
        // // console.log('selectedDate', selectedDate.format('YYYY-MM-DD HH:MM:SS'))
        // // console.log('startDate', props.dateInterval.startDate.format('YYYY-MM-DD HH:MM:SS'))
        // // console.log('endDate', props.dateInterval.endDate.format('YYYY-MM-DD HH:MM:SS'))

        if (!moment(selectedDate.format('YYYY-MM-DD')).isBetween(
            props.dateInterval.startDate.format('YYYY-MM-DD'),
            props.dateInterval.endDate.format('YYYY-MM-DD'),
            undefined, '[]'
        )) {
            // // console.log('ПЕРЕРИСОВКИ НЕТ')
            props.createNewTask(data, false)
        } else {

            props.createNewTask(data, true)
            // // console.log('ПЕРЕРИСОВКА')
        }
    };

    const onReset = () => {
        form.resetFields()
    }

    const onDateChange = (value: moment.Moment | null, dateString: string): void => {
        // setFormValues({ ...formValues, date: value })
        if (value !== null) {
            setSelectedDate(value)
        }
    }

    // const onTaskNameChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    //     setFormValues({ ...formValues, taskName: e.target.value })
    // }
    // const onDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    //     setFormValues({ ...formValues, description: e.target.value })
    // }
    // const onTimrChange = (e: moment.Moment | null, dateString: string): void => {
    //     setFormValues({ ...formValues, taskTime: e })
    // }

    // console.log('render TaskForm',props)

    return (
        <Drawer
            title={"Create New Task for " + selectedDate.format('DD MMM YYYY')}
            placement="right"
            closable={true}
            onClose={props.onClose}
            visible={props.visible}
            width="80%"
        >
            <Form
                {...layout}
                form={form}
                name="control-hooks"
                onFinish={onFinish}
            >
                <Form.Item
                    label="Task name"
                    name="taskName"
                    rules={[{ required: true, message: 'Please input task name!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Task date"
                    name="date"
                    initialValue={selectedDate}
                    rules={[{ required: true, message: 'Please input task date!' }]}
                >
                    <DatePicker
                        // defaultValue={props.selectedDate}
                        // value = {formValues.date}
                        onChange={onDateChange}
                        format='DD-MM-YYYY'
                    />
                </Form.Item>

                <Form.Item
                    label="Task time"
                    name="taskTime"
                    rules={[{ required: true, message: 'Please input task time!' }]}
                >
                    <TimePicker
                        // onChange={onTimrChange}
                        // defaultValue={moment('12:08', timeFormat)} 
                        format={timeFormat}
                    />
                </Form.Item>

                <Form.Item
                    label="Description"
                    name="description"
                >
                    <TextArea rows={2} />
                </Form.Item>

                <Form.Item {...tailLayout}>
                    {saveStatus === 'inProgress' ?
                        <Spin></Spin>
                        :
                        <>
                            <Button type="primary" htmlType="submit">
                                Create
                            </Button>
                            <Button className="ml-3" type="primary" onClick={onReset}>
                                Reset
                            </Button>
                        </>
                    }
                </Form.Item>
            </Form>
        </Drawer>
    )
}

export default NewTaskForm