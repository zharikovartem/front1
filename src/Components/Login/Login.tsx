import React from 'react'
import { isMobile } from "react-device-detect"
import { List, InputItem, Checkbox } from 'antd-mobile'
import { Formik } from "formik"
import moment from "moment"
import LoginForm from './LoginForm'

const CheckboxItem = Checkbox.CheckboxItem;

const initialValues = {
    // bookingClient: "",
    // bookingDate: moment(Date.now()),
    // bookingTime: moment(Date.now()),
    // selectOptions: ["Mark", "Bob", "Anthony"]
}

// export const dateFormat = "YYYY--MM-DD";
// export const timeFormat = "h:mm A";

const Login = () => {

    const handleSubmit = (formProps:any) => {
        //console.log('formProps: ', formProps)
        alert(
            ` Email: ${formProps.email} \n Name: ${formProps.name} \n Remember Me: ${formProps.rememberMe}`
          )
      }

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