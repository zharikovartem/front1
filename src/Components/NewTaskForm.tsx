import React, { useState, useEffect } from 'react'
import moment from 'moment'
import { Form, Input, Button, TimePicker, DatePicker, Drawer, Spin, message } from 'antd'

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
}
const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
}

// type PropsType = {
//     selectedDate: moment.Moment,
//     onSaveIt?: any,
//     newTask: any
// }
type PropsType = any

const { TextArea } = Input;

const timeFormat: string = 'HH:mm';

const NewTaskForm: React.FC<PropsType> = (props) => {
    const [selectedDate, setSelectedDate] = useState(props.selectedDate)
    const [saveStatus, setSaveStatus] = useState<string>('')

    useEffect(() => {
        console.log('taskSaveStatus useEffect: ', props.taskSaveStatus)
        switch (props.taskSaveStatus) {
            case 'inProgress':
                setSaveStatus(props.taskSaveStatus)
                break;
            case 'success':
                message.info('The task was successfully created');
                props.onClose()
                setSaveStatus('')
                break;
            case 'error':
                message.error('Error!');
                setSaveStatus(props.taskSaveStatus)
                break;

            default:
                break;
        }
    }, [props.taskSaveStatus]);

    const onFinish = (values: any) => {
        // console.log('Success:', values);
        values.user_id = '1'
        values.taskTime = values.taskTime.format('HH:mm');
        values.date = values.date.format('YYYY-MM-DD');
        if (selectedDate !== props.selectedDate) {
            props.newTask(values, true)
        } else {
            props.newTask(values, false)
        }
        
        // props.onClose()
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);

    };

    const onTimeChange = (value: moment.Moment | null, dateString: string): void => {
        // console.log(value, dateString);
    }

    const onDateChange = (value: moment.Moment | null, dateString: string): void => {
        if (value !== null) {
            if( value.format('YYYY-MM-DD') === selectedDate.format('YYYY-MM-DD') ) {
                setSelectedDate(value)
                console.log('Дата совпадает, необходимо перерисовать таблицу')
            }
        }
    }

    console.log('NewTaskForm props:', props)

    return (
        <Drawer
            title={"Create New Task for " + selectedDate.format('DD MMM YYYY')}
            placement="right"
            closable={true}
            onClose={props.onClose}
            visible={props.visible}
            // setVisible={setVisible}
            width="80%"
        >
            <Form
                {...layout}
                name="basic"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
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
                    initialValue={props.selectedDate}
                // rules={[{ required: true, message: 'Please input time!' }]}
                >
                    <DatePicker
                        // defaultValue={props.selectedDate}
                        onChange={onDateChange}
                        format='DD-MM-YYYY'
                    />
                </Form.Item>

                <Form.Item
                    label="Task time"
                    name="taskTime"
                    rules={[{ required: true, message: 'Please input time!' }]}
                >
                    <TimePicker
                        onChange={onTimeChange}
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
                        <Button type="primary" htmlType="submit">
                            Create
                        </Button>
                    }
                </Form.Item>
            </Form>
        </Drawer>
    )
}

export default NewTaskForm