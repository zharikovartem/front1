import React, {useEffect} from 'react'
import { LoginPropsType } from './LoginContainer'
import { Formik } from "formik"
import LoginForm from './LoginForm'
import { Button, message } from 'antd'
import { Link } from 'react-router-dom'
import { credsType } from '../../redux/authReducer'


export type OwnLoginPropsType = {}

const Login: React.FC<LoginPropsType> = (props) => {
    useEffect(() => {
        if (props.authError) {
            message.error(props.authError)
        }
    }, [props.authError])

    type FormPropsType = {
        email: string,
        password: string,
        remember: boolean
    }

    const initialValues: FormPropsType = {
        email: '',
        password: '',
        remember: false
    }

    const handleSubmit = (formProps: FormPropsType) => {
        props.login(formProps as credsType)
    }

    return (
        <>
            <h1 className="mb-5 mx-auto">Login Form</h1>
            <Formik
                initialValues={initialValues}
                onSubmit={handleSubmit}
                render={LoginForm as any}
            />
            <div className="mt-3">
                <Link to={props.location +"register"}><Button type="link" block>Register</Button></Link>
            </div>
        </>
    )
}

export default Login