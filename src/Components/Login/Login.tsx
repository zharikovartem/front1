import React from 'react'
import { LoginPropsType } from './LoginContainer'
import { List, InputItem, Checkbox } from 'antd-mobile'
import { Formik } from "formik"
import moment from "moment"
import LoginForm from './LoginForm'
import { propTypes } from 'react-bootstrap/esm/Image'

const CheckboxItem = Checkbox.CheckboxItem;

const initialValues = {
    // bookingClient: "",
    // bookingDate: moment(Date.now()),
    // bookingTime: moment(Date.now()),
    // selectOptions: ["Mark", "Bob", "Anthony"]
}

// export const dateFormat = "YYYY--MM-DD";
// export const timeFormat = "h:mm A";

export type OwnLoginPropsType = {}

const Login: React.FC<LoginPropsType> = (props) => {
    const handleSubmit = (formProps: any) => {
        console.log('formProps: ', formProps)
        if (!formProps.remember) {
            formProps.remember = false
        }
        props.login(formProps)
        // alert(
        //     ` Email: ${formProps.email} \n Name: ${formProps.name} \n Remember Me: ${formProps.rememberMe}`
        //   )
    }

    console.log(props)

    return (
        <>
            <h1>Login Form</h1>
            <Formik
                initialValues={initialValues}
                onSubmit={handleSubmit}
                render={LoginForm}
            />
        </>
    )
}

export default Login