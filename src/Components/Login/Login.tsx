import React, {useEffect} from 'react'
import { LoginPropsType } from './LoginContainer'
import { List, InputItem, Checkbox } from 'antd-mobile'
import { Formik } from "formik"
import moment from "moment"
import LoginForm from './LoginForm'
import { propTypes } from 'react-bootstrap/esm/Image'
import { Button, message } from 'antd'
import { Link } from 'react-router-dom'

const CheckboxItem = Checkbox.CheckboxItem;

export type OwnLoginPropsType = {}

const Login: React.FC<LoginPropsType> = (props) => {
    useEffect(() => {
        if (props.authError) {
            message.error(props.authError)
        }
    }, [props.authError])

    const handleSubmit = (formProps: any) => {
        if (!formProps.remember) {
            formProps.remember = false
        }
        props.login(formProps)
    }

    return (
        <>
            <h1 className="mb-5 mx-auto">Login Form</h1>
            <Formik
                initialValues={{}}
                onSubmit={handleSubmit}
                render={LoginForm}
            />
            <div className="mt-3">
                <Link to={props.location +"register"}><Button type="link" block>Register</Button></Link>
            </div>
        </>
    )
}

export default Login