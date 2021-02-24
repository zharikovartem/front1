import { Button, Modal } from 'antd'
import React, { ReactNode, useState } from 'react'
import { PhoneOutlined } from '@ant-design/icons'
import { Field, Form, Formik, FormikProps } from 'formik'
import { AntTextArea } from '../../../utils/Formik/CreateAntField'

const ToDoActionsRouter: React.FC<any> = (props) => {

    switch (props.action) {
        case 2:

            return <CallAction {...props} />

        default:
            return <></>
    }
}

export default ToDoActionsRouter

const CallAction: React.FC<any> = (props) => {
    const [isCallVisible, setIsCallVisible] = useState(false)

    const handleOk = () => {
        setIsCallVisible(false)
    }

    const handleCancel = () => {
        setIsCallVisible(false)
    }

    const handleSubmit = (formProps: any) => {
        console.log(formProps)
    }

    const data = JSON.parse(props.action_data)
    let phone = 'tel:'

    if (data) {
        phone = phone + data.phone
    }

    return (
        <>
            <Button
                type="primary"
                shape="circle"
                size="small"
                style={{ marginLeft: 10 }}
                onClick={() => { setIsCallVisible(true) }}
                icon={
                    <div className="d-flex flex-wrap align-content-start">
                        <PhoneOutlined className="ml-1" style={{ fontSize: '14px' }} />
                    </div>
                }
            ></Button>

            <Modal
                title={"Call to " + data.name}
                visible={isCallVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                width={1000}
                centered
            >
                {data ?
                    <>
                        <p><a href={phone}>Call to: {data.name}</a></p>
                        <p>number: {data.phone}</p>
                    </>
                    :
                    null
                }

                <Formik
                    initialValues={{}}
                    onSubmit={handleSubmit}
                    enableReinitialize={true}
                >
                    {CallResultForm}
                </Formik>

            </Modal>

        </>
    )
}

const CallResultForm: ((props: FormikProps<{}>) => ReactNode) = (props) => {
    return (
        <Form
            className="form-container mt-4"
            onSubmit={props.handleSubmit}
        >
            Call result:
            <Field
                component={AntTextArea}
                name="call_description"
                type="textarea"
                label=""
                submitCount={props.submitCount}
            />
            <div className="submit-container">
                <button className="ant-btn ant-btn-primary" type="submit">
                    Save
                </button>
                <button className="ant-btn ant-btn-primary ml-4" type="submit">
                    Save and complete
                </button>
            </div>
        </Form>
    )
}