import * as React from 'react'
import moment from 'moment'
import { Form, Input, Button, TimePicker, DatePicker } from 'antd'

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
}
const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
}

type PropsType = {
    selectedDate: moment.Moment
}

const { TextArea } = Input;

const timeFormat: string = 'HH:mm';

const NewTaskForm: React.FC<PropsType> = (props:any) => {
    const onFinish = (values: any) => {
        console.log('Success:', values);
        values.user_id = '1'
        values.taskTime = values.taskTime.format('HH:mm');
        values.date = values.date.format('YYYY-MM-DD');
        // props.createNewTask(values)
        props.newTask(values)
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
        
    };

    const onTimeChange = (value: moment.Moment | null, dateString: string):void => {
        console.log(value, dateString);
    }

    console.log(props)

    return (
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
                // rules={[{ required: true, message: 'Please input time!' }]}
            >
                <DatePicker  />
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
                <Button type="primary" htmlType="submit">
                    Create
                </Button>
            </Form.Item>
        </Form>
    )
}

export default NewTaskForm